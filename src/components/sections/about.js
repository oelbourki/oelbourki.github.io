import React, { useState } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';

const StyledAboutSection = styled.section`
  max-width: 900px;
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

const TabList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`;

const TabButton = styled.button`
  font-family: var(--font-mono);
  font-size: 11px;
  padding: 8px 12px;
  border-radius: 6px;
  border: 0.5px solid ${({ $active }) => ($active ? 'var(--accent-border)' : 'var(--bg-border)')};
  background: ${({ $active }) => ($active ? 'var(--accent-subtle)' : 'var(--bg-elevated)')};
  color: ${({ $active }) => ($active ? 'var(--accent)' : 'var(--text-secondary)')};
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s, color 0.2s;

  &:hover {
    border-color: var(--accent-border);
    color: ${({ $active }) => ($active ? 'var(--accent)' : 'var(--text-primary)')};
  }

  &:focus-visible {
    outline: 2px dashed var(--accent);
    outline-offset: 2px;
  }
`;

const TabPanel = styled.div`
  background: transparent;
  border: none;
  border-radius: 0;
  padding: 0;
  min-height: 120px;
`;

const SkillUl = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px 20px;

  @media (max-width: 700px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }

  li {
    position: relative;
    padding-left: 18px;
    font-size: 13px;
    color: var(--text-secondary);
    line-height: 1.45;

    &::before {
      content: '▹';
      position: absolute;
      left: 0;
      color: var(--accent);
      font-size: 12px;
    }
  }
`;

const AllGroups = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px 16px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const SkillGroup = styled.div`
  border: 0.5px solid var(--bg-border);
  border-radius: var(--border-radius);
  padding: 14px 16px;
  background: var(--bg-elevated);
  min-width: 0;
  transition: border-color 0.2s;

  &:hover {
    border-color: var(--accent-border);
  }
`;

const GroupTitle = styled.h4`
  margin: 0 0 10px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-tertiary);
  font-family: var(--font-mono);
`;

const ExpertiseBlock = styled.div`
  margin-top: 2.5rem;
  width: 100%;

  .expertise-heading {
    margin: 0 0 0.75rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  .chip-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .chip {
    font-size: 12px;
    padding: 6px 14px;
    border-radius: 6px;
    background: var(--bg-elevated);
    border: 0.5px solid var(--bg-border);
    color: var(--text-secondary);
    display: inline-block;
    font-family: var(--font-sans);
  }

  .chip.active {
    color: var(--accent);
    border-color: var(--accent-border);
    background: var(--accent-subtle);
  }
`;

const SkillsBlock = styled.div`
  margin-top: 1.75rem;
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

const chips = [
  { label: 'Multi-agent systems', active: true },
  { label: 'GraphRAG', active: true },
  { label: 'Inference optimization', active: true },
  { label: 'Fine-tuning (LoRA/QLoRA)', active: false },
  { label: 'Evaluation & observability', active: false },
  { label: 'Production deployment', active: false },
];

const skillCategories = [
  {
    id: 'orchestration',
    label: 'LLM Orchestration & Agentic Systems',
    skills: [
      'LangGraph',
      'LangChain',
      'CrewAI',
      'Multi-Agent Systems',
      'ReAct / Plan-Execute',
      'Tool Calling',
      'MCP',
      'Structured Outputs',
    ],
  },
  {
    id: 'retrieval',
    label: 'Retrieval & Knowledge Systems',
    skills: [
      'RAG',
      'GraphRAG',
      'Hybrid Search',
      'Reranking',
      'Semantic Chunking',
      'Qdrant',
      'Neo4j',
      'OCR',
      'Multimodal Document Understanding',
    ],
  },
  {
    id: 'providers',
    label: 'LLM Providers & Model Integration',
    skills: [
      'OpenAI',
      'Anthropic',
      'Gemini',
      'Mistral',
      'Hugging Face',
      'Multi-LLM Routing',
    ],
  },
  {
    id: 'evaluation',
    label: 'Evaluation, Observability & Responsible AI',
    skills: [
      'RAGAS',
      'LangSmith',
      'LLM-as-Judge',
      'Hallucination Detection',
      'EU AI Act & Risk Assessment',
      'Bias & Safety Evaluation',
    ],
  },
  {
    id: 'inference',
    label: 'Inference & Production Engineering',
    skills: [
      'vLLM',
      'Quantization (AWQ/GPTQ)',
      'Fine-Tuning (LoRA/QLoRA)',
      'Rate Limiting & Fallback',
      'Cost & Latency Optimization',
    ],
  },
  {
    id: 'architecture',
    label: 'AI Architecture & Deployment',
    skills: [
      'End-to-End AI System Design',
      'Vertex AI',
      'Amazon Bedrock',
      'Azure AI',
      'Docker',
      'Kubernetes',
      'Terraform',
      'CI/CD',
      'MLflow',
      'AWS',
      'GCP',
      'Azure',
    ],
  },
  {
    id: 'programming',
    label: 'Programming & APIs',
    skills: ['Python', 'FastAPI', 'Pydantic', 'SQL'],
  },
];

const About = () => {
  const [activeSkillTab, setActiveSkillTab] = useState('all');

  const tabs = [{ id: 'all', label: 'All' }, ...skillCategories.map(c => ({ id: c.id, label: c.label }))];

  return (
    <StyledAboutSection id="about">
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              AI Engineer with ~5 years of experience in AI — including ~3 years of professional experience —
              from GPU inference optimisation (3× throughput, 47% cost reduction) to multi-agent orchestration platforms
              serving real financial clients. Specialized at the intersection of vLLM serving stacks, LangGraph pipelines,
              and GraphRAG on GCP and AWS. Founder of a 300-member ML engineering community.
            </p>

            <p>
              <strong>Education:</strong> École 42 Paris — IT Architecture Expert (Data Architecture), RNCP 7, Level 21; ranked 3rd
              globally in pedagogical innovation (WURI 2025). Ibn Tofaïl University — Specialized Master&apos;s in AI. Mohammed VI
              Polytechnic University (1337) — Digital Technology Architect.
            </p>

            <p>
              Open to hybrid or remote roles, with national and international mobility.{' '}
              <strong>Open to AI/ML Engineering, MLOps, or Cloud AI roles in France, Spain, Germany, or remote.</strong>
            </p>

            <p className="about-meta" style={{ marginTop: '1.5rem', fontSize: 'var(--fz-sm)', color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--text-primary)' }}>Languages:</strong> French (B2) · English (C2) · Arabic (native)
            </p>
          </div>
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

      <ExpertiseBlock>
        <p className="expertise-heading">Core expertise</p>
        <div className="chip-row">
          {chips.map(({ label, active }) => (
            <span key={label} className={`chip${active ? ' active' : ''}`}>
              {label}
            </span>
          ))}
        </div>
      </ExpertiseBlock>

      <SkillsBlock>
        <SkillsHeading id="skills-tabs-heading">All skills</SkillsHeading>
        <TabList role="tablist" aria-labelledby="skills-tabs-heading">
          {tabs.map(tab => (
            <TabButton
              key={tab.id}
              type="button"
              role="tab"
              id={`skill-tab-${tab.id}`}
              aria-selected={activeSkillTab === tab.id}
              aria-controls="skill-panel-main"
              $active={activeSkillTab === tab.id}
              onClick={() => setActiveSkillTab(tab.id)}>
              {tab.label}
            </TabButton>
          ))}
        </TabList>

        <TabPanel
          role="tabpanel"
          id="skill-panel-main"
          aria-labelledby={`skill-tab-${activeSkillTab}`}>
          {activeSkillTab === 'all' ? (
            <AllGroups>
              {skillCategories.map(cat => (
                <SkillGroup key={cat.id}>
                  <GroupTitle>{cat.label}</GroupTitle>
                  <SkillUl>
                    {cat.skills.map(s => (
                      <li key={s}>{s}</li>
                    ))}
                  </SkillUl>
                </SkillGroup>
              ))}
            </AllGroups>
          ) : (
            <SkillGroup>
              <GroupTitle>
                {skillCategories.find(c => c.id === activeSkillTab)?.label}
              </GroupTitle>
              <SkillUl>
                {skillCategories
                  .find(c => c.id === activeSkillTab)
                  ?.skills.map(s => (
                    <li key={s}>{s}</li>
                  ))}
              </SkillUl>
            </SkillGroup>
          )}
        </TabPanel>
      </SkillsBlock>
    </StyledAboutSection>
  );
};

export default About;
