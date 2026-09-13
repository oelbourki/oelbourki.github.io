import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

const StyledProjectsGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};

  a {
    position: relative;
    z-index: 1;
  }
`;

const StyledProject = styled.li`
  position: relative;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;
  transition: transform 0.2s;

  @media (prefers-reduced-motion: no-preference) {
    &:hover {
      transform: translateY(-2px);
    }
  }

  @media (max-width: 768px) {
    ${({ theme }) => theme.mixins.boxShadow};
  }

  &:not(:last-of-type) {
    margin-bottom: 100px;

    @media (max-width: 1080px) {
      margin-bottom: 80px;
    }

    @media (max-width: 768px) {
      margin-bottom: 70px;
    }

    @media (max-width: 480px) {
      margin-bottom: 40px;
    }
  }

  &:nth-of-type(odd) {
    .project-content {
      grid-column: 7 / -1;
      text-align: right;

      @media (max-width: 1080px) {
        grid-column: 5 / -1;
      }
      @media (max-width: 768px) {
        grid-column: 1 / -1;
        padding: 40px 40px 30px;
        text-align: left;
      }
      @media (max-width: 480px) {
        padding: 25px 25px 20px;
      }
    }
    .project-tech-list {
      justify-content: flex-end;

      @media (max-width: 768px) {
        justify-content: flex-start;
      }

      li {
        margin: 0 0 5px 20px;

        @media (max-width: 768px) {
          margin: 0 10px 5px 0;
        }
      }
    }
    .project-links {
      justify-content: flex-end;
      margin-left: 0;
      margin-right: -10px;

      @media (max-width: 768px) {
        justify-content: flex-start;
        margin-left: -10px;
        margin-right: 0;
      }
    }
    .project-image {
      grid-column: 1 / 8;

      @media (max-width: 768px) {
        grid-column: 1 / -1;
      }
    }
  }

  .project-content {
    position: relative;
    grid-column: 1 / 7;
    grid-row: 1 / -1;

    @media (max-width: 1080px) {
      grid-column: 1 / 9;
    }

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      grid-column: 1 / -1;
      padding: 40px 40px 30px;
      z-index: 5;
    }

    @media (max-width: 480px) {
      padding: 30px 25px 20px;
    }
  }

  .project-overline {
    display: inline-block;
    margin: 10px 0;
    color: var(--accent-secondary);
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 400;
    background: var(--accent-secondary-subtle);
    border: 0.5px solid rgba(232, 165, 75, 0.35);
    padding: 3px 9px;
    border-radius: 20px;
  }

  .project-title {
    color: var(--lightest-slate);
    font-size: clamp(24px, 5vw, 28px);

    a {
      transition: color 0.2s;

      &:hover,
      &:focus {
        color: var(--accent-secondary);
      }
    }

    @media (min-width: 768px) {
      margin: 0 0 20px;
    }

    @media (max-width: 768px) {
      color: var(--white);

      a {
        position: static;

        &:before {
          content: '';
          display: block;
          position: absolute;
          z-index: 0;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }

        &:hover,
        &:focus {
          color: var(--accent-secondary);
        }
      }
    }
  }

  .project-description {
    ${({ theme }) => theme.mixins.boxShadow};
    position: relative;
    z-index: 2;
    padding: 25px;
    border-radius: 10px;
    background-color: var(--bg-elevated);
    border: 0.5px solid var(--bg-border);
    color: var(--light-slate);
    font-size: var(--fz-lg);
    transition: border-color 0.2s, transform 0.2s;

    &:hover {
      border-color: var(--accent-border);
    }

    @media (max-width: 768px) {
      padding: 20px 0;
      background-color: transparent;
      box-shadow: none;
      border: none;

      &:hover {
        box-shadow: none;
      }
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }

    strong {
      color: var(--white);
      font-weight: normal;
    }
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
    margin: 25px 0 10px;
    padding: 0;
    list-style: none;

    li {
      margin: 0 8px 8px 0;
      color: var(--accent);
      font-family: var(--font-mono);
      font-size: 11px;
      white-space: nowrap;
      background: var(--accent-subtle);
      border: 0.5px solid var(--accent-border);
      padding: 3px 9px;
      border-radius: 20px;
    }

    @media (max-width: 768px) {
      margin: 10px 0;

      li {
        margin: 0 10px 5px 0;
        color: var(--lightest-slate);
      }
    }
  }

  .project-links {
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 10px;
    margin-left: -10px;
    color: var(--lightest-slate);

    a {
      ${({ theme }) => theme.mixins.flexCenter};
      padding: 10px;

      &.external {
        svg {
          width: 22px;
          height: 22px;
          margin-top: -4px;
        }
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }

    .cta {
      ${({ theme }) => theme.mixins.smallButton};
      margin: 10px;
    }
  }

  .project-image {
    ${({ theme }) => theme.mixins.boxShadow};
    grid-column: 6 / -1;
    grid-row: 1 / -1;
    position: relative;
    z-index: 1;
    border-radius: var(--border-radius);
    overflow: hidden;
    border: 1px solid var(--bg-border);
    transition: border-color 0.25s;
    min-height: 280px;

    &:hover {
      border-color: rgba(232, 165, 75, 0.45);
    }

    @media (max-width: 1080px) {
      min-height: 240px;
    }

    @media (max-width: 768px) {
      grid-column: 1 / -1;
      height: 100%;
      min-height: 200px;
      opacity: 0.35;
    }

    @media (max-width: 480px) {
      min-height: 180px;
    }

    a {
      width: 100%;
      height: 100%;
      min-height: inherit;
      border-radius: var(--border-radius);
      vertical-align: middle;
      display: block;
      background-color: var(--bg-elevated);

      &:hover,
      &:focus {
        outline: 0;
      }
    }

    .img {
      border-radius: var(--border-radius);
      object-fit: cover;
      width: 100%;
      height: 100%;
      min-height: inherit;

      @media (max-width: 768px) {
        object-fit: cover;
        width: 100%;
        height: 100%;
        filter: brightness(40%);
      }
    }
  }
`;

const Featured = () => {
  const data = useStaticQuery(graphql`
    {
      featured: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/featured/" } }
        sort: { fields: [frontmatter___date], order: ASC }
      ) {
        edges {
          node {
            frontmatter {
              order
              title
              cover {
                publicURL
                childImageSharp {
                  gatsbyImageData(width: 700, placeholder: BLURRED, formats: [AUTO, WEBP])
                }
              }
              tech
              github
              external
              cta
            }
            html
          }
        }
      }
    }
  `);

  const featuredProjects = data.featured.edges
    .filter(({ node }) => node)
    .sort((a, b) => {
      const orderA = a.node.frontmatter.order ?? 999;
      const orderB = b.node.frontmatter.order ?? 999;
      if (orderA !== orderB) return orderA - orderB;
      const dateA = new Date(a.node.frontmatter.date || 0).getTime();
      const dateB = new Date(b.node.frontmatter.date || 0).getTime();
      return dateA - dateB;
    });
  const revealTitle = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  return (
    <section id="projects">
      <h2 className="numbered-heading" ref={revealTitle}>
        Some Things I’ve Built
      </h2>

      <StyledProjectsGrid>
        {featuredProjects &&
          featuredProjects.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { external, title, tech, github, cover, cta } = frontmatter;
            const image = cover ? getImage(cover) : null;
            const coverUrl = cover?.publicURL;
            const hasCover = Boolean(image || coverUrl);

            return (
              <StyledProject key={i} ref={el => (revealProjects.current[i] = el)}>
                <div className="project-content">
                  <div>
                    <p className="project-overline">Featured Project</p>

                    <h3 className="project-title">
                      <a href={external || github || '#'}>{title}</a>
                    </h3>

                    <div
                      className="project-description"
                      dangerouslySetInnerHTML={{ __html: html }}
                    />

                    {tech && tech.length > 0 && (
                      <ul className="project-tech-list">
                        {tech.map((tech, i) => (
                          <li key={i}>{tech}</li>
                        ))}
                      </ul>
                    )}

                    <div className="project-links">
                      {cta && (
                        <a href={cta} aria-label="Learn more" className="cta">
                          Learn More
                        </a>
                      )}
                      {github && (
                        <a href={github} aria-label="GitHub Link">
                          <Icon name="GitHub" />
                        </a>
                      )}
                      {external && !cta && (
                        <a href={external} aria-label="External Link" className="external">
                          <Icon name="External" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {hasCover && (
                  <div className="project-image">
                    <a href={external || github || coverUrl || '#'}>
                      {image ? (
                        <GatsbyImage image={image} alt={title} className="img" />
                      ) : (
                        <img src={coverUrl} alt={title} className="img" />
                      )}
                    </a>
                  </div>
                )}
              </StyledProject>
            );
          })}
      </StyledProjectsGrid>
    </section>
  );
};

export default Featured;
