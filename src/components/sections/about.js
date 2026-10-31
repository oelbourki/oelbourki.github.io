import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';

const StyledAboutSection = styled.section`
  max-width: 1100px;
  opacity: 1;
  visibility: visible;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;

const StyledText = styled.div``;

const SkillsHeading = styled.h3`
  margin: 0 0 14px;
  font-size: var(--fz-md);
  font-weight: 600;
  color: var(--text-primary);
`;

const AllGroups = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px 32px;
  border-top: 0.5px solid var(--bg-border);
  padding-top: 18px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const SkillGroup = styled.div`
  min-width: 0;
`;

const GroupTitle = styled.h4`
  margin: 0 0 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-tertiary);
  font-family: var(--font-mono);
`;

const SkillsFocus = styled.p`
  margin: 0 0 14px;
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-secondary);

  strong {
    color: var(--text-primary);
    font-weight: 600;
  }
`;

const SkillLine = styled.p`
  margin: 0;
  font-size: 13px;
  line-height: 1.55;
  color: var(--text-secondary);

  strong {
    color: var(--accent-bright);
    font-weight: 600;
  }
`;

const SkillsBlock = styled.div`
  margin-top: 2rem;
  width: 100%;
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
    background-color: var(--accent);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: normal;
      filter: grayscale(100%) contrast(1.05);
      transition: var(--transition);
    }

    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      border: 2px solid var(--accent);
      top: 14px;
      left: 14px;
      z-index: -1;
      pointer-events: none;
      transition: var(--transition);
    }
  }
`;

const skillCategories = [
  {
    id: 'agentic',
    label: 'Agentic AI',
    skills: [
      { name: 'LangGraph', highlight: true },
      { name: 'LangChain', highlight: true },
      { name: 'CrewAI' },
      { name: 'Google ADK' },
      { name: 'DSPy' },
      { name: 'MCP' },
      { name: 'Agentic RAG' },
    ],
  },
  {
    id: 'rag',
    label: 'RAG & Document Intelligence',
    skills: [
      { name: 'GraphRAG', highlight: true },
      { name: 'Neo4j', highlight: true },
      { name: 'Hybrid Search' },
      { name: 'Reranking' },
      { name: 'Qdrant' },
      { name: 'pgvector' },
      { name: 'Document AI / OCR' },
      { name: 'VLMs' },
      { name: 'Multimodal Retrieval' },
    ],
  },
  {
    id: 'llm-eng',
    label: 'LLM Engineering',
    skills: [
      { name: 'vLLM', highlight: true },
      { name: 'Inference Optimization', highlight: true },
      { name: 'AWQ/GPTQ' },
      { name: 'LoRA/QLoRA' },
      { name: 'Multi-LLM Routing' },
      { name: 'Structured Generation' },
      { name: 'Fine-Tuning' },
    ],
  },
  {
    id: 'evaluation',
    label: 'Evaluation & Observability',
    skills: [
      { name: 'RAGAS', highlight: true },
      { name: 'LangSmith', highlight: true },
      { name: 'Arize Phoenix' },
      { name: 'LLM-as-Judge' },
      { name: 'Agent Evaluation' },
      { name: 'OpenTelemetry' },
      { name: 'Prometheus' },
      { name: 'Grafana' },
    ],
  },
  {
    id: 'mlops',
    label: 'AI Systems, Cloud & MLOps',
    skills: [
      { name: 'Azure', highlight: true },
      { name: 'GCP' },
      { name: 'AWS' },
      { name: 'Docker' },
      { name: 'Kubernetes' },
      { name: 'Terraform' },
      { name: 'CI/CD' },
      { name: 'Azure DevOps' },
      { name: 'MLflow' },
      { name: 'GitOps' },
    ],
  },
  {
    id: 'programming',
    label: 'Programming',
    skills: [
      { name: 'Python', highlight: true },
      { name: 'FastAPI', highlight: true },
      { name: 'Pydantic' },
      { name: 'SQL' },
      { name: 'PyTorch' },
      { name: 'C++' },
      { name: 'CUDA' },
    ],
  },
  {
    id: 'security',
    label: 'Security & Governance',
    skills: [
      { name: 'LLM Red-Teaming', highlight: true },
      { name: 'Guardrails', highlight: true },
      { name: 'Prompt-Injection Defense' },
    ],
  },
];

const SkillTokens = ({ skills }) => (
  <>
    {skills.map((s, i) => (
      <React.Fragment key={s.name}>
        {i > 0 && ' · '}
        {s.highlight ? <strong>{s.name}</strong> : s.name}
      </React.Fragment>
    ))}
  </>
);

const About = () => (
    <StyledAboutSection id="about">
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              Experienced AI Engineer with <strong>3 years</strong> of professional/independent
              experience and <strong>4.5+ years</strong> in AI/ML including research — production
              systems across retrieval, serving, orchestration, and evaluation. Built multi-agent
              systems for finance; currently shipping AI accelerators in ALTEN&apos;s A3. Founder of
              a <strong>300-member</strong> AI engineering community.
            </p>

            <p>
              <strong>Education:</strong> École 42 Paris (RNCP 7, IT Architecture Expert — Data
              Architecture) · Master&apos;s in AI, Ibn Tofaïl · BSc Computer Science, Ibn Tofaïl ·
              École 1337 (UM6P) · Baccalauréat Mathématiques Sciences A.
            </p>

            <p className="about-meta" style={{ marginTop: '1.25rem', fontSize: 'var(--fz-sm)', color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--text-primary)' }}>Open to</strong> hybrid / remote
              AI/ML, MLOps, or Cloud AI roles in France
            </p>

            <p className="about-meta" style={{ marginTop: '0.65rem', fontSize: 'var(--fz-sm)', color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--text-primary)' }}>Availability:</strong> Based in Rabat
              · available to start in France · ~1 month notice (1 week if needed)
            </p>

            <p className="about-meta" style={{ marginTop: '0.65rem', fontSize: 'var(--fz-sm)', color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--text-primary)' }}>Languages:</strong> Arabic (native) ·
              English (full professional) · French (professional working)
            </p>
          </div>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me-headshot.jpg"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP']}
              alt="Professional headshot of Otmane El Bourki, AI Engineer"
            />
          </div>
        </StyledPic>
      </div>

      <SkillsBlock>
        <SkillsHeading>Skills</SkillsHeading>
        <SkillsFocus>
          <strong>Focus:</strong> Agentic AI · RAG / GraphRAG · Inference optimization
        </SkillsFocus>
        <AllGroups>
          {skillCategories.map(cat => (
            <SkillGroup key={cat.id}>
              <GroupTitle>{cat.label}</GroupTitle>
              <SkillLine>
                <SkillTokens skills={cat.skills} />
              </SkillLine>
            </SkillGroup>
          ))}
        </AllGroups>
      </SkillsBlock>
    </StyledAboutSection>
);

export default About;
