import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const links = [
  { label: 'Club', href: 'https://1337ai.hackai.ma/' },
  { label: 'Org', href: 'https://www.linkedin.com/company/1337ai/' },
  { label: 'ThinkAI', href: 'https://thinkai.ma/' },
  { label: 'HackAI', href: 'https://hackai.ma/' },
  {
    label: 'Press ’24',
    href: 'https://fr.le360.ma/economie/ben-guerir-lancement-de-la-2eme-edition-du-think-ia-maroc-le-premier-hackathon-de-son-genre-dans-le_U74KY3Q2NVFHLEEZTWG26PPYFA/',
  },
  {
    label: 'Coverage ’25',
    href: 'https://old.ueuromed.org/actualites/activites-des-etudiants/hackai-morocco-luemf-sur-le-podium',
  },
  {
    label: 'Recap ’25',
    href: 'https://www.linkedin.com/posts/1337ai_hackai-hackai2025-1337ai-activity-7341466522025955329-Z2cn',
  },
  { label: 'Repos ’23', href: 'https://github.com/Math-Maroc/ThinkAI' },
  { label: 'Repos ’24', href: 'https://github.com/Math-Maroc/ThinkAI2024' },
  {
    label: 'Repos ’25',
    href: 'https://github.com/1337-Artificial-Intelligence/hackai-2025',
  },
];

const videos = [
  {
    href: 'https://www.youtube.com/watch?v=HOC9x9SLyYA',
    thumb: 'https://i.ytimg.com/vi/HOC9x9SLyYA/hqdefault.jpg',
    label: 'ThinkAI 2023 recap',
    sub: 'YouTube · event film',
  },
  {
    href: 'https://www.youtube.com/watch?v=tsvqEP3mr0U',
    thumb: 'https://i.ytimg.com/vi/tsvqEP3mr0U/hqdefault.jpg',
    label: 'ThinkAI hackathon coverage',
    sub: 'YouTube · Math & Maroc',
  },
  {
    href: 'https://www.youtube.com/watch?v=hf7Uil542BQ',
    thumb: 'https://i.ytimg.com/vi/hf7Uil542BQ/hqdefault.jpg',
    label: 'ThinkAI 2024 · 2nd edition',
    sub: 'YouTube · Math & Maroc',
  },
];

const featured = {
  src: '/community/me.webp',
  alt: 'Otmane El Bourki at ThinkAI 2023',
  caption: 'ThinkAI 2023',
  position: 'center 18%',
};

const moments = [
  {
    src: '/community/1337ai-booth-2022.jpg',
    alt: 'Otmane El Bourki at the 1337 AI booth, UM6P, February 2022',
    caption: 'Feb 2022 · 1337 AI booth',
    position: 'center 12%',
  },
  {
    src: '/community/ml-lecture-2022.jpg',
    alt: 'Otmane El Bourki presenting Intro to Machine Learning at 1337 in 2022',
    caption: '2022 · Intro to ML lecture',
    position: 'center 40%',
  },
  {
    src: '/community/me.webp',
    alt: 'Otmane El Bourki as ThinkAI 2023 mentor',
    caption: 'ThinkAI 2023 · Mentor',
    position: 'center 18%',
  },
  {
    src: '/community/thinkai-2024-mentor.jpg',
    alt: 'Otmane El Bourki as ThinkAI 2024 mentor with mentor badge',
    caption: 'ThinkAI 2024 · Mentor',
    position: 'center 12%',
  },
  {
    src: '/community/hackai-2025-mentor-backdrop.jpg',
    alt: 'Otmane El Bourki as HackAI 2025 mentor in front of the event backdrop',
    caption: 'HackAI 2025 · Mentor',
    position: 'center 20%',
  },
  {
    src: '/community/hackai-2025-mentor-lab.jpg',
    alt: 'Otmane El Bourki wearing a HackAI mentor badge in the 1337 lab',
    caption: 'HackAI 2025 · mentor badge',
    position: 'center 15%',
  },
];

const artifacts = [
  {
    src: '/community/thinkai-2023-badge.jpg',
    alt: 'ThinkAI 2023 mentor badge and lanyard, UM6P Benguerir, 5–7 May 2023',
    caption: 'ThinkAI 2023 · badge',
    position: 'center 45%',
  },
  {
    src: '/community/hackai-2025-mentors-grid.jpg',
    alt: 'HackAI mentors roster featuring Otmane El Bourki alongside Hugging Face and 1337 peers',
    caption: 'HackAI 2025 · mentors',
    position: 'center center',
  },
  {
    src: '/community/hackai-2025-rollup.jpg',
    alt: 'HackAI outdoor rollup banner at UM6P Benguerir',
    caption: 'HackAI 2025 · campus',
    position: 'center 30%',
  },
  {
    src: '/community/hackai-2025-mentor-badge-closeup.jpg',
    alt: 'HackAI 2025 mentor badge and 1337 lanyard',
    caption: 'HackAI 2025 · badge',
    position: 'center 40%',
  },
];

const gallery = [
  featured,
  ...moments.filter(photo => photo.src !== featured.src),
  ...artifacts,
];

const StyledCommunitySection = styled.section`
  max-width: 1100px;

  .intro {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(200px, 280px);
    gap: clamp(28px, 4vw, 48px);
    align-items: start;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .copy {
    min-width: 0;
    max-width: 40em;
  }

  .lead {
    margin: 0 0 20px;
    color: var(--text-secondary);
    font-size: var(--fz-lg);
    line-height: 1.6;

    strong {
      color: var(--text-primary);
      font-weight: 600;
    }

    .proof {
      color: var(--accent-secondary);
      font-weight: 600;
    }
  }

  .bullets {
    ${({ theme }) => theme.mixins.fancyList};
    margin: 0 0 24px;
    color: var(--text-secondary);
    font-size: var(--fz-md);
    line-height: 1.55;

    li {
      margin-bottom: 8px;
    }

    strong {
      color: var(--text-primary);
      font-weight: 600;
    }
  }

  .media {
    margin-top: clamp(28px, 4vw, 40px);
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

const FeaturedPic = styled.figure`
  margin: 0;
  max-width: 280px;
  justify-self: end;
  width: 100%;

  @media (max-width: 768px) {
    justify-self: center;
    max-width: 260px;
    margin-top: 8px;
  }

  figcaption {
    margin-top: 8px;
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    color: var(--text-tertiary);
    line-height: 1.35;
    text-align: center;

    @media (min-width: 769px) {
      text-align: left;
    }
  }
`;

const LinkRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const LinkChip = styled.a`
  ${({ theme }) => theme.mixins.outlineNeutral};
  min-height: 36px;
  display: inline-flex;
  align-items: center;
  padding: 8px 14px;
  font-size: var(--fz-xs);

  &:focus-visible {
    outline: 2px solid var(--accent-bright);
    outline-offset: 3px;
  }
`;

const PhotoGrid = styled.div`
  display: grid;
  gap: 12px;

  &.moments {
    grid-template-columns: repeat(3, minmax(0, 1fr));

    @media (max-width: 600px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 380px) {
      grid-template-columns: 1fr;
    }
  }

  &.artifacts {
    grid-template-columns: repeat(4, minmax(0, 1fr));

    @media (max-width: 900px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  }
`;

const PhotoFigure = styled.figure`
  margin: 0;
  min-width: 0;

  figcaption {
    margin-top: 8px;
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    color: var(--text-tertiary);
    line-height: 1.35;
  }
`;

const PhotoButton = styled.button`
  ${({ theme }) => theme.mixins.boxShadow};
  display: block;
  position: relative;
  width: 100%;
  margin: 0;
  padding: 0;
  aspect-ratio: ${props => props.$ratio || '1 / 1'};
  border-radius: var(--border-radius);
  overflow: hidden;
  border: 0.5px solid var(--bg-border);
  background: var(--bg-elevated);
  cursor: zoom-in;
  transition: border-color 0.2s, transform 0.2s;

  &:hover {
    border-color: var(--accent-border);
  }

  &:focus-visible {
    outline: 2px solid var(--accent-bright);
    outline-offset: 3px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: ${props => props.$position || 'center'};
    display: block;
  }
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const VideoCard = styled.a`
  display: flex;
  flex-direction: column;
  min-width: 0;
  margin: 0;
  text-decoration: none;
  color: inherit;

  &:hover .thumb,
  &:focus-visible .thumb {
    border-color: var(--accent-border);
  }

  &:focus-visible {
    outline: none;
  }

  &:focus-visible .thumb {
    outline: 2px solid var(--accent-bright);
    outline-offset: 3px;
  }

  .thumb {
    ${({ theme }) => theme.mixins.boxShadow};
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: var(--border-radius);
    overflow: hidden;
    border: 0.5px solid var(--bg-border);
    background: var(--bg-elevated);
    transition: border-color 0.2s;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .play {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.28);
      transition: background 0.2s;

      &::before {
        content: '';
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 9px 0 9px 15px;
        border-color: transparent transparent transparent #fff;
        margin-left: 3px;
        filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.45));
      }
    }
  }

  &:hover .play {
    background: rgba(0, 0, 0, 0.4);
  }

  .caption {
    margin-top: 8px;
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    color: var(--text-tertiary);
    line-height: 1.35;

    .label {
      display: block;
      color: var(--text-secondary);
      font-size: 12px;
    }

    .sub {
      display: block;
      margin-top: 2px;
    }
  }
`;

const LightboxOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(0, 0, 0, 0.88);
  cursor: zoom-out;

  @media (max-width: 480px) {
    padding: 16px;
  }
`;

const LightboxPanel = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  max-width: min(960px, 100%);
  max-height: 100%;
  cursor: default;

  img {
    display: block;
    max-width: 100%;
    max-height: min(78vh, 900px);
    width: auto;
    height: auto;
    object-fit: contain;
    border-radius: var(--border-radius);
    border: 0.5px solid var(--bg-border);
    background: var(--bg-elevated);
  }

  .caption {
    margin: 0;
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    color: var(--text-secondary);
    text-align: center;
  }

  .count {
    font-family: var(--font-mono);
    font-size: var(--fz-xxs);
    color: var(--text-tertiary);
  }
`;

const LightboxControl = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border: 0.5px solid var(--bg-border);
  border-radius: 999px;
  background: rgba(10, 10, 10, 0.7);
  color: var(--text-primary);
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover,
  &:focus-visible {
    border-color: var(--accent-border);
    color: var(--accent-bright);
  }

  &:focus-visible {
    outline: 2px solid var(--accent-bright);
    outline-offset: 3px;
  }

  &.prev {
    left: -56px;
  }

  &.next {
    right: -56px;
  }

  &.close {
    top: -8px;
    right: -8px;
    transform: none;
    width: 36px;
    height: 36px;
    font-size: 18px;
  }

  @media (max-width: 900px) {
    &.prev {
      left: 0;
    }

    &.next {
      right: 0;
    }

    &.close {
      right: 0;
      top: -44px;
    }
  }
`;

const openIndexFor = src => gallery.findIndex(photo => photo.src === src);

const Community = () => {
  const revealContainer = useRef(null);
  const closeBtnRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(null);
  const isOpen = activeIndex !== null;
  const active = isOpen ? gallery[activeIndex] : null;

  const close = useCallback(() => setActiveIndex(null), []);
  const open = useCallback(src => {
    const index = openIndexFor(src);
    if (index >= 0) {
      setActiveIndex(index);
    }
  }, []);

  const showPrev = useCallback(() => {
    setActiveIndex(i => (i === null ? i : (i + gallery.length - 1) % gallery.length));
  }, []);

  const showNext = useCallback(() => {
    setActiveIndex(i => (i === null ? i : (i + 1) % gallery.length));
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    const onKeyDown = event => {
      if (event.key === 'Escape') {
        close();
      } else if (event.key === 'ArrowLeft') {
        showPrev();
      } else if (event.key === 'ArrowRight') {
        showNext();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, close, showPrev, showNext]);

  const lightbox =
    isOpen &&
    active &&
    typeof document !== 'undefined' &&
    createPortal(
      <LightboxOverlay role="presentation" onClick={close}>
        <LightboxPanel
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
          onClick={event => event.stopPropagation()}>
          <LightboxControl
            ref={closeBtnRef}
            type="button"
            className="close"
            aria-label="Close photo"
            onClick={close}>
            ×
          </LightboxControl>
          <LightboxControl type="button" className="prev" aria-label="Previous photo" onClick={showPrev}>
            ‹
          </LightboxControl>
          <LightboxControl type="button" className="next" aria-label="Next photo" onClick={showNext}>
            ›
          </LightboxControl>
          <img src={active.src} alt={active.alt} />
          <p className="caption">{active.caption}</p>
          <span className="count">
            {activeIndex + 1} / {gallery.length}
          </span>
        </LightboxPanel>
      </LightboxOverlay>,
      document.body,
    );

  return (
    <StyledCommunitySection id="community" ref={revealContainer}>
      <h2 className="numbered-heading">Community</h2>

      <div className="intro">
        <div className="copy">
          <p className="lead">
            Founded <strong>1337 AI</strong> — <span className="proof">300+</span> member AI
            engineering community at 1337 / UM6P.
          </p>

          <ul className="bullets">
            <li>
              Founded &amp; scaled 1337 AI as President; 2 bootcamps + 6 workshops (Python, ML,
              generative AI).
            </li>
            <li>
              Co-mentor at <strong>ThinkAI 2023–24</strong> and <strong>HackAI 2025</strong>,
              alongside mentors from Hugging Face and peers at those events.
            </li>
            <li>
              Campus presence at UM6P — club booths, Discord onboarding, and student AI outreach.
            </li>
          </ul>

          <LinkRow>
            {links.map(({ label, href }) => (
              <LinkChip key={href} href={href} target="_blank" rel="noopener noreferrer">
                {label}
              </LinkChip>
            ))}
          </LinkRow>
        </div>

        <FeaturedPic>
          <PhotoButton
            type="button"
            $position={featured.position}
            aria-label={`View larger: ${featured.caption}`}
            onClick={() => open(featured.src)}>
            <img
              src={featured.src}
              alt={featured.alt}
              width={280}
              height={280}
              loading="eager"
            />
          </PhotoButton>
          <figcaption>{featured.caption}</figcaption>
        </FeaturedPic>
      </div>

      <div className="media">
        <PhotoGrid className="moments">
          {moments.map(photo => (
            <PhotoFigure key={`${photo.caption}-${photo.src}`}>
              <PhotoButton
                type="button"
                $position={photo.position}
                aria-label={`View larger: ${photo.caption}`}
                onClick={() => open(photo.src)}>
                <img src={photo.src} alt={photo.alt} width={420} height={420} loading="lazy" />
              </PhotoButton>
              <figcaption>{photo.caption}</figcaption>
            </PhotoFigure>
          ))}
        </PhotoGrid>

        <PhotoGrid className="artifacts">
          {artifacts.map(photo => (
            <PhotoFigure key={photo.src}>
              <PhotoButton
                type="button"
                $position={photo.position}
                $ratio="4 / 3"
                aria-label={`View larger: ${photo.caption}`}
                onClick={() => open(photo.src)}>
                <img src={photo.src} alt={photo.alt} width={480} height={360} loading="lazy" />
              </PhotoButton>
              <figcaption>{photo.caption}</figcaption>
            </PhotoFigure>
          ))}
        </PhotoGrid>

        <VideoGrid>
          {videos.map(video => (
            <VideoCard
              key={video.href}
              href={video.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Watch ${video.label} on YouTube`}>
              <span className="thumb">
                <img src={video.thumb} alt="" width={480} height={270} loading="lazy" />
                <span className="play" aria-hidden="true" />
              </span>
              <span className="caption">
                <span className="label">{video.label}</span>
                <span className="sub">{video.sub}</span>
              </span>
            </VideoCard>
          ))}
        </VideoGrid>
      </div>

      {lightbox}
    </StyledCommunitySection>
  );
};

export default Community;
