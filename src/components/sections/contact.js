import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { IconEmail } from '@components/icons';
import { srConfig, email } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledContactSection = styled.section`
  max-width: 600px;
  margin: 0 auto 100px;
  text-align: center;

  @media (max-width: 768px) {
    margin: 0 auto 50px;
  }

  .overline {
    display: block;
    margin-bottom: 20px;
    color: var(--accent);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;

    &:before {
      bottom: 0;
      font-size: var(--fz-sm);
    }

    &:after {
      display: none;
    }
  }

  .title {
    font-size: clamp(40px, 5vw, 60px);
    color: var(--text-primary);
  }

  .body {
    color: var(--text-secondary);
    line-height: 1.7;
    font-size: var(--fz-md);
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 36px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    svg {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }
  }
`;

const Contact = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <h2 className="numbered-heading overline">What’s Next?</h2>

      <h2 className="title">Let&apos;s build something.</h2>

      <p className="body">
        I&apos;m currently open to full-time and freelance AI engineering roles in France and Germany. If you&apos;re working on LLM systems, multi-agent pipelines, or production ML infrastructure — let&apos;s talk.
      </p>

      <a className="email-link" href={`mailto:${email}`}>
        <IconEmail />
        Let&apos;s build something
      </a>
    </StyledContactSection>
  );
};

export default Contact;
