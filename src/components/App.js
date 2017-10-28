import React from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css';
import styles from './App.css';
import Header from './header/Header';
import Content from './content/Content';
import Navigation from './aside/Navigation';
import Footer from './footer/Footer';

class App extends React.Component {
  render() {
    return (
        <div className={styles.wrapper}>
            <Header />
            <Navigation />
            <div className={styles.backgroundWrapper}>
                <Content />
                <Footer />
            </div>
        </div>
    );
  }
}

ReactDOM.render( <App />, document.getElementById( 'root' ));