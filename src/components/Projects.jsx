import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from './Icon'
import { projects } from '../data'
import { useBentoInteraction } from './useBentoInteraction'
import './Projects.css'

const FILTERS = ['All', 'Full Stack', 'Mobile', 'Web App']
const EASE = [0.16, 1, 0.3, 1]

function PreviewChrome({ label }) {
  return (
    <div className="preview__chrome">
      <span />
      <span />
      <span />
      <em>{label}</em>
    </div>
  )
}

function ProjectPreview({ type }) {
  if (type === 'donation') {
    return (
      <div className="preview preview--donation">
        <div className="preview__window">
          <PreviewChrome label="clothhope / dashboard" />
          <div className="preview__donation">
            <div className="preview__donation-head">
              <span className="preview__badge">Donation drive</span>
              <span className="preview__status">
                <i />
                Verified
              </span>
            </div>
            <div className="preview__donation-grid">
              <span>
                <small>Pickup</small>
                <strong>Scheduled</strong>
              </span>
              <span>
                <small>Category</small>
                <strong>Clothing</strong>
              </span>
            </div>
            <div className="preview__progress">
              <span />
            </div>
            <div className="preview__donation-foot">
              <span>OTP verified</span>
              <span>Admin review</span>
            </div>
          </div>
        </div>
        <span className="preview__float preview__float--a">Drop-off confirmed</span>
        <span className="preview__float preview__float--b">Admin dashboard</span>
      </div>
    )
  }

  if (type === 'event') {
    return (
      <div className="preview preview--event">
        <div className="preview__window">
          <PreviewChrome label="tibevent / discover" />
          <div className="preview__event">
            <span className="preview__event-date">
              <strong>24</strong>
              <small>OCT</small>
            </span>
            <div className="preview__event-copy">
              <span className="preview__badge">Featured event</span>
              <strong>Culture night</strong>
              <small>Music · Arts · Community</small>
            </div>
          </div>
          <div className="preview__event-grid">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
        <span className="preview__float preview__float--a">Image upload</span>
        <span className="preview__float preview__float--b">Event management</span>
      </div>
    )
  }

  if (type === 'letter') {
    return (
      <div className="preview preview--letter">
        <div className="preview__phone">
          <span className="preview__phone-notch" />
          <span className="preview__badge">AI letter studio</span>
          <strong>Dear ...</strong>
          <span className="preview__line preview__line--wide" />
          <span className="preview__line" />
          <span className="preview__line preview__line--short" />
          <span className="preview__phone-action">
            <Icon name="sparkle" size={13} />
            Draft with AI
          </span>
        </div>
        <span className="preview__orb" />
      </div>
    )
  }

  if (type === 'tasks') {
    return (
      <div className="preview preview--tasks">
        <div className="preview__window">
          <PreviewChrome label="todo / today" />
          <div className="preview__task-head">
            <strong>Today</strong>
            <span>Focus mode</span>
          </div>
          <div className="preview__task-list">
            <span className="is-done">
              <i />
              Plan the day
            </span>
            <span className="is-done">
              <i />
              Review tasks
            </span>
            <span>
              <i />
              Deep work block
            </span>
            <span>
              <i />
              Set reminder
            </span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="preview preview--converter">
      <div className="preview__converter">
        <span className="preview__badge">Unit converter</span>
        <div className="preview__converter-row">
          <span>Distance</span>
          <strong>12.5</strong>
          <em>km</em>
        </div>
        <span className="preview__converter-swap">
          <Icon name="arrowDown" size={14} />
        </span>
        <div className="preview__converter-row">
          <span>Result</span>
          <strong>7.767</strong>
          <em>mi</em>
        </div>
      </div>
      <span className="preview__ring preview__ring--one" />
      <span className="preview__ring preview__ring--two" />
    </div>
  )
}

function ProjectCard({ project, index, sizeClass }) {
  const interaction = useBentoInteraction()
  const reduceMotion = interaction.reduceMotion

  return (
    <motion.article
      className={`bento-project ${sizeClass}`.trim()}
      data-accent={project.accent}
      exit={
        reduceMotion
          ? { opacity: 0, transition: { duration: 0 } }
          : {
              opacity: 0,
              scale: 0.96,
              transition: { duration: 0.22, ease: 'easeIn' },
            }
      }
      initial={
        reduceMotion
          ? false
          : { opacity: 0, scale: 0.985, y: 26 }
      }
      layout={!reduceMotion}
      onPointerLeave={interaction.reset}
      onPointerMove={interaction.handlePointerMove}
      style={interaction.style}
      transition={{
        duration: reduceMotion ? 0 : 0.6,
        delay: reduceMotion ? 0 : index * 0.065,
        ease: EASE,
        layout: { duration: 0.45, ease: EASE },
      }}
      viewport={{ amount: 0.16, once: true }}
      whileHover={interaction.active ? { y: -6 } : undefined}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
    >
      <motion.span
        aria-hidden="true"
        className="bento-project__spotlight"
        style={{ background: interaction.spotlight }}
      />

      <div aria-hidden="true" className="bento-project__preview">
        <span className="bento-project__number">
          {String(index + 1).padStart(2, '0')}
        </span>
        <ProjectPreview type={project.preview} />
      </div>

      <div className="bento-project__content">
        <div className="bento-project__meta">
          <span className="bento-project__category">{project.category}</span>
          <span className="bento-project__year">{project.year}</span>
        </div>

        <h3>{project.title}</h3>
        <p>{project.description}</p>

        <ul className="bento-project__tags">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        <div className="bento-project__foot">
          <span className="bento-project__source">
            <i className={project.repo ? 'is-available' : ''} />
            {project.repo ? 'Source code available' : 'Source not public'}
          </span>

          {project.repo ? (
            <a
              aria-label={`View ${project.title} source code on GitHub`}
              className="bento-project__repo"
              href={project.repo}
              rel="noreferrer"
              target="_blank"
            >
              <Icon name="github" size={15} />
              View on GitHub
              <Icon name="arrowUpRight" size={14} />
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  )
}

function Projects() {
  const [filter, setFilter] = useState('All')
  const visibleProjects =
    filter === 'All'
      ? projects
      : projects.filter((project) => project.category === filter)

  const count = (category) =>
    category === 'All'
      ? projects.length
      : projects.filter((project) => project.category === category).length

  return (
    <section
      aria-labelledby="projects-heading"
      className="section projects-section"
      id="projects"
    >
      <div className="section-heading projects-heading reveal">
        <div className="section-heading__main">
          <p className="section-kicker">
            <span>02</span>
            Selected work
          </p>
          <h2 id="projects-heading">Projects.</h2>
        </div>

        <div
          aria-label="Filter projects"
          className="projects-filters"
          role="group"
        >
          {FILTERS.map((category) => (
            <button
              aria-pressed={filter === category}
              className={`projects-filters__button ${
                filter === category ? 'is-active' : ''
              }`.trim()}
              key={category}
              onClick={() => setFilter(category)}
              type="button"
            >
              {filter === category ? (
                <motion.span
                  className="projects-filters__active"
                  layoutId="activeProjectFilter"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                />
              ) : null}
              <span className="projects-filters__label">{category}</span>
              <span className="projects-filters__count">{count(category)}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="project-bento">
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((project, index) => {
            const sizeClass =
              visibleProjects.length === 1
                ? 'bento-project--solo'
                : visibleProjects.length === 2 && !project.featured
                  ? 'bento-project--half'
                  : project.featured
                    ? 'bento-project--wide'
                    : ''

            return (
              <ProjectCard
                index={index}
                key={project.title}
                project={project}
                sizeClass={sizeClass}
              />
            )
          })}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Projects
