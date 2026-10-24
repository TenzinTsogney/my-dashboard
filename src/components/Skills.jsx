import { motion, useReducedMotion } from 'framer-motion'
import Icon from './Icon'
import { skillGroups, toolbelt } from '../data'
import { useBentoInteraction } from './useBentoInteraction'
import './Skills.css'

const EASE = [0.16, 1, 0.3, 1]

function SkillCard({ group, index }) {
  const interaction = useBentoInteraction()
  const reduceMotion = interaction.reduceMotion

  return (
    <motion.article
      className="skill-bento-card"
      data-accent={group.accent}
      initial={
        reduceMotion
          ? false
          : { opacity: 0, scale: 0.985, y: 28 }
      }
      layout={!reduceMotion}
      onPointerLeave={interaction.reset}
      onPointerMove={interaction.handlePointerMove}
      style={interaction.style}
      transition={{
        duration: reduceMotion ? 0 : 0.62,
        delay: reduceMotion ? 0 : index * 0.075,
        ease: EASE,
      }}
      viewport={{ amount: 0.2, once: true }}
      whileHover={interaction.active ? { y: -4 } : undefined}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
    >
      <motion.span
        aria-hidden="true"
        className="skill-bento-card__spotlight"
        style={{ background: interaction.spotlight }}
      />

      <div className="skill-bento-card__head">
        <span className="skill-bento-card__icon">
          <Icon name={group.icon} size={19} />
        </span>
        <span className="skill-bento-card__index">
          0{index + 1}
        </span>
      </div>

      <h3>{group.title}</h3>
      <p className="skill-bento-card__description">{group.description}</p>

      <ul className="skill-bento-list">
        {group.skills.map((skill, skillIndex) => (
          <li className="skill-bento-list__item" key={skill.name}>
            <div className="skill-bento-list__top">
              <span>{skill.name}</span>
              <em>{skill.level}%</em>
            </div>
            <div
              aria-label={`${skill.name}: ${skill.level}% self-assessed`}
              aria-valuemax={100}
              aria-valuemin={0}
              aria-valuenow={skill.level}
              className="skill-bento-list__track"
              role="progressbar"
            >
              <motion.span
                aria-hidden="true"
                className="skill-bento-list__fill"
                initial={{ scaleX: reduceMotion ? skill.level / 100 : 0 }}
                transition={{
                  delay: reduceMotion ? 0 : index * 0.06 + skillIndex * 0.055,
                  duration: reduceMotion ? 0 : 0.95,
                  ease: EASE,
                }}
                viewport={{ amount: 0.65, once: true }}
                whileInView={{ scaleX: skill.level / 100 }}
              />
            </div>
          </li>
        ))}
      </ul>
    </motion.article>
  )
}

function Toolkit() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className="skills-toolkit"
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      transition={{ duration: reduceMotion ? 0 : 0.6, ease: EASE }}
      viewport={{ amount: 0.25, once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className="skills-toolkit__head">
        <div>
          <span className="skills-toolkit__eyebrow">Daily toolkit</span>
          <p>Tools I reach for while building, testing, and shipping.</p>
        </div>
        <span className="skills-toolkit__count">
          {String(toolbelt.length).padStart(2, '0')} tools
        </span>
      </div>

      <ul className="skills-toolkit__list">
        {toolbelt.map((tool, index) => (
          <motion.li
            className="skills-toolkit__chip"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            key={tool}
            transition={{
              delay: reduceMotion ? 0 : index * 0.025,
              duration: reduceMotion ? 0 : 0.4,
              ease: EASE,
            }}
            viewport={{ amount: 0.4, once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <i aria-hidden="true" />
            {tool}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}

function Skills() {
  return (
    <section
      aria-labelledby="skills-heading"
      className="section skills-section"
      id="skills"
    >
      <div className="section-heading skills-heading reveal">
        <div className="section-heading__main">
          <p className="section-kicker">
            <span>03</span>
            Skills &amp; technologies
          </p>
          <h2 id="skills-heading">
            Deep into the stack.{' '}
            <span className="skills-heading__accent">
              Curious by default.
            </span>
          </h2>
        </div>
        <p className="section-heading__aside skills-heading__aside">
          A growing toolkit shaped by building real-world projects, solving
          development challenges, and exploring technologies beyond the
          classroom.
        </p>
      </div>

      <div className="skills-bento">
        {skillGroups.map((group, index) => (
          <SkillCard group={group} index={index} key={group.title} />
        ))}
      </div>

      <Toolkit />
    </section>
  )
}

export default Skills
