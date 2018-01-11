import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import styles from './ResponsiveNavigation.css';
import Button from '../button/Button';

class ResponsiveNavigation extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            open: null,
        };
        this.toggle = this.toggle.bind( this );
    }

    toggle( e ) {
        e.preventDefault();
        this.setState({ open: ( !this.state.open ) && styles.visible });
    }

    render() {
        const { open } = this.state;

        return (
            <div className={styles.responsiveNavigationContainer}>
                <a onClick={this.toggle} className={
                    classNames(
                        styles[ 'navicon-button' ],
                        styles[ 'x' ],
                        ( open ) ? styles.open : null
                    )}>
                    <div className={styles.navicon} />
                </a>
                <nav className={open}>
                    <Link className={styles.active} to="/">Home</Link>
                    <Link to="/how-we-work">How we work</Link>
                    <Link to="/services">Services</Link>
                    <Link to="/our-team">Our team</Link>
                    <a href="#">Our beliefs</a>
                    <Link to="/contacts">Contact</Link>
                    <Button className={styles.requestMobBtn} label="send a request" />
                </nav>
            </div>
        );
    }
}

export default ResponsiveNavigation;
