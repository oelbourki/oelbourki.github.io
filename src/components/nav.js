import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import { useLocation } from '@gatsbyjs/reach-router';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled, { css } from 'styled-components';
import { navLinks, socialMedia } from '@config';
import { loaderDelay } from '@utils';
import { useScrollDirection, usePrefersReducedMotion } from '@hooks';
import { Menu } from '@components';
import { IconLogo, IconResume, IconGitHub, IconLinkedin } from '@components/icons';

const StyledHeader = styled.header`
  ${({ theme }) => theme.mixins.flexBetween};
  position: fixed;
  top: 0;
  z-index: 11;
  padding: 0px 50px;
  width: 100%;
  max-width: 100vw;
  height: var(--nav-height);
  box-sizing: border-box;
  background-color: rgba(2, 7, 10, 0.88);
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
        background-color: rgba(2, 7, 10, 0.94);
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
  font-family: var(--font-sans);
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

      .logo-mark {
        position: relative;
        width: 42px;
        height: 42px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
          width: 100%;
          height: 100%;
          display: block;
          user-select: none;
          @media (prefers-reduced-motion: no-preference) {
            transition: var(--transition);
          }
        }
      }

      &:hover,
      &:focus-visible {
        outline: 0;
        .logo-mark {
          transform: translateY(-1px);
        }
      }
    }
  }
`;

const StyledLinks = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 1;
  min-width: 0;

  @media (max-width: 900px) {
    display: none;
  }

  ol {
    ${({ theme }) => theme.mixins.flexBetween};
    padding: 0;
    margin: 0;
    list-style: none;
    flex-shrink: 1;
    gap: 4px;

    @media (max-width: 1100px) {
      gap: 0;
    }

    li {
      margin: 0;
      position: relative;
      font-size: 14px;
      white-space: nowrap;

      a {
        padding: 10px 12px;
        color: var(--text-secondary);
        text-decoration: none;
        transition: color 0.2s;

        @media (max-width: 1100px) {
          padding: 10px 8px;
          font-size: 13px;
        }

        &:hover {
          color: var(--text-primary);
        }

        &:focus-visible {
          color: var(--text-primary);
          outline: 2px dashed var(--accent-bright);
          outline-offset: 3px;
        }
      }

      &.active a {
        color: var(--accent-bright);
      }
    }
  }

  .nav-cta-group {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    flex-shrink: 0;
    gap: 8px;
    margin-left: 12px;

    @media (max-width: 1100px) {
      gap: 6px;
      margin-left: 8px;
    }
  }

  .nav-button,
  .btn-resume {
    margin-left: 0;
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
    white-space: nowrap;
    transition: border-color 0.2s, color 0.2s;

    &:hover {
      border-color: #555555;
      color: var(--text-primary);
    }

    &:focus-visible {
      border-color: var(--accent);
      color: var(--text-primary);
      outline: 2px solid var(--accent-bright);
      outline-offset: 3px;
    }

    svg {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }

    /* At mild zoom / mid widths, keep icons and drop labels so the bar fits */
    @media (max-width: 1100px) {
      padding: 7px 10px;

      .nav-label {
        display: none;
      }
    }
  }
`;

const StyledLogoText = styled.span`
  margin-left: 12px;
  font-family: var(--font-mono);
  font-size: var(--fz-sm);
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: 0.08em;

  @media (max-width: 480px) {
    display: none;
  }
`;

const navLinkIsActive = (location, url) => {
  if (!url || !url.includes('#')) {
    return false;
  }
  const hash = url.slice(url.indexOf('#'));
  return location.pathname === '/' && location.hash === hash;
};

const Nav = ({ isHome }) => {
  const location = useLocation();
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
    <div className="logo-mark" aria-hidden>
      <IconLogo />
    </div>
  );

  const Logo = (
    <div className="logo" tabIndex="-1">
      {isHome ? (
        <a href="/" aria-label="home">
          {logoMark}
          <StyledLogoText>oelbourki</StyledLogoText>
        </a>
      ) : (
        <Link to="/" aria-label="home">
          {logoMark}
          <StyledLogoText>oelbourki</StyledLogoText>
        </Link>
      )}
    </div>
  );

  const resumeLink = socialMedia.find(s => s.name === 'Resume');
  const resumeFrLink = socialMedia.find(s => s.name === 'ResumeFr');
  const githubLink = socialMedia.find(s => s.name === 'GitHub');
  const linkedinLink = socialMedia.find(s => s.name === 'Linkedin');

  const HeaderButtons = (
    <div className="nav-cta-group">
      {resumeLink && (
        <a
          href={resumeLink.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-resume"
          aria-label={resumeLink.ariaLabel || 'CV in English (PDF)'}
        >
          <IconResume />
          <span className="nav-label">Resume</span>
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
          <span className="nav-label">CV FR</span>
        </a>
      )}
      {githubLink && (
        <a
          href={githubLink.url}
          target="_blank"
          rel="noopener noreferrer"
          className="nav-button"
          aria-label="GitHub"
        >
          <IconGitHub />
          <span className="nav-label">GitHub</span>
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
          <span className="nav-label">LinkedIn</span>
        </a>
      )}
    </div>
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
                    <li key={i} className={navLinkIsActive(location, url) ? 'active' : undefined}>
                      <Link to={url}>{name}</Link>
                    </li>
                  ))}
              </ol>
              {HeaderButtons}
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
                        <li
                          key={i}
                          className={navLinkIsActive(location, url) ? 'active' : undefined}
                          style={{ transitionDelay: `${isHome ? i * 100 : 0}ms` }}>
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
