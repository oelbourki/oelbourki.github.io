import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const CertCard = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--bg-elevated);
  border: 0.5px solid var(--bg-border);
  border-radius: 10px;
  padding: 16px;
  text-decoration: none;
  transition: border-color 0.2s;
  color: inherit;

  &:hover {
    border-color: var(--accent-border);
  }
`;

const CertLogo = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background: var(--bg-primary);
  border: 0.5px solid var(--bg-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  color: var(--accent);
  font-family: var(--font-mono);
  flex-shrink: 0;
`;

const CertName = styled.div`
  font-size: 13px;
  font-weight: 500;
  color: var(--text-primary);
  line-height: 1.35;
`;

const CertSub = styled.div`
  font-size: 11px;
  color: var(--text-tertiary);
  margin-top: 2px;
`;

const CertMeta = styled.div`
  flex: 1;
  min-width: 0;
`;

const certifications = [
  { abbr: 'GCP', title: 'Google Cloud', sub: 'AI Infrastructure · Jan 2026', url: 'https://cloud.google.com/' },
  { abbr: 'JHU', title: 'Johns Hopkins', sub: 'GPU Programming · Jan 2026', url: 'https://www.coursera.org/' },
  { abbr: 'LG', title: 'LangChain', sub: 'LangGraph · May 2025', url: 'https://www.langchain.com/' },
  { abbr: 'RT', title: 'DeepLearning.AI', sub: 'Red Teaming LLMs · Jan 2025', url: 'https://www.deeplearning.ai/' },
  { abbr: 'RAG', title: 'DeepLearning.AI', sub: 'Advanced RAG · Dec 2024', url: 'https://www.deeplearning.ai/' },
  { abbr: 'FT', title: 'DeepLearning.AI', sub: 'Finetuning (Lamini) · Dec 2024', url: 'https://www.deeplearning.ai/' },
  { abbr: 'EP', title: 'École Polytechnique', sub: 'GenAI Winter School · Mar 2024', url: 'https://www.polytechnique.edu/' },
];

const Certifications = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !revealContainer.current) return;
    sr.reveal(revealContainer.current, srConfig());
  }, [prefersReducedMotion]);

  return (
    <section id="certifications" ref={revealContainer} style={{ maxWidth: 900 }}>
      <h2 className="numbered-heading">Certifications</h2>

      <Grid>
        {certifications.map((cert, i) => (
          <CertCard key={i} href={cert.url} target="_blank" rel="noopener noreferrer">
            <CertLogo>{cert.abbr}</CertLogo>
            <CertMeta>
              <CertName>{cert.title}</CertName>
              <CertSub>{cert.sub}</CertSub>
            </CertMeta>
          </CertCard>
        ))}
      </Grid>
    </section>
  );
};

export default Certifications;
