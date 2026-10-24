import Icon from './Icon'
import './ProfileReveal.css'

function ProfileReveal({ availability, name }) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)

  return (
    <div className="profile-portal fade-in">
      <div aria-hidden="true" className="profile-portal__bg" />

      <span className="profile-portal__status">
        <span className="profile-portal__status-dot" />
        {availability}
      </span>

      <div className="profile-portal__stage">
        <div className="profile-portal__avatar">
          <div className="profile-portal__avatar-inner">
            <span className="profile-portal__initials">{initials}</span>
            <div className="profile-portal__icon-grid">
              <Icon name="code" size={18} />
              <Icon name="sparkle" size={18} />
              <Icon name="layers" size={18} />
            </div>
          </div>
          <div aria-hidden="true" className="profile-portal__ring" />
        </div>
      </div>
    </div>
  )
}

export default ProfileReveal
