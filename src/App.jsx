import { useEffect, useState } from 'react'
import './App.css'
import AnimatedCursor from './components/AnimatedCursor'
import GlassGridReveal from './components/GlassGridReveal'
import Icon from './components/Icon'
import ParticleField from './components/ParticleField'
import ProfileReveal from './components/ProfileReveal'
import Projects from './components/Projects'
import Skills from './components/Skills'
import { education, experience, navItems, profile } from './data'

function SectionHeading({ index, kicker, title, aside }) {
  return (
    <div className="section-heading reveal">
      <div className="section-heading__main">
        <p className="section-kicker">
          <span>{index}</span>
          {kicker}
        </p>
        <h2>{title}</h2>
      </div>
      {aside}
    </div>
  )
}

function SocialLinks({ className = '' }) {
  return (
    <div className={`socials ${className}`.trim()}>
      {profile.socials.map((social) => (
        <a
          aria-label={social.label}
          className="socials__link"
          href={social.href}
          key={social.label}
          rel={social.href.startsWith('http') ? 'noreferrer' : undefined}
          target={social.href.startsWith('http') ? '_blank' : undefined}
          title={social.label}
        >
          <Icon name={social.icon} size={17} />
        </a>
      ))}
    </div>
  )
}

function FlipCard({ period, role, company, description, tags, index, type = 'experience' }) {
  const [flipped, setFlipped] = useState(false)

  const handleToggle = () => {
    setFlipped((prev) => !prev)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleToggle()
    }
  }

  return (
    <article
      className={`flip-card ${flipped ? 'is-flipped' : ''}`}
      role="button"
      tabIndex={0}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      aria-pressed={flipped}
    >
      <div className="flip-card__inner">
        <div className="flip-card__face flip-card__face--front">
          <div className="flip-card__top">
            <span className="flip-card__pill">{period}</span>
            <span className="flip-card__index">0{index + 1}</span>
          </div>
          <div className="flip-card__main">
            <h4>{role}</h4>
            <p className="flip-card__company">
              <Icon
                name={type === 'education' ? 'graduation' : 'briefcase'}
                size={14}
              />
              <span>{company}</span>
            </p>
          </div>
          <span className="flip-card__cta">
            View details
            <Icon name="arrowUpRight" size={14} />
          </span>
        </div>
        <div className="flip-card__face flip-card__face--back">
          <div className="flip-card__back-head">
            <span className="flip-card__pill flip-card__pill--subtle">
              {period}
            </span>
            <h4>{role}</h4>
            <p className="flip-card__company">
              <Icon
                name={type === 'education' ? 'graduation' : 'briefcase'}
                size={14}
              />
              <span>{company}</span>
            </p>
          </div>
          <p className="flip-card__description">{description}</p>
          <div className="flip-card__tags-wrap">
            <p className="flip-card__tags-label">Key focus</p>
            <ul className="tag-list">
              {tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>
          <span className="flip-card__hint">Back to overview</span>
        </div>
      </div>
    </article>
  )
}

function App() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (!('IntersectionObserver' in window) || reducedMotion.matches) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          } else {
            entry.target.classList.remove('is-visible')
          }
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.01 },
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean)

    if (!('IntersectionObserver' in window) || sections.length === 0) {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-42% 0px -52% 0px', threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="app">
      <ParticleField />
      <AnimatedCursor />

      <div aria-hidden="true" className="ambient ambient--lime" />
      <div aria-hidden="true" className="ambient ambient--teal" />

      <header className="topbar">
        <div className="topbar__inner">
          <a
            aria-label={`${profile.name}, back to top`}
            className="brand"
            href="#home"
          >
            <span className="brand__name">{profile.name}</span>
          </a>

          <nav aria-label="Primary navigation" className="nav">
            {navItems.map((item) => (
              <a
                aria-current={
                  activeSection === item.href.slice(1) ? 'true' : undefined
                }
                className={`nav__link ${
                  activeSection === item.href.slice(1) ? 'is-active' : ''
                }`}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="topbar__actions">
            <span className="availability">
              <span className="availability__dot" />
              Available
            </span>
            <a className="button button--small button--outline" href="#contact">
              Let&apos;s talk
              <Icon name="arrowUpRight" size={15} />
            </a>
          </div>
        </div>
      </header>

      <main className="page">
        <section aria-labelledby="hero-title" className="hero" id="home">
          <div className="hero__content">
            <p className="eyebrow hero__eyebrow">
              <span className="eyebrow__line" />
              Portfolio
            </p>
            <h1 className="hero__title" id="hero-title">
              Curious by nature.{' '}
              <span className="hero__title-accent">Building with purpose.</span>
            </h1>
            <p className="hero__intro">{profile.intro}</p>
            <div className="hero__actions">
              <a className="button button--primary" href="#projects">
                Explore my work
                <Icon name="arrow" size={17} />
              </a>
            </div>
            <div className="hero__footnote">
              <span>
                <Icon name="pin" size={15} />
                {profile.location}
              </span>
              <span className="hero__footnote-divider" />
              <span>Full-stack development &amp; frontend engineering</span>
            </div>
          </div>

          <aside aria-labelledby="profile-name" className="profile-card">
            <ProfileReveal
              availability={profile.availability}
              name={profile.name}
            />

            <div className="profile-card__body">
              <h2 id="profile-name">{profile.name}</h2>
              <p className="profile-card__role">{profile.role}</p>

              <div className="profile-card__meta">
                <span>
                  <Icon name="pin" size={15} />
                  {profile.location}
                </span>
                <a href={`mailto:${profile.email}`}>
                  <Icon name="mail" size={15} />
                  {profile.email}
                </a>
              </div>

              <div className="profile-card__footer">
                <SocialLinks />
                <a className="profile-card__journey" href="#journey">
                  Journey
                  <Icon name="arrowDown" size={14} />
                </a>
              </div>
            </div>
          </aside>
        </section>

        <div aria-label="Career highlights" className="stats-strip stats-strip--hanging reveal">
          {profile.stats.map((stat, index) => (
            <div className="stat-hang" key={stat.label}>
              <span className="stat-hang__thread" />
              <div className="stat-hang__card">
                <span className="stat-hang__index">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <strong>{stat.value}</strong>
                <span className="stat-hang__label">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>

        <section aria-labelledby="profile-heading" className="section" id="profile">
          <SectionHeading
            aside={
              <p className="section-heading__aside">
                A developer with a designer&apos;s eye and a product
                team&apos;s mindset.
              </p>
            }
            index="01"
            kicker="Personal profile"
            title={
              <span id="profile-heading">
                Curious mind. <em>Creative</em> execution.
              </span>
            }
          />

          <GlassGridReveal>
            <div className="profile-grid">
              <article className="about-card">
                <p className="about-card__lead">{profile.bio[0]}</p>
                <p>{profile.bio[1]}</p>

                <div className="about-card__facts">
                  <div>
                    <span>Based in</span>
                    <strong>Bengaluru, India</strong>
                  </div>
                  <div>
                    <span>Focus</span>
                    <strong>Full-stack &amp; frontend</strong>
                  </div>
                  <div>
                    <span>Availability</span>
                    <strong className="is-accent">Open to opportunities</strong>
                  </div>
                </div>
              </article>

              <div className="focus-stack">
                {profile.focus.map((item, index) => (
                  <article className="focus-card" key={item.title}>
                    <span className="focus-card__icon">
                      <Icon name={item.icon} size={19} />
                    </span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                    <span className="focus-card__index">
                      0{index + 1}
                    </span>
                  </article>
                ))}
              </div>
            </div>
          </GlassGridReveal>
        </section>

        <Projects />

        <Skills />

        <section aria-labelledby="journey-heading" className="section" id="journey">
          <SectionHeading
            aside={
              <p className="section-heading__aside">
                Internships, college, and hands-on projects across web
                development, AI, and mobile apps.
              </p>
            }
            index="04"
            kicker={'Education & experience'}
            title={<span id="journey-heading">The road that got me here.</span>}
          />

          <div className="journey-grid">
            <div className="flip-section reveal">
              <header className="flip-section__head">
                <div className="flip-section__title-group">
                  <span className="flip-section__icon">
                    <Icon name="briefcase" size={18} />
                  </span>
                  <div>
                    <p className="flip-section__kicker">Work history</p>
                    <h3>Experience</h3>
                  </div>
                </div>
                <span className="flip-section__count">
                  {String(experience.length).padStart(2, '0')} entries
                </span>
              </header>

              <div className="flip-grid">
                {experience.map((item, index) => (
                  <FlipCard
                    key={`${item.company}-${item.period}`}
                    period={item.period}
                    role={item.role}
                    company={item.company}
                    description={item.description}
                    tags={item.tags}
                    index={index}
                    type="experience"
                  />
                ))}
              </div>
            </div>

            <div className="flip-section reveal">
              <header className="flip-section__head">
                <div className="flip-section__title-group">
                  <span className="flip-section__icon">
                    <Icon name="graduation" size={19} />
                  </span>
                  <div>
                    <p className="flip-section__kicker">Academic background</p>
                    <h3>Education</h3>
                  </div>
                </div>
                <span className="flip-section__count">
                  {String(education.length).padStart(2, '0')} entries
                </span>
              </header>

              <div className="flip-grid">
                {education.map((item, index) => (
                  <FlipCard
                    key={`${item.company}-${item.period}`}
                    period={item.period}
                    role={item.role}
                    company={item.company}
                    description={item.description}
                    tags={item.tags}
                    index={index}
                    type="education"
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="contact-heading" className="contact reveal" id="contact">
          <div aria-hidden="true" className="contact__orb" />
          <div className="contact__content">
            <p className="section-kicker">
              <span>05</span>
              Next step
            </p>
            <h2 id="contact-heading">
              Have a project in mind?
              <br />
              <span>Let&apos;s make it real.</span>
            </h2>
            <p>
              I&apos;m open to software development, web, AI, and mobile app
              opportunities. Tell me what you&apos;re building and where I can
              help.
            </p>
            <div className="contact__actions">
              <a
                className="button button--primary"
                href={profile.linkedinMessage}
                rel="noreferrer"
                target="_blank"
              >
                Start a conversation
                <Icon name="arrowUpRight" size={17} />
              </a>
              <a className="contact__email" href={`mailto:${profile.email}`}>
                <Icon name="mail" size={16} />
                {profile.email}
              </a>
            </div>
          </div>

          <div className="contact__aside">
            <span className="contact__available">
              <span className="availability__dot" />
              {profile.availability}
            </span>
            <SocialLinks className="socials--large" />
          </div>
        </section>

        <footer className="footer">
          <span>
            &copy; {new Date().getFullYear()} {profile.name}
          </span>
          <span className="footer__note">
            Designed &amp; built with React
          </span>
          <a href="#home">
            Back to top
            <Icon name="arrowDown" size={14} />
          </a>
        </footer>
      </main>
    </div>
  )
}

export default App
