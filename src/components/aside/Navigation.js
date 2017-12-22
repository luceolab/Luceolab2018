import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Link, withRouter } from 'react-router-dom';

import styles from './Navigation.css';

class Navigation extends React.Component {
    render() {
        return (
        <aside className={classNames( styles.secondaryNavigation, { 'blurred': this.props.location.pathname === '/' })}>
            <div className={styles.visibleColumn} />
            <nav>
                <Link className={styles.active} to="/">Home</Link>
                <Link to="/how-we-work">How we work</Link>
                <Link to="/services">Services</Link>
                <Link to="/our-team">Our team</Link>
                <a href="#">Our beliefs</a>
                <Link to="/contacts">Contact</Link>
            </nav>
        </aside>
        );
    }
}

export default withRouter( Navigation );
