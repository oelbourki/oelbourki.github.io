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

  // Skills grouped by categories
  const aiEngineeringSkillsList = [
    {
      category: "Agentic & Multi‑Agent Systems",
      skills: [
        'LangChain',
        'LlamaIndex',
        'LangGraph',
        'AutoGPT',
        'BabyAGI',
        'AutoGen',
        'CrewAI',
        'Agent Frameworks',
        'Multi‑agent Collaboration',
        'Hierarchical Agents',
        'Distributed AI',
        'Semantic Kernel',
        'Groq',
        'Together AI',
      ]
    },
    {
      category: "Generative AI, LLMs & Prompting",
      skills: [
        'Large Language Models (LLM)',
        'Prompt Engineering',
        'Retrieval‑Augmented Generation (RAG)',
        'Fine‑tuning',
        'OpenAI API & GPT‑4',
        'Anthropic API & Claude',
        'Meta Llama 2/3/4',
        'Gemini',
        'Mistral AI',
        'Hugging Face (Transformers, Datasets)',
        'OpenAI Embeddings',
        'Sentence Transformers',
      ]
    },
    {
      category: "Experimentation, Monitoring & Evaluation",
      skills: [
        'MLflow',
        'Weights & Biases',
        'Neptune.ai',
        'Prometheus & Grafana',
        'Langfuse',
        'TruLens',
        'RAGAS',
        'DeepEval',
        'A/B Testing',
      ]
    },
    {
      category: "Core Languages & Frameworks",
      skills: [
        'Python (Advanced)',
        'C++ (Intermediate)',
        'JavaScript & TypeScript',
        'SQL & NoSQL',
        'TensorFlow & PyTorch (Advanced)',
        'Scikit‑learn',
        'Keras',
        'FastAPI',
        'Django & Flask',
        'Streamlit & Gradio',
        'React & Next.js',
      ]
    },
    {
      category: "Vector Databases & Embeddings Stores",
      skills: [
        'Pinecone',
        'Weaviate',
        'Milvus',
        'Qdrant',
        'FAISS',
        'Chroma',
      ]
    },
    {
      category: "DevOps / MLOps & Infrastructure",
      skills: [
        'AWS SageMaker',
        'GCP Vertex AI & Cloud Run',
        'Azure ML & Azure OpenAI Service',
        'Docker & Kubernetes',
        'Model Deployment & Serving',
        'CI/CD & GitHub Actions',
        'Terraform',
      ]
    },
    {
      category: "Specialty AI Domains",
      skills: [
        'Natural Language Processing (NLP)',
        'Computer Vision',
        'Reinforcement Learning',
        'GANs'
      ]
    }
  ];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              Hello! I'm Otmane, an AI Engineer specializing in Generative AI, LLM Agents, and MLOps. I'm passionate about architecting and deploying scalable AI solutions—from autonomous agents to production-grade inference pipelines.
            </p>

            <p>
              My expertise lies in building intelligent systems that can understand, reason, and generate content across various domains. I've worked on projects ranging from healthcare diagnostic assistants to financial analysis tools, focusing on creating AI solutions that deliver real business value.
            </p>

            <p>
              Currently, I'm focused on developing multi-agent systems with LangGraph and Autogen, implementing advanced RAG architectures, and scaling large language model fine-tuning with DeepSpeed and quantization techniques. I'm particularly interested in the intersection of AI agents, knowledge retrieval, and human-AI collaboration.
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