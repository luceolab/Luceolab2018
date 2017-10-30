import React from 'react';
import ReactDOM from 'react-dom';

import styles from './Header.css';
import Button from '../button/Button';

class Header extends React.Component {
  render() {
    return (
        <header className={styles.header}>
            <a className={styles.headerLogo} href="/" alt="LuceoLab"></a>
            <nav className={styles.primaryNav}>
                <a href="#" target="_blank"><i className="fa fa-facebook-square" aria-hidden="true"></i>
</a>
                <a href="#" target="_blank"><i className="fa fa-instagram" aria-hidden="true"></i></a>
                <a href="#" target="_blank"><i className="fa fa-telegram" aria-hidden="true"></i></a>
                <a href="mailto:info@luceolab.com" target="_blank"><i className="fa fa-envelope-open" aria-hidden="true"></i>
</a>
                <Button label="send a request" />
                <a className={styles.languageBtn} href="#" target="_blank">ru</a>
            </nav>
        </header>
    );
  }
}

export default Header;
