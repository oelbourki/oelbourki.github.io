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

  // Streamlined skills list with redundancies removed
  const skills = [
    // GenAI, LLMs & Agents
    'Large Language Models (LLM)',
    'Prompt Engineering',
    'RAG',
    'Fine-tuning',
    'LangChain',
    'LlamaIndex',
    'Hugging Face (Transformers, Datasets)',
    'OpenAI API & GPT-4',
    'Anthropic API & Claude',
    'Mistral AI',
    'Llama 2/3/4',
    'Gemini',
    
    // Multiagent Systems
    'LangGraph',
    'AutoGen',
    'CrewAI',
    'Agent frameworks',
    'Multi-agent collaboration',
    'Hierarchical agents',
    'Distributed AI',
    'Semantic Kernel',
    'Groq',
    'Together AI',
    
    // AI & Machine Learning
    'TensorFlow & PyTorch (Advanced)',
    'Scikit-learn',
    'Keras',
    'MLflow',
    'Machine Learning & Deep Learning',
    'Natural Language Processing (NLP)',
    'Computer Vision',
    'Reinforcement Learning',
    'GANs',
    
    // Vector Databases & Embeddings
    'Pinecone',
    'Weaviate',
    'Milvus',
    'Qdrant',
    'FAISS',
    'Chroma',
    'OpenAI Embeddings',
    'Sentence Transformers',
    
    // Infrastructure & DevOps/MLOps
    'AWS (SageMaker)',
    'GCP (Vertex AI, Cloud Run)',
    'Azure ML',
    'Docker & Kubernetes',
    'Model Deployment & Serving',
    'CI/CD & Git',
    'GitHub Actions',
    'Terraform',
    
    // Evaluation & Monitoring
    'langfuse',
    'Weights & Biases',
    'Prometheus & Grafana',
    'TruLens',
    'RAGAS',
    'DeepEval',
    'A/B Testing',
    
    // Development
    'Python (Advanced)',
    'C++ (Intermediate) & C',
    'SQL & NoSQL',
    'MongoDB',
    'PostgreSQL',
    'Redis',
    'FastAPI',
    'Django & Flask',
    'Streamlit & Gradio',
    'JavaScript & TypeScript',
    'React & Next.js',
    
    // Languages
    'French (Fluent)',
    'English (Bilingual)',
    'Arabic (Native)',
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
              Here are some technologies I've been working with recently:
            </p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
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