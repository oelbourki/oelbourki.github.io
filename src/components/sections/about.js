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
//               Fast-forward to today, and I’ve had the privilege of working at{' '}
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

//             <p>Here are a few technologies I’ve been working with recently:</p>
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
  const prefersReducedMotion = usePrefersReducedMotion(); // Assuming you have a custom hook for prefersReducedMotion

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, [prefersReducedMotion]);

  // const skills = [
  //   'Python',
  //   'TensorFlow',
  //   'PyTorch',
  //   'Scikit-learn',
  //   'NLTK',
  //   'spaCy',
  //   'Django',
  //   'Flask',
  //   'FastAPI',
  //   'OpenCV',
  //   'Git',
  //   'Docker',
  //   'Kubernetes',
  //   'AWS',
  //   'GCP',
  //   'SQL',
  //   'PostgreSQL',
  //   'PySpark',
  //   'MLflow',
  //   'Hugging Face',
  //   'Langchain',
  //   'BentoML',
  // ];
  const skills = [
    // AI & Machine Learning
    'Python (Advanced)',                // Primary language for AI development
    'C++ (Intermediate)',               // Important for performance-critical applications
    'TensorFlow (Advanced)',           // Popular deep learning framework
    'PyTorch (Advanced)',              // Popular deep learning framework
    'Scikit-learn',                    // Essential for machine learning algorithms
    'Keras',                           // High-level neural networks API
    'Hugging Face (Transformers, Datasets)', // Leading platform for NLP models
    'LangChain',                       // Tool for building LLM applications
    'LlamaIndex',                      // Framework for connecting LLMs with data sources
    'MLflow',                          // MLOps tool for managing machine learning workflows
    'Qdrant',                          // Vector database for high-dimensional search
    'FAISS',                           // Library for efficient similarity search
    'Chroma',                          // Vector database for embeddings
    'RAG',                             // Retrieval-Augmented Generation for LLM applications
    // 'Meditron 7B LLM',                 // Pretrained LLM used in projects
    'OpenAI API',                      // API for large-scale AI models
    'Prompt Engineering',              // Crucial skill for optimizing LLM performance
    'Fine-tuning',                     // Fine-tuning pre-trained models for specific tasks
    'Embeddings',                      // Techniques for representing data in vector spaces
    'Text-to-X Models',                // Models that generate text, images, etc.
    'Machine Learning',                // Broad skill encompassing model building and data analysis
    'Deep Learning',                   // Specialized in deep learning techniques
    'Natural Language Processing (NLP)', // Critical for working with text-based data
    'Computer Vision',                 // Core for image and video-related AI tasks
    'Reinforcement Learning',          // Important for autonomous decision-making systems
    'Large Language Models (LLM)',     // Essential for modern NLP applications
    'Autogen'                          // Automation in LLM workflows

    // Infrastructure & DevOps
    'AWS (SageMaker)',                 // Cloud platform for AI/ML model deployment
    'GCP (Vertex AI, Cloud Run)',      // Google Cloud tools for AI/ML
    'Docker',                          // Containerization for deployment and scalability
    'Kubernetes',                      // Orchestration for scalable AI systems
    'Model Deployment (ONNX Runtime)', // Deploying models in an efficient format
    'Model Monitoring (Weights & Biases, MLflow)', // Tools for monitoring model performance
    'Model Serving (BentoML, TorchServe)', // Tools for serving AI models in production
    'A/B Testing',                     // Crucial for model evaluation and optimization
];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              Hello! My name is Otmane and I'm passionate about crafting scalable AI solutions across diverse domains. My journey in AI started during my studies, where I explored various technologies and frameworks to enhance my skills.
            </p>

            <p>
              Fast-forward to today, I've had the privilege of working on projects ranging from healthcare chatbots to AI-driven marketing solutions. My focus is on leveraging cutting-edge technologies to drive innovation and create impactful solutions.
            </p>

            <p>
              Here are a few technologies I've been working with recently:
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
              src="../../images/me.jpg" // Replace with your image path
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