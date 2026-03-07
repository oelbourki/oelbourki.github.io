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
    title: 'Quality and Safety for LLM Applications',
    issuer: 'WhyLabs',
    url: 'https://www.whylabs.ai/',
  },
  {
    title: 'Red Teaming LLM Applications',
    issuer: 'Giskard',
    url: 'https://giskard.ai/',
  },
  {
    title: 'GenAI Winter School',
    issuer: 'École Polytechnique',
    url: 'https://www.polytechnique.edu/',
    date: 'Mar 2024',
  },
  {
    title: 'Mathematics for Machine Learning',
    issuer: 'Coursera',
    url: 'https://www.coursera.org/',
  },
  {
    title: 'Finetuning Large Language Models',
    issuer: 'Lamini',
    url: 'https://www.lamini.ai/',
  },
  {
    title: 'Deep Learning Specialization',
    issuer: 'Coursera',
    url: 'https://www.coursera.org/specializations/deep-learning',
  },
  {
    title: 'Practical Data Science',
    issuer: 'AWS',
    url: 'https://aws.amazon.com/',
    date: 'Apr 2022',
  },
];

const Certifications = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
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
                <a href={cert.url} target="_blank" rel="noreferrer">
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
