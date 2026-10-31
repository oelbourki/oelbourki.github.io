import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledCertifications = styled.section`
  max-width: 1100px;

  .more-button {
    ${({ theme }) => theme.mixins.button};
    margin: 40px auto 0;
    display: block;
  }
`;

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
  color: var(--accent-bright);
  font-family: var(--font-mono);
  flex-shrink: 0;
`;

const CertName = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  line-height: 1.35;
`;

const CertSub = styled.div`
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 2px;
  line-height: 1.4;
`;

const CertMeta = styled.div`
  flex: 1;
  min-width: 0;
`;

const coursera = id => `https://www.coursera.org/account/accomplishments/verify/${id}`;

/** Primary: production / recent signal — shown first */
const primaryCerts = [
  {
    abbr: 'GCP',
    title: 'Google Cloud',
    sub: 'AI Infrastructure Specialization · Jan 2026',
    url: coursera('XKGGNMQVK2RK'),
  },
  {
    abbr: 'JHU',
    title: 'Johns Hopkins',
    sub: 'Concurrent Programming with GPUs · Jan 2026',
    url: coursera('N0MT16TO76P9'),
  },
  {
    abbr: 'LG',
    title: 'LangChain',
    sub: 'Introduction to LangGraph · May 2025',
    url: 'https://www.langchain.com/',
  },
  {
    abbr: 'RT',
    title: 'DeepLearning.AI',
    sub: 'Red Teaming LLM Applications · Jan 2025',
    url: 'https://www.deeplearning.ai/',
  },
  {
    abbr: 'RAG',
    title: 'DeepLearning.AI',
    sub: 'Building & Evaluating Advanced RAG · Dec 2024',
    url: 'https://www.deeplearning.ai/',
  },
  {
    abbr: 'FT',
    title: 'DeepLearning.AI',
    sub: 'Finetuning LLMs with Lamini · Dec 2024',
    url: 'https://www.deeplearning.ai/',
  },
  {
    abbr: 'EP',
    title: 'École Polytechnique',
    sub: 'Winter School: Generative AI · Mar 2024',
    url: 'https://www.polytechnique.edu/',
  },
];

/**
 * Secondary (Show more): adjacent LLM stack + early foundations
 * so dates show continuous AI learning from 2020.
 */
const moreCerts = [
  {
    abbr: 'Q',
    title: 'DeepLearning.AI',
    sub: 'Quantization Fundamentals (Hugging Face) · Dec 2024',
    url: 'https://www.deeplearning.ai/',
  },
  {
    abbr: 'VD',
    title: 'DeepLearning.AI',
    sub: 'Vector Databases with Weaviate · Dec 2024',
    url: 'https://www.deeplearning.ai/',
  },
  {
    abbr: 'OPS',
    title: 'DeepLearning.AI',
    sub: 'LLMOps with Google Cloud · Dec 2024',
    url: 'https://www.deeplearning.ai/',
  },
  {
    abbr: 'AWS',
    title: 'Amazon Web Services',
    sub: 'Practical Data Science Specialization · Apr 2022',
    url: coursera('C64Y5NJLJ9H5'),
  },
  {
    abbr: 'IN',
    title: 'Inria',
    sub: 'Machine Learning in Python with scikit-learn · Jul 2021',
    url: 'https://www.inria.fr/',
  },
  {
    abbr: 'ICL',
    title: 'Imperial College London',
    sub: 'Mathematics for Machine Learning · Apr 2021',
    url: coursera('5HEB8G2528E5'),
  },
  {
    abbr: 'TF',
    title: 'DeepLearning.AI',
    sub: 'TensorFlow Developer Specialization · Oct 2020',
    url: coursera('R4UC8W9DEEVD'),
  },
  {
    abbr: 'DL',
    title: 'DeepLearning.AI',
    sub: 'Deep Learning Specialization · Oct 2020',
    url: coursera('P3QREUFEN7PX'),
  },
  {
    abbr: 'TFD',
    title: 'DeepLearning.AI',
    sub: 'TensorFlow: Data and Deployment · Oct 2020',
    url: coursera('NP2QHYV4NNC2'),
  },
];

const Certifications = () => {
  const [showMore, setShowMore] = useState(false);
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !revealContainer.current) return;
    sr.reveal(revealContainer.current, srConfig());
  }, [prefersReducedMotion]);

  const visible = showMore ? [...primaryCerts, ...moreCerts] : primaryCerts;

  return (
    <StyledCertifications id="certifications" ref={revealContainer}>
      <h2 className="numbered-heading">Certifications</h2>

      <Grid>
        {visible.map((cert, i) => (
          <CertCard key={`${cert.abbr}-${cert.sub}`} href={cert.url} target="_blank" rel="noopener noreferrer">
            <CertLogo>{cert.abbr}</CertLogo>
            <CertMeta>
              <CertName>{cert.title}</CertName>
              <CertSub>{cert.sub}</CertSub>
            </CertMeta>
          </CertCard>
        ))}
      </Grid>

      <button type="button" className="more-button" onClick={() => setShowMore(v => !v)}>
        Show {showMore ? 'Less' : 'More'}
      </button>
    </StyledCertifications>
  );
};

export default Certifications;
