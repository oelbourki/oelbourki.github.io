import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled, { keyframes } from 'styled-components';
import { IconEmail } from '@components/icons';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
`;

const StyledHeroSection = styled.section`
  position: relative;
  isolation: isolate;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: calc(var(--nav-height) + 24px) 0 80px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -100px;
    left: -80px;
    width: 420px;
    height: 420px;
    background: radial-gradient(ellipse, rgba(78, 181, 255, 0.07) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: -1;
  }

  @media (max-width: 900px) {
    padding-top: calc(var(--nav-height) + 16px);
    padding-bottom: 56px;
    min-height: auto;
  }

  @media (max-width: 480px) {
    padding-top: calc(var(--nav-height) + 8px);
    padding-bottom: 40px;
  }
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(260px, 340px);
  gap: clamp(32px, 5vw, 56px);
  width: 100%;
  max-width: 1100px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const HeroTag = styled.div`
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  max-width: 100%;
  font-size: 12px;
  line-height: 1.45;
  color: var(--accent);
  background: var(--accent-subtle);
  border: 0.5px solid var(--accent-border);
  padding: 5px 12px;
  border-radius: 20px;
  margin-bottom: 20px;
  font-family: var(--font-mono);

  .pulse-dot {
    width: 6px;
    height: 6px;
    background: var(--accent);
    border-radius: 50%;
    flex-shrink: 0;
    animation: ${pulse} 2s infinite;
  }

  @media (max-width: 480px) {
    font-size: 11px;
    padding: 5px 10px;
    margin-bottom: 16px;
  }

  @media (prefers-reduced-motion: reduce) {
    .pulse-dot {
      animation: none;
    }
  }
`;

const HeroName = styled.h1`
  margin: 0 0 12px;
  font-size: clamp(36px, 6vw, 48px);
  font-weight: 600;
  color: #ffffff;
  letter-spacing: -0.02em;
  line-height: 1.1;
`;

const HeroRole = styled.p`
  margin: 0 0 20px;
  font-size: clamp(16px, 2.5vw, 22px);
  font-weight: 400;
  line-height: 1.45;
  max-width: 34em;

  .role-highlight {
    display: block;
    color: var(--accent-bright);
    font-weight: 500;
    margin-bottom: 4px;
  }

  .role-rest {
    display: block;
    color: var(--text-secondary);
  }

  @media (max-width: 480px) {
    margin-bottom: 16px;
    line-height: 1.5;
  }
`;

const HeroDesc = styled.p`
  margin: 0;
  max-width: 520px;
  font-size: var(--fz-md);
  line-height: 1.7;
  color: var(--text-secondary);

  @media (max-width: 480px) {
    font-size: var(--fz-sm);
  }
`;

const CtaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-top: 36px;

  @media (max-width: 480px) {
    margin-top: 28px;
  }
`;

const BtnPrimary = styled.a`
  ${({ theme }) => theme.mixins.bigButton};
`;

const BtnOutline = styled.a`
  ${({ theme }) => theme.mixins.outlineNeutral};
  display: inline-flex;
  align-items: center;
  gap: 8px;

  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
`;

const BtnResume = styled.a`
  color: var(--accent);
  border: 0.5px solid var(--accent);
  padding: 7px 16px;
  border-radius: 6px;
  font-size: 13px;
  background: transparent;
  font-family: var(--font-sans);
  transition: background 0.2s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;

  &:hover,
  &:focus-visible {
    background: var(--accent-subtle);
    outline: none;
  }
`;

const StatColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 900px) {
    max-width: 100%;
  }
`;

const StatCard = styled.div`
  background: var(--bg-elevated);
  border: 0.5px solid var(--bg-border);
  border-radius: 10px;
  padding: 14px 18px;
  min-width: 0;
  transition: border-color 0.2s;

  &:hover {
    border-color: var(--accent-border);
  }
`;

const StatLabel = styled.div`
  font-size: 11px;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 4px;
  font-family: var(--font-mono);
`;

const StatValue = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: var(--text-secondary);
  line-height: 1.45;

  .accent {
    color: var(--accent);
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsMounted(true);
    } else {
      const timeout = setTimeout(() => setIsMounted(true), navDelay);
      return () => clearTimeout(timeout);
    }
  }, [prefersReducedMotion]);

  const inner = (
    <HeroGrid>
      <div>
        <HeroTag>
          <span className="pulse-dot" aria-hidden />
          Carrières-sous-Poissy, France · 1-month notice
        </HeroTag>
        <HeroName>Otmane El Bourki</HeroName>
        <HeroRole>
          <span className="role-highlight">AI Engineer</span>
          <span className="role-rest">
            Production LLM &amp; RAG · Agentic AI · Inference Optimization · Cloud &amp; MLOps ·
            Evaluation
          </span>
        </HeroRole>
        <HeroDesc>
          AI Engineer at ALTEN (A3) — shipping across the full LLM stack: retrieval and agentic
          orchestration, inference optimization, and production deployment. Currently building AI
          accelerators group-wide after production delivery in finance and hospitality.
        </HeroDesc>
        <CtaRow>
          <BtnPrimary href="#projects">View projects</BtnPrimary>
          <BtnOutline href="mailto:otmane.elbourki@gmail.com" target="_blank" rel="noreferrer">
            <IconEmail />
            Let&apos;s build something
          </BtnOutline>
          <BtnResume href="/resume.pdf" target="_blank" rel="noreferrer">
            CV EN ↓
          </BtnResume>
        </CtaRow>
      </div>

      <StatColumn>
        <StatCard>
          <StatLabel>Specialization</StatLabel>
          <StatValue>
            <span className="accent">Agentic AI</span> · RAG · Inference
          </StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Infrastructure</StatLabel>
          <StatValue>
            <span className="accent">Azure</span> · GCP · AWS · MLOps
          </StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>Community</StatLabel>
          <StatValue>
            Built 1337 AI · <span className="accent">300+</span> · HackAI mentor
          </StatValue>
        </StatCard>
      </StatColumn>
    </HeroGrid>
  );

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        inner
      ) : (
        <TransitionGroup component={null}>
          {isMounted && (
            <CSSTransition classNames="fadeup" timeout={loaderDelay}>
              <div style={{ width: '100%' }}>{inner}</div>
            </CSSTransition>
          )}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
