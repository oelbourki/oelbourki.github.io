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

  // Skills aligned with About narrative
  const aiEngineeringSkillsList = [
    {
      category: 'Agentic Architectures',
      skills: [
        'LangGraph',
        'CrewAI',
        'AutoGen',
        'RAG (LangChain)',
        'Prompt Engineering',
      ],
    },
    {
      category: 'LLM Optimization & Performance',
      skills: [
        'vLLM',
        'LoRA / QLoRA',
        'Quantization (AWQ, GPTQ)',
        'Triton',
        'CUDA',
        'ONNX Runtime',
      ],
    },
    {
      category: 'AI Infrastructure & MLOps',
      skills: [
        'FastAPI',
        'Docker',
        'Kubernetes',
        'GCP (Vertex AI, Cloud Run)',
        'AWS (SageMaker, EC2)',
        'NVIDIA DeepStream',
        'SLMs on Edge',
        'CI/CD',
        'Prometheus',
        'Grafana',
      ],
    },
    {
      category: 'Data & Vector Systems',
      skills: [
        'Neo4j',
        'Qdrant',
        'ChromaDB',
        'Redis',
        'Vector Embeddings',
        'Similarity Search',
      ],
    },
    {
      category: 'Core Engineering',
      skills: [
        'Python',
        'C/C++',
        'PyTorch',
        'Hugging Face',
        'REST APIs',
        'Microservices',
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
              I am an AI Engineer specialized in building production-grade LLM systems that are scalable, cost-efficient, and business-impactful. I bridge the gap between high-level AI orchestration and low-level system performance, with a focus on latency, reliability, and measurable ROI.
            </p>

            <p>
              My engineering foundation was built at École 42 Paris (Level 21), where I mastered C/C++ and systems architecture, combined with a Master's in AI. This hybrid background allows me to navigate the full AI stack—from designing autonomous multi-agent workflows in Python to optimizing high-performance inference kernels on the metal.
            </p>

            <p>
              <strong>Agentic Architectures:</strong> Expertise in designing complex orchestration using LangGraph, CrewAI, and AutoGen for autonomous, real-world workflows.
            </p>

            <p>
              <strong>LLM Optimization & Performance:</strong> Proven track record in boosting throughput by 3× using vLLM, LoRA, and quantization. I leverage C/C++ and Triton to push the boundaries of model efficiency and custom kernel performance.
            </p>

            <p>
              <strong>AI Infrastructure & MLOps:</strong> Building robust pipelines with FastAPI, Docker, and Kubernetes. Experienced in NVIDIA DeepStream for high-performance video analytics and deploying Small Language Models (SLMs) on edge devices.
            </p>

            <p>
              <strong>Technical Leadership:</strong> As the founder of 1337AI, I have mentored 300+ developers through bootcamps and hackathons, fostering a deep culture of open-source AI innovation.
            </p>

            <p>
              I am particularly interested in high-performance inference, multimodal AI, and building autonomous agents that solve complex business problems at scale. Open to AI/ML Engineering roles in France, Spain, Germany, or Remote.
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