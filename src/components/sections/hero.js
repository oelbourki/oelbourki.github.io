import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { IconEmail, IconResume } from '@components/icons';
import { loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  position: relative;
  isolation: isolate;
  min-height: auto;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: calc(var(--nav-height) + 40px) 0 40px;
  overflow: hidden;
  background: radial-gradient(
    ellipse 70% 55% at 78% 0%,
    rgba(2, 151, 222, 0.09) 0%,
    transparent 58%
  );

  @media (max-width: 900px) {
    padding-top: calc(var(--nav-height) + 28px);
    padding-bottom: 32px;
  }

  @media (max-width: 480px) {
    padding-top: calc(var(--nav-height) + 20px);
    padding-bottom: 24px;
  }
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(240px, 300px);
  gap: clamp(28px, 4vw, 48px);
  width: 100%;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const HeroCopy = styled.div`
  min-width: 0;
`;

const HeroMeta = styled.p`
  margin: 0 0 16px;
  font-size: 13px;
  line-height: 1.4;
  color: var(--text-secondary);
  font-family: var(--font-mono);
`;

const HeroName = styled.h1`
  margin: 0 0 10px;
  font-size: clamp(34px, 5.5vw, 46px);
  font-weight: 600;
  color: #ffffff;
  letter-spacing: -0.02em;
  line-height: 1.1;
  text-wrap: balance;
`;

const HeroRole = styled.p`
  margin: 0 0 8px;
  font-size: clamp(17px, 2.2vw, 21px);
  font-weight: 500;
  line-height: 1.35;
  color: var(--accent-bright);
`;

const HeroFocus = styled.p`
  margin: 0 0 18px;
  max-width: 40em;
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-secondary);
  font-family: var(--font-mono);

  .sep {
    color: var(--text-tertiary);
    margin: 0 0.35em;
  }
`;

const HeroDesc = styled.p`
  margin: 0;
  max-width: 38em;
  font-size: var(--fz-md);
  line-height: 1.65;
  color: var(--text-secondary);

  strong {
    color: var(--text-primary);
    font-weight: 600;
  }

  @media (max-width: 480px) {
    font-size: var(--fz-sm);
  }
`;

const CtaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-top: 28px;

  @media (max-width: 480px) {
    margin-top: 24px;
  }
`;

const BtnPrimary = styled.a`
  ${({ theme }) => theme.mixins.bigButton};
  min-height: 40px;
  display: inline-flex;
  align-items: center;
  color: #02070a !important;
  background-color: #fc734d;
  opacity: 1;
  font-weight: 600;

  &:hover,
  &:focus,
  &:focus-visible {
    color: #02070a !important;
    background-color: #fc734d;
    opacity: 1;
    filter: none;
    outline: 2px solid var(--accent-bright);
    outline-offset: 3px;
  }
`;

const BtnOutline = styled.a`
  ${({ theme }) => theme.mixins.outlineNeutral};
  min-height: 40px;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  &:focus-visible {
    outline: 2px solid var(--accent-bright);
    outline-offset: 3px;
  }
`;

const FactCard = styled.aside`
  background: var(--bg-elevated);
  border: 0.5px solid var(--bg-border);
  border-radius: 10px;
  padding: 18px 20px;
  min-width: 0;

  @media (max-width: 900px) {
    max-width: 360px;
  }
`;

const FactRow = styled.div`
  & + & {
    margin-top: 14px;
    padding-top: 14px;
    border-top: 0.5px solid var(--bg-border);
  }
`;

const FactLabel = styled.div`
  font-size: 11px;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 4px;
  font-family: var(--font-mono);
`;

const FactValue = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  line-height: 1.4;

  .proof {
    color: var(--accent-secondary);
    font-weight: 600;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const inner = (
    <HeroGrid>
      <HeroCopy>
        <HeroMeta>
          Carrières-sous-Poissy, Île-de-France · Authorized to work in France · Open to hybrid /
          remote
        </HeroMeta>
        <HeroName>Otmane El Bourki</HeroName>
        <HeroRole>AI Engineer · 3+ years in production</HeroRole>
        <HeroFocus>
          Production LLM & RAG
          <span className="sep" aria-hidden>
            ·
          </span>
          Agentic AI
          <span className="sep" aria-hidden>
            ·
          </span>
          Inference Optimization
          <span className="sep" aria-hidden>
            ·
          </span>
          Cloud & MLOps
          <span className="sep" aria-hidden>
            ·
          </span>
          Evaluation
        </HeroFocus>
        <HeroDesc>
          Production LLM, RAG, and agentic systems — delivered{' '}
          <strong>3× inference throughput at 47% lower cost</strong>; building AI accelerators in
          ALTEN&apos;s A3 after shipping in finance and hospitality.
        </HeroDesc>
        <CtaRow>
          <BtnPrimary href="#projects">View projects</BtnPrimary>
          <BtnOutline href="mailto:otmane.elbourki@gmail.com">
            <IconEmail />
            Email
          </BtnOutline>
          <BtnOutline href="/resume.pdf" target="_blank" rel="noreferrer">
            <span aria-hidden="true">
              <IconResume />
            </span>
            Resume
          </BtnOutline>
        </CtaRow>
      </HeroCopy>

      <FactCard aria-label="Profile facts">
        <FactRow>
          <FactLabel>Now</FactLabel>
          <FactValue>AI Engineer · ALTEN (A3)</FactValue>
        </FactRow>
        <FactRow>
          <FactLabel>Stack</FactLabel>
          <FactValue>Azure · GCP · AWS · MLOps</FactValue>
        </FactRow>
        <FactRow>
          <FactLabel>Community</FactLabel>
          <FactValue>
            <span className="proof">300+</span> members · 1337 AI
          </FactValue>
        </FactRow>
      </FactCard>
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
