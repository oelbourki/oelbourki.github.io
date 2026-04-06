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

const StyledText = styled.div`
  .chip-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 1.25rem;
  }

  .chip {
    font-size: 12px;
    padding: 6px 14px;
    border-radius: 6px;
    background: var(--bg-elevated);
    border: 0.5px solid var(--bg-border);
    color: var(--text-tertiary);
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
  margin-top: 2rem;
`;

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
  background: var(--bg-elevated);
  border: 0.5px solid var(--bg-border);
  border-radius: 10px;
  padding: 16px 18px;
  min-height: 120px;
`;

const SkillUl = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px 16px;

  @media (max-width: 520px) {
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
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const GroupTitle = styled.h4`
  margin: 0 0 8px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-tertiary);
  font-family: var(--font-mono);
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
  { label: 'LLM inference optimization', active: true },
  { label: 'MLOps', active: false },
  { label: 'Fine-tuning', active: false },
  { label: 'Quantization', active: false },
  { label: 'Production deployment', active: false },
];

const skillCategories = [
  {
    id: 'programming',
    label: 'Programming',
    skills: ['Python', 'C/C++', 'FastAPI', 'REST APIs', 'Microservices', 'Linux/Shell'],
  },
  {
    id: 'deep-learning',
    label: 'Deep Learning & LLMs',
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
    id: 'orchestration',
    label: 'LLM & retrieval',
    skills: [
      'LangChain',
      'LangGraph',
      'Multi-Agent Systems',
      'RAG / GraphRAG / Hybrid Search',
      'Vector DBs (Qdrant, ChromaDB)',
      'Reranking',
      'Prompt Engineering',
      'Pydantic',
    ],
  },
  {
    id: 'mlops',
    label: 'MLOps',
    skills: [
      'Docker',
      'Kubernetes (K3s)',
      'Ray Serve',
      'MLflow',
      'CI/CD (GitHub Actions, GitOps)',
      'GPU Inference Optimization',
      'Cloud (AWS, GCP)',
    ],
  },
  {
    id: 'evaluation',
    label: 'Evaluation',
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
    id: 'data',
    label: 'Data systems',
    skills: [
      'SQL',
      'Redis',
      'Neo4j',
      'Vector Similarity Search',
      'Pandas',
      'Structured Extraction (Docling, PDF/OCR)',
    ],
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

            <p className="about-meta" style={{ marginTop: '1.5rem', fontSize: 'var(--fz-sm)', color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--text-primary)' }}>Languages:</strong> French (C1) · English (C2) · Arabic (native)
            </p>

            <p style={{ marginTop: '1.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>Core expertise</p>
            <div className="chip-row">
              {chips.map(({ label, active }) => (
                <span key={label} className={`chip${active ? ' active' : ''}`}>
                  {label}
                </span>
              ))}
            </div>

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
                      <div key={cat.id}>
                        <GroupTitle>{cat.label}</GroupTitle>
                        <SkillUl>
                          {cat.skills.map(s => (
                            <li key={s}>{s}</li>
                          ))}
                        </SkillUl>
                      </div>
                    ))}
                  </AllGroups>
                ) : (
                  <SkillUl>
                    {skillCategories
                      .find(c => c.id === activeSkillTab)
                      ?.skills.map(s => (
                        <li key={s}>{s}</li>
                      ))}
                  </SkillUl>
                )}
              </TabPanel>
            </SkillsBlock>
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
    </StyledAboutSection>
  );
};

export default About;
