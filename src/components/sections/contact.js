import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { IconEmail } from '@components/icons';
import { srConfig, email, phone } from '@config';
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

  .cta-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-top: 36px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
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

  .phone-link {
    ${({ theme }) => theme.mixins.outlineNeutral};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 40px;
    font-size: 13px;
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

      <h2 className="title">Let&apos;s build something meaningful</h2>

      <p className="body">
        I&apos;m open to full-time and freelance AI engineering roles in France (hybrid / remote).
        Authorized to work in France; available in about one month (one week if needed). If
        you&apos;re building LLM systems, multi-agent pipelines, or production ML infrastructure —
        let&apos;s talk.
      </p>

      <div className="cta-row">
        <a className="email-link" href={`mailto:${email}`}>
          <IconEmail />
          Get in touch
        </a>
        <a className="phone-link" href={`tel:${phone.replace(/\s/g, '')}`}>
          {phone}
        </a>
      </div>
    </StyledContactSection>
  );
};

export default Contact;
