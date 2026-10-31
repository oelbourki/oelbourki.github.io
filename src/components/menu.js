import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Helmet } from 'react-helmet';
import { Link } from 'gatsby';
import { useLocation } from '@gatsbyjs/reach-router';
import styled from 'styled-components';
import { navLinks } from '@config';
import { KEY_CODES } from '@utils';
import { IconResume, IconGitHub, IconLinkedin } from '@components/icons';

const MENU_BREAKPOINT = 900;

const StyledMenu = styled.div`
  display: none;

  @media (max-width: ${MENU_BREAKPOINT}px) {
    display: block;
  }
`;

const StyledHamburgerButton = styled.button`
  ${({ theme }) => theme.mixins.flexCenter};
  position: relative;
  z-index: 12;
  margin-right: -8px;
  padding: 12px;
  border: 0;
  background-color: transparent;
  color: inherit;
  text-transform: none;
  transition-timing-function: linear;
  transition-duration: 0.15s;
  transition-property: opacity, filter;

  .ham-box {
    display: inline-block;
    position: relative;
    width: var(--hamburger-width);
    height: 24px;
  }

  .ham-box-inner {
    position: absolute;
    top: 50%;
    right: 0;
    width: var(--hamburger-width);
    height: 2px;
    border-radius: var(--border-radius);
    background-color: var(--green);
    transition-duration: 0.22s;
    transition-property: transform;
    transition-delay: ${props => (props.menuOpen ? `0.12s` : `0s`)};
    transform: rotate(${props => (props.menuOpen ? `225deg` : `0deg`)});
    transition-timing-function: cubic-bezier(
      ${props => (props.menuOpen ? `0.215, 0.61, 0.355, 1` : `0.55, 0.055, 0.675, 0.19`)}
    );
    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      left: auto;
      right: 0;
      width: var(--hamburger-width);
      height: 2px;
      border-radius: 4px;
      background-color: var(--green);
      transition-timing-function: ease;
      transition-duration: 0.15s;
      transition-property: transform;
    }
    &:before {
      width: ${props => (props.menuOpen ? `100%` : `120%`)};
      top: ${props => (props.menuOpen ? `0` : `-10px`)};
      opacity: ${props => (props.menuOpen ? 0 : 1)};
      transition: ${({ menuOpen }) =>
    menuOpen ? 'var(--ham-before-active)' : 'var(--ham-before)'};
    }
    &:after {
      width: ${props => (props.menuOpen ? `100%` : `80%`)};
      bottom: ${props => (props.menuOpen ? `0` : `-10px`)};
      transform: rotate(${props => (props.menuOpen ? `-90deg` : `0`)});
      transition: ${({ menuOpen }) => (menuOpen ? 'var(--ham-after-active)' : 'var(--ham-after)')};
    }
  }
`;

const StyledSidebar = styled.aside`
  display: none;

  @media (max-width: ${MENU_BREAKPOINT}px) {
    ${({ theme }) => theme.mixins.flexCenter};
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    padding: max(80px, env(safe-area-inset-top, 0px) + 72px) 24px 40px;
    width: min(75vw, 360px);
    height: 100vh;
    height: 100dvh;
    outline: 0;
    background-color: var(--bg-elevated);
    box-shadow: -10px 0px 30px -15px var(--navy-shadow);
    z-index: 10;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    transform: translateX(${props => (props.menuOpen ? 0 : 100)}%);
    visibility: ${props => (props.menuOpen ? 'visible' : 'hidden')};
    pointer-events: ${props => (props.menuOpen ? 'auto' : 'none')};
    transition: var(--transition);
  }

  @media (max-width: ${MENU_BREAKPOINT}px) {
    nav {
      ${({ theme }) => theme.mixins.flexBetween};
      width: 100%;
      max-width: 280px;
      margin: 0 auto;
      flex-direction: column;
      justify-content: flex-start;
      gap: 28px;
      color: var(--lightest-slate);
      font-family: var(--font-mono);
      text-align: center;
    }

    ol {
      padding: 0;
      margin: 0;
      list-style: none;
      width: 100%;

      li {
        position: relative;
        margin: 0 auto 4px;
        font-size: clamp(var(--fz-sm), 3.6vw, var(--fz-lg));
      }

      a {
        ${({ theme }) => theme.mixins.link};
        display: block;
        width: 100%;
        padding: 10px 16px;
        color: var(--text-primary);
      }

      li.active a {
        color: var(--accent-bright);
      }
    }

    .sidebar-links {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 10px;
      width: 100%;
      padding-top: 8px;
      border-top: 0.5px solid var(--bg-border);

      a {
        ${({ theme }) => theme.mixins.outlineNeutral};
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        min-height: 42px;
        width: 100%;
        padding: 10px 16px;
        font-size: 13px;

        svg {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
        }
      }
    }
  }
`;

const extraLinks = [
  { name: 'Certifications', url: '/#certifications' },
  { name: 'Writing', url: '/pensieve' },
];

const navLinkIsActive = (location, url) => {
  if (!url || !url.includes('#')) {
    return false;
  }
  const hash = url.slice(url.indexOf('#'));
  return location.pathname === '/' && location.hash === hash;
};

const Menu = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [portalReady, setPortalReady] = useState(false);

  const toggleMenu = () => setMenuOpen(open => !open);

  const buttonRef = useRef(null);
  const navRef = useRef(null);
  const sidebarRef = useRef(null);

  let menuFocusables;
  let firstFocusableEl;
  let lastFocusableEl;

  const setFocusables = () => {
    if (!buttonRef.current || !navRef.current) return;
    menuFocusables = [buttonRef.current, ...Array.from(navRef.current.querySelectorAll('a'))];
    firstFocusableEl = menuFocusables[0];
    lastFocusableEl = menuFocusables[menuFocusables.length - 1];
  };

  const handleBackwardTab = e => {
    if (document.activeElement === firstFocusableEl) {
      e.preventDefault();
      lastFocusableEl.focus();
    }
  };

  const handleForwardTab = e => {
    if (document.activeElement === lastFocusableEl) {
      e.preventDefault();
      firstFocusableEl.focus();
    }
  };

  const onKeyDown = e => {
    switch (e.key) {
      case KEY_CODES.ESCAPE:
      case KEY_CODES.ESCAPE_IE11: {
        setMenuOpen(false);
        break;
      }

      case KEY_CODES.TAB: {
        if (menuFocusables && menuFocusables.length === 1) {
          e.preventDefault();
          break;
        }
        if (e.shiftKey) {
          handleBackwardTab(e);
        } else {
          handleForwardTab(e);
        }
        break;
      }

      default: {
        break;
      }
    }
  };

  const onResize = () => {
    if (window.innerWidth > MENU_BREAKPOINT) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);

    setFocusables();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    setFocusables();
  }, [menuOpen]);

  // Close when clicking outside hamburger + drawer (drawer is portaled to body)
  useEffect(() => {
    if (!menuOpen) return undefined;

    const listener = event => {
      const target = event.target;
      if (buttonRef.current?.contains(target)) return;
      if (sidebarRef.current?.contains(target)) return;
      setMenuOpen(false);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [menuOpen]);

  const allNavLinks = [...(navLinks || []), ...extraLinks];

  const sidebar =
    portalReady &&
    createPortal(
      <StyledSidebar
        ref={sidebarRef}
        menuOpen={menuOpen}
        aria-hidden={!menuOpen}
        tabIndex={menuOpen ? 1 : -1}>
        <nav ref={navRef}>
          <ol>
            {allNavLinks.map(({ url, name }, i) => (
              <li key={i} className={navLinkIsActive(location, url) ? 'active' : undefined}>
                <Link to={url} onClick={() => setMenuOpen(false)}>
                  {name}
                </Link>
              </li>
            ))}
          </ol>

          <div className="sidebar-links">
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
              <IconResume />
              Resume
            </a>
            <a href="https://github.com/oelbourki" target="_blank" rel="noopener noreferrer">
              <IconGitHub />
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/oelbourki" target="_blank" rel="noopener noreferrer">
              <IconLinkedin />
              LinkedIn
            </a>
          </div>
        </nav>
      </StyledSidebar>,
      document.body,
    );

  return (
    <StyledMenu>
      <Helmet>
        <body className={menuOpen ? 'blur' : ''} />
      </Helmet>

      <StyledHamburgerButton
        onClick={toggleMenu}
        menuOpen={menuOpen}
        ref={buttonRef}
        aria-label="Menu"
        aria-expanded={menuOpen}>
        <div className="ham-box">
          <div className="ham-box-inner" />
        </div>
      </StyledHamburgerButton>

      {sidebar}
    </StyledMenu>
  );
};

export default Menu;
