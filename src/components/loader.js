import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import anime from 'animejs';
import styled from 'styled-components';
import { IconLoader } from '@components/icons';

const StyledLoader = styled.div`
  ${({ theme }) => theme.mixins.flexCenter};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: var(--dark-navy);
  z-index: 99;

  .logo-wrapper {
    width: max-content;
    max-width: 100px;
    transition: opacity 0.2s ease, transform 0.2s ease;
    opacity: ${props => (props.isMounted ? 1 : 0)};
    svg {
      display: block;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      fill: none;
      user-select: none;
      #B {
        opacity: 0;
      }
    }
  }
`;

const Loader = ({ finishLoading }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    let done = false;
    const doneOnce = () => {
      if (done) {
        return;
      }
      done = true;
      finishLoading();
    };

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      doneOnce();
      return undefined;
    }

    const mountTimeout = setTimeout(() => setIsMounted(true), 10);
    // Never leave the home route stuck behind the splash if anime stalls (HMR / missing targets).
    const failSafe = setTimeout(doneOnce, 1600);

    const loader = anime.timeline({
      complete: doneOnce,
    });

    loader
      .add({
        targets: '#logo path',
        delay: 40,
        duration: 480,
        easing: 'easeInOutQuart',
        strokeDashoffset: [anime.setDashoffset, 0],
      })
      .add({
        targets: '#logo #B',
        duration: 200,
        easing: 'easeInOutQuart',
        opacity: 1,
      })
      .add({
        targets: '#logo',
        delay: 60,
        duration: 180,
        easing: 'easeInOutQuart',
        opacity: 0,
        scale: 0.1,
      })
      .add({
        targets: '.loader',
        duration: 140,
        easing: 'easeInOutQuart',
        opacity: 0,
        zIndex: -1,
      });

    return () => {
      clearTimeout(mountTimeout);
      clearTimeout(failSafe);
      anime.remove('#logo path');
      anime.remove('#logo #B');
      anime.remove('#logo');
      anime.remove('.loader');
    };
  }, [finishLoading]);

  return (
    <StyledLoader className="loader" isMounted={isMounted}>
      <Helmet bodyAttributes={{ class: `hidden` }} />

      <div className="logo-wrapper">
        <IconLoader />
      </div>
    </StyledLoader>
  );
};

Loader.propTypes = {
  finishLoading: PropTypes.func.isRequired,
};

export default Loader;
