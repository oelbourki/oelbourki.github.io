import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useLocation } from '@reach/router';
import { useStaticQuery, graphql } from 'gatsby';
import config from '@config';

// https://www.gatsbyjs.com/docs/add-seo-component/

const Head = ({ title, description, image }) => {
  const { pathname } = useLocation();

  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            defaultTitle: title
            defaultDescription: description
            siteUrl
            defaultImage: image
            twitterUsername
          }
        }
      }
    `,
  );

  const {
    defaultTitle,
    defaultDescription,
    siteUrl,
    defaultImage,
    twitterUsername,
  } = site.siteMetadata;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname}`,
  };

  const sameAs = [
    ...((config.socialMedia || [])
      .filter(s => s.name === 'GitHub' || s.name === 'Linkedin' || s.name === 'Website')
      .map(s => s.url)),
    'https://huggingface.co/oelbourki',
  ].filter((url, i, arr) => url && arr.indexOf(url) === i);

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Otmane El Bourki',
    jobTitle: 'AI Engineer / Ingénieur IA confirmé',
    url: siteUrl,
    email: config.email,
    sameAs,
    knowsAbout: [
      'Large Language Models',
      'RAG',
      'GraphRAG',
      'Agentic AI',
      'LangGraph',
      'Inference Optimization',
      'MLOps',
      'Intelligence artificielle',
      'Ingénieur IA',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'ALTEN',
    },
    homeLocation: {
      '@type': 'Place',
      name: 'Carrières-sous-Poissy, Île-de-France · Rabat, Morocco',
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Otmane El Bourki',
    url: siteUrl,
    description: defaultDescription,
    author: {
      '@type': 'Person',
      name: 'Otmane El Bourki',
    },
  };

  return (
    <Helmet
      title={seo.title}
      defaultTitle={defaultTitle}
      titleTemplate={title ? `%s | oelbourki.com` : null}>
      <html lang="en" />
      <meta charSet="utf-8" />

      <link rel="canonical" href={seo.url} />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />

      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterUsername} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      <meta name="google-site-verification" content="DCl7VAf9tcz6eD9gb67NfkNnJ1PKRNcg8qQiwpbx9Lk" />

      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
    </Helmet>
  );
};

export default Head;

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
};
