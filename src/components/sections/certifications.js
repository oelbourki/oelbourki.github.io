import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledCertificationsSection = styled.section`
  max-width: 700px;

  ul {
    ${({ theme }) => theme.mixins.fancyList};
  }

  .cert-item {
    margin-bottom: 15px;

    .cert-title {
      color: var(--lightest-slate);
      font-weight: 500;
    }

    .cert-issuer {
      color: var(--slate);
      font-size: var(--fz-md);
      margin-top: 2px;
    }

    .cert-date {
      color: var(--dark-slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      margin-top: 2px;
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }
`;

const certifications = [
  {
    title: 'GCP AI Infrastructure',
    issuer: 'Google Cloud',
    url: 'https://cloud.google.com/',
    date: 'Jan 2026',
  },
  {
    title: 'GPU Programming',
    issuer: 'Johns Hopkins University',
    url: 'https://www.coursera.org/',
    date: 'Jan 2026',
  },
  {
    title: 'LangGraph',
    issuer: 'LangChain',
    url: 'https://www.langchain.com/',
    date: 'May 2025',
  },
  {
    title: 'Red Teaming LLM Applications',
    issuer: 'DeepLearning.AI',
    url: 'https://www.deeplearning.ai/',
    date: 'Jan 2025',
  },
  {
    title: 'Building & Evaluating Advanced RAG',
    issuer: 'DeepLearning.AI',
    url: 'https://www.deeplearning.ai/',
    date: 'Dec 2024',
  },
  {
    title: 'Finetuning LLMs with Lamini',
    issuer: 'DeepLearning.AI',
    url: 'https://www.deeplearning.ai/',
    date: 'Dec 2024',
  },
  {
    title: 'GenAI Winter School',
    issuer: 'École Polytechnique',
    url: 'https://www.polytechnique.edu/',
    date: 'Mar 2024',
  },
];

const Certifications = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !revealContainer.current) return;
    sr.reveal(revealContainer.current, srConfig());
  }, [prefersReducedMotion]);

  return (
    <StyledCertificationsSection id="certifications" ref={revealContainer}>
      <h2 className="numbered-heading">Certifications</h2>

      <ul>
        {certifications.map((cert, i) => (
          <li key={i} className="cert-item">
            <span className="cert-title">{cert.title}</span>
            <div className="cert-issuer">
              {cert.url ? (
                <a href={cert.url} target="_blank" rel="noopener noreferrer">
                  {cert.issuer}
                </a>
              ) : (
                cert.issuer
              )}
              {cert.date && <span className="cert-date"> · {cert.date}</span>}
            </div>
          </li>
        ))}
      </ul>
    </StyledCertificationsSection>
  );
};

export default Certifications;
