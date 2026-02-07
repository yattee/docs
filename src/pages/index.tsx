import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header
      style={{
        padding: '4rem 0',
        textAlign: 'center',
        background: 'var(--ifm-color-emphasis-100)',
      }}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            marginTop: '1.5rem',
          }}>
          <Link
            className="button button--primary button--lg"
            to="/docs/overview/what-is-yattee">
            Get Started
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/guides/complete-setup">
            Setup Guide
          </Link>
        </div>
      </div>
    </header>
  );
}

function Features() {
  return (
    <section className="container" style={{padding: '3rem 0'}}>
      <div className="hero-features">
        <div className="hero-feature">
          <h3>Yattee App</h3>
          <p>
            Privacy-focused video streaming on iOS, macOS, and tvOS. Connect to
            multiple backends, manage subscriptions, and enjoy ad-free viewing.
          </p>
          <p style={{marginTop: '1rem'}}>
            <Link to="/docs/app/getting-started">App Documentation &rarr;</Link>
          </p>
        </div>
        <div className="hero-feature">
          <h3>Yattee Server</h3>
          <p>
            Self-hosted video API server powered by yt-dlp. Supports YouTube and
            1000+ sites with Docker deployment and an admin panel.
          </p>
          <p style={{marginTop: '1rem'}}>
            <Link to="/docs/server/setup/docker">
              Server Documentation &rarr;
            </Link>
          </p>
        </div>
        <div className="hero-feature">
          <h3>Guides</h3>
          <p>
            Step-by-step tutorials to get you up and running. From initial setup
            to importing your subscriptions.
          </p>
          <p style={{marginTop: '1rem'}}>
            <Link to="/docs/guides/complete-setup">
              Browse Guides &rarr;
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout description="Documentation for Yattee - privacy-focused video streaming for iOS, macOS, and tvOS">
      <HomepageHeader />
      <main>
        <Features />
      </main>
    </Layout>
  );
}
