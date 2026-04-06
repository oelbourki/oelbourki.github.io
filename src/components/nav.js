import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled, { css } from 'styled-components';
import { navLinks, socialMedia } from '@config';
import { loaderDelay } from '@utils';
import { useScrollDirection, usePrefersReducedMotion } from '@hooks';
import { Menu } from '@components';
import { IconLogo, IconHex, IconGitHub, IconResume, IconLinkedin } from '@components/icons';

const StyledHeader = styled.header`
  ${({ theme }) => theme.mixins.flexBetween};
  position: fixed;
  top: 0;
  z-index: 11;
  padding: 0px 50px;
  width: 100%;
  height: var(--nav-height);
  background-color: rgba(13, 13, 13, 0.85);
  border-bottom: 0.5px solid var(--bg-border);
  filter: none !important;
  pointer-events: auto !important;
  user-select: auto !important;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: var(--transition);

  @media (max-width: 1080px) {
    padding: 0 40px;
  }
  @media (max-width: 768px) {
    padding: 0 25px;
  }

  @media (prefers-reduced-motion: no-preference) {
    ${props =>
    props.scrollDirection === 'up' &&
      !props.scrolledToTop &&
      css`
        height: var(--nav-scroll-height);
        transform: translateY(0px);
        background-color: rgba(13, 13, 13, 0.92);
        box-shadow: 0 10px 30px -10px var(--navy-shadow);
      `};

    ${props =>
    props.scrollDirection === 'down' &&
      !props.scrolledToTop &&
      css`
        height: var(--nav-scroll-height);
        transform: translateY(calc(var(--nav-scroll-height) * -1));
        box-shadow: 0 10px 30px -10px var(--navy-shadow);
      `};
  }
`;

const StyledNav = styled.nav`
  ${({ theme }) => theme.mixins.flexBetween};
  position: relative;
  width: 100%;
  color: var(--lightest-slate);
  font-family: var(--font-mono);
  counter-reset: item 0;
  z-index: 12;

  .logo {
    ${({ theme }) => theme.mixins.flexCenter};

    a {
      display: flex;
      align-items: center;
      gap: 12px;
      color: var(--accent);
      position: relative;
      z-index: 1;
      text-decoration: none;
      min-height: 42px;

      /* Fixed box so global svg { width/height: 100% } cannot blow up the hex */
      .logo-mark {
        position: relative;
        width: 42px;
        height: 42px;
        flex-shrink: 0;
      }

      .hex-container {
        position: absolute;
        inset: 0;
        z-index: 0;
        pointer-events: none;
        @media (prefers-reduced-motion: no-preference) {
          transition: var(--transition);
        }

        svg {
          width: 100%;
          height: 100%;
          display: block;
        }
      }

      .logo-container {
        position: relative;
        z-index: 1;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
          width: 100%;
          height: 100%;
          max-width: 42px;
          max-height: 42px;
          display: block;
          fill: none;
          user-select: none;
          @media (prefers-reduced-motion: no-preference) {
            transition: var(--transition);
          }
          polygon {
            fill: var(--bg-primary);
          }
        }
      }

      &:hover,
      &:focus-visible {
        outline: 0;
        transform: translate(-4px, -4px);
        .hex-container {
          transform: translate(4px, 3px);
        }
      }
    }
  }
`;

const StyledLinks = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }

  ol {
    ${({ theme }) => theme.mixins.flexBetween};
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      margin: 0 5px;
      position: relative;
      counter-increment: item 1;
      font-size: var(--fz-xs);

      a {
        padding: 10px;

        &:before {
          content: '0' counter(item) '.';
          margin-right: 5px;
          color: var(--green);
          font-size: var(--fz-xxs);
          text-align: right;
        }
      }
    }
  }

  .nav-button {
    margin-left: 10px;
    font-size: 13px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: var(--text-secondary);
    border: 0.5px solid var(--bg-border);
    background: transparent;
    padding: 7px 14px;
    border-radius: 6px;
    font-family: var(--font-sans);
    text-decoration: none;
    transition: border-color 0.2s, color 0.2s;

    &:hover,
    &:focus-visible {
      border-color: #555555;
      color: var(--text-primary);
      outline: none;
    }

    svg {
      width: 16px;
      height: 16px;
    }
  }

  .btn-resume {
    margin-left: 10px;
    color: var(--accent);
    border: 0.5px solid var(--accent);
    padding: 7px 16px;
    border-radius: 6px;
    font-size: 13px;
    background: transparent;
    font-family: var(--font-sans);
    display: inline-flex;
    align-items: center;
    gap: 6px;
    text-decoration: none;
    transition: background 0.2s;

    &:hover,
    &:focus-visible {
      background: var(--accent-subtle);
      outline: none;
    }

    svg {
      width: 16px;
      height: 16px;
    }
  }

  .logo-text {
    margin-left: 12px;
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    font-weight: 600;
    color: var(--text-primary);
    letter-spacing: 0.08em;

    @media (max-width: 480px) {
      display: none;
    }
  }
`;

const Nav = ({ isHome }) => {
  const [isMounted, setIsMounted] = useState(!isHome);
  const scrollDirection = useScrollDirection('down');
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion();

  const handleScroll = () => {
    setScrolledToTop(window.pageYOffset < 50);
  };

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => {
      setIsMounted(true);
    }, 100);

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const timeout = isHome ? loaderDelay : 0;
  const fadeClass = isHome ? 'fade' : '';
  const fadeDownClass = isHome ? 'fadedown' : '';

  const logoMark = (
    <div className="logo-mark">
      <div className="hex-container" aria-hidden>
        <IconHex />
      </div>
      <div className="logo-container">
        <IconLogo />
      </div>
    </div>
  );

  const Logo = (
    <div className="logo" tabIndex="-1">
      {isHome ? (
        <a href="/" aria-label="home">
          {logoMark}
          <span className="logo-text">OEB</span>
        </a>
      ) : (
        <Link to="/" aria-label="home">
          {logoMark}
          <span className="logo-text">OEB</span>
        </Link>
      )}
    </div>
  );

  const githubLink = socialMedia.find(s => s.name === 'GitHub');
  const resumeLink = socialMedia.find(s => s.name === 'Resume');
  const resumeFrLink = socialMedia.find(s => s.name === 'ResumeFr');
  const linkedinLink = socialMedia.find(s => s.name === 'Linkedin');

  const HeaderButtons = (
    <>
      {githubLink && (
        <a
          href={githubLink.url}
          target="_blank"
          rel="noopener noreferrer"
          className="nav-button"
          aria-label="GitHub"
        >
          <IconGitHub />
          GitHub
        </a>
      )}
      {resumeLink && (
        <a
          href={resumeLink.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-resume"
          aria-label={resumeLink.ariaLabel || 'CV in English (PDF)'}
        >
          <IconResume />
          CV EN
        </a>
      )}
      {resumeFrLink && (
        <a
          href={resumeFrLink.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-resume"
          aria-label={resumeFrLink.ariaLabel || 'CV in French (PDF)'}
        >
          <IconResume />
          CV FR
        </a>
      )}
      {linkedinLink && (
        <a
          href={linkedinLink.url}
          target="_blank"
          rel="noopener noreferrer"
          className="nav-button"
          aria-label="LinkedIn"
        >
          <IconLinkedin />
          LinkedIn
        </a>
      )}
    </>
  );

  return (
    <StyledHeader scrollDirection={scrollDirection} scrolledToTop={scrolledToTop}>
      <StyledNav>
        {prefersReducedMotion ? (
          <>
            {Logo}

            <StyledLinks>
              <ol>
                {navLinks &&
                  navLinks.map(({ url, name }, i) => (
                    <li key={i}>
                      <Link to={url}>{name}</Link>
                    </li>
                  ))}
              </ol>
              <div>{HeaderButtons}</div>
            </StyledLinks>

            <Menu />
          </>
        ) : (
          <>
            <TransitionGroup component={null}>
              {isMounted && (
                <CSSTransition classNames={fadeClass} timeout={timeout}>
                  <>{Logo}</>
                </CSSTransition>
              )}
            </TransitionGroup>

            <StyledLinks>
              <ol>
                <TransitionGroup component={null}>
                  {isMounted &&
                    navLinks &&
                    navLinks.map(({ url, name }, i) => (
                      <CSSTransition key={i} classNames={fadeDownClass} timeout={timeout}>
                        <li key={i} style={{ transitionDelay: `${isHome ? i * 100 : 0}ms` }}>
                          <Link to={url}>{name}</Link>
                        </li>
                      </CSSTransition>
                    ))}
                </TransitionGroup>
              </ol>

              <TransitionGroup component={null}>
                {isMounted && (
                  <CSSTransition classNames={fadeDownClass} timeout={timeout}>
                    <div style={{ transitionDelay: `${isHome ? navLinks.length * 100 : 0}ms` }}>
                      {HeaderButtons}
                    </div>
                  </CSSTransition>
                )}
              </TransitionGroup>
            </StyledLinks>

            <TransitionGroup component={null}>
              {isMounted && (
                <CSSTransition classNames={fadeClass} timeout={timeout}>
                  <Menu />
                </CSSTransition>
              )}
            </TransitionGroup>
          </>
        )}
      </StyledNav>
    </StyledHeader>
  );
};

Nav.propTypes = {
  isHome: PropTypes.bool,
};

export default Nav;
