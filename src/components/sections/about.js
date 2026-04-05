import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;

// const About = () => {
//   const revealContainer = useRef(null);
//   const prefersReducedMotion = usePrefersReducedMotion();

//   useEffect(() => {
//     if (prefersReducedMotion) {
//       return;
//     }

//     sr.reveal(revealContainer.current, srConfig());
//   }, []);

//   const skills = ['JavaScript (ES6+)', 'TypeScript', 'React', 'Eleventy', 'Node.js', 'WordPress'];

//   return (
//     <StyledAboutSection id="about" ref={revealContainer}>
//       <h2 className="numbered-heading">About Me</h2>

//       <div className="inner">
//         <StyledText>
//           <div>
//             <p>
//               Hello! My name is Brittany and I enjoy creating things that live on the internet. My
//               interest in web development started back in 2012 when I decided to try editing custom
//               Tumblr themes — turns out hacking together a custom reblog button taught me a lot
//               about HTML &amp; CSS!
//             </p>

//             <p>
//               Fast-forward to today, and I've had the privilege of working at{' '}
//               <a href="https://us.mullenlowe.com/">an advertising agency</a>,{' '}
//               <a href="https://starry.com/">a start-up</a>,{' '}
//               <a href="https://www.apple.com/">a huge corporation</a>, and{' '}
//               <a href="https://scout.camd.northeastern.edu/">a student-led design studio</a>. My
//               main focus these days is building accessible, inclusive products and digital
//               experiences at <a href="https://upstatement.com/">Upstatement</a> for a variety of
//               clients.
//             </p>

//             <p>
//               I also recently{' '}
//               <a href="https://www.newline.co/courses/build-a-spotify-connected-app">
//                 launched a course
//               </a>{' '}
//               that covers everything you need to build a web app with the Spotify API using Node
//               &amp; React.
//             </p>

//             <p>Here are a few technologies I've been working with recently:</p>
//           </div>

//           <ul className="skills-list">
//             {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
//           </ul>
//         </StyledText>

//         <StyledPic>
//           <div className="wrapper">
//             <StaticImage
//               className="img"
//               src="../../images/me.jpg"
//               width={500}
//               quality={95}
//               formats={['AUTO', 'WEBP', 'AVIF']}
//               alt="Headshot"
//             />
//           </div>
//         </StyledPic>
//       </div>
//     </StyledAboutSection>
//   );
// };

// export default About;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, [prefersReducedMotion]);

  const aiEngineeringSkillsList = [
    {
      category: 'Programming & Software',
      skills: [
        'Python',
        'C/C++',
        'FastAPI',
        'REST APIs',
        'Microservices',
        'Linux/Shell',
      ],
    },
    {
      category: 'Deep Learning & LLMs',
      skills: [
        'PyTorch',
        'TensorFlow',
        'Hugging Face',
        'Fine-tuning (LoRA/QLoRA)',
        '4-bit Quantization (AWQ/GPTQ)',
        'vLLM',
        'ONNX Runtime',
        'Multimodal Document Understanding',
      ],
    },
    {
      category: 'LLM Orchestration & Retrieval',
      skills: [
        'LangChain',
        'LangGraph',
        'Multi-Agent Systems',
        'RAG / GraphRAG / Hybrid Search',
        'Vector Databases (Qdrant, ChromaDB)',
        'Reranking',
        'Prompt Engineering',
        'Pydantic',
      ],
    },
    {
      category: 'MLOps & LLMOps',
      skills: [
        'Docker',
        'Kubernetes (K3s)',
        'Ray Serve',
        'MLflow',
        'CI/CD (GitHub Actions, GitOps)',
        'GPU Inference Optimization',
        'Cloud Deployment & Scalability (AWS, GCP)',
      ],
    },
    {
      category: 'Evaluation & Observability',
      skills: [
        'Model Testing & Validation',
        'Ragas / DeepEval',
        'Golden Dataset Testing',
        'LLM Metrics (Faithfulness, Relevance)',
        'Responsible AI & Bias Mitigation',
        'LangSmith',
        'Langfuse',
        'Prometheus',
      ],
    },
    {
      category: 'Data Systems',
      skills: [
        'SQL',
        'Redis',
        'Neo4j',
        'Vector Similarity Search',
        'Pandas',
        'Structured Extraction Pipelines (Docling, PDF/OCR)',
      ],
    },
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              AI Engineer with 4+ years of software engineering experience, including 2+ years specialized in production LLM systems, multi-agent platforms, and GPU inference infrastructure on GCP. I deliver measurable impact—examples include 3× inference throughput and 47% infrastructure cost reduction—and I specialize at the intersection of inference optimization and multi-agent orchestration across finance, real estate, and research.
            </p>

            <p>
              Recent work spans production LangGraph/FastAPI platforms with adaptive RAG and multi-LLM routing, GraphRAG on Neo4j for financial intelligence, secure sandboxed code execution (codibox), and full MLOps: Docker, Kubernetes, CI/CD, and observability with LangSmith, Langfuse, and Prometheus.
            </p>

            <p>
              <strong>Leadership:</strong> Founder of 1337 AI, where I grew a 300+ member AI engineering community through bootcamps and workshops. <strong>Education:</strong> École 42 Paris — IT Architecture Expert (Data Architecture), RNCP 7, Level 21; ranked 3rd globally in pedagogical innovation (WURI 2025). Ibn Tofaïl University — Specialized Master&apos;s in AI. Mohammed VI Polytechnic University (1337) — Digital Technology Architect.
            </p>

            <p>
              <strong>Available immediately</strong> for hybrid or remote roles; open to national and international mobility. <strong>Open to AI/ML Engineering, MLOps, or Cloud AI roles in France, Spain, Germany, or remote.</strong>
            </p>

            <p className="about-meta" style={{ marginTop: '1.5rem', fontSize: 'var(--fz-sm)', color: 'var(--slate)' }}>
              <strong style={{ color: 'var(--light-slate)' }}>Languages:</strong> French (C1) · English (C2) · Arabic (native)
            </p>

            <p>
              Here is my stack of technologies I've been working with:
            </p>
          </div>

          {aiEngineeringSkillsList.map((section, sectionIndex) => (
            <div key={sectionIndex} className="skills-section">
              <h3>{section.category}</h3>
              <ul className="skills-list">
                {section.skills.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.jpg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;