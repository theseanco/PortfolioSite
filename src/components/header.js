import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

import './header.css'

const Header = ({ siteTitle }) => (
  <div
    className="topBar"
  >
          <h1>
        <Link className="header-home-link"
          to="/"
          state={{
            noAnimation: true
          }}
        >
          {siteTitle}
        </Link>
        </h1>

        <Link
        className="header-about-link"
          to="/about"
          >About</Link>

  </div>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}


export default Header
