import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import styles from './MouseNavigation.css';

class MouseNavigation extends React.Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }

    static wrapperId = 'mouse-navigation-wrapper'
    static routes = [
        '/',
        '/how-we-work',
        '/services',
        '/team',
        '/about',
        '/contact',
    ]
    static redirectTimeoutId = null

    constructor( props ) {
        super( props );
        this.redirect = this.redirect.bind( this );
    }

    redirect( nextRouteId ) {
        if ( process.env.BROWSER ) {
            if ( MouseNavigation.routes.length > nextRouteId && nextRouteId != -1 && !MouseNavigation.redirectTimeoutId ) {
                clearTimeout( MouseNavigation.redirectTimeoutId );
                MouseNavigation.redirectTimeoutId = setTimeout(() => {
                    this.props.history.push( MouseNavigation.routes[ nextRouteId ]);
                    setTimeout(() => {
                        MouseNavigation.redirectTimeoutId = null;
                    }, 2000 );
                }, 250 );
            }
        }
    }

    componentDidMount() {
        if ( process.env.BROWSER ) {
            let startX = -1;
            let endX = 0;
            let element = document.getElementById( MouseNavigation.wrapperId );

            element.addEventListener( 'wheel', ( e ) => {
                e.preventDefault();
	            let delta = Math.max( -1, Math.min( 1, e.deltaY ));
                let routeId = MouseNavigation.routes.indexOf( this.props.location.pathname );
                delta = -delta;
                let nextRouteId = routeId - delta;
                this.redirect( nextRouteId );
            });
            element.addEventListener( 'mousedown', ( e ) => {
                startX = e.pageY;
            }, false );
            element.addEventListener( 'mouseup', ( e ) => {
                endX = e.pageY;
                if ( startX != -1 ) {
                    let delta = endX - startX;
                    if ( Math.abs( delta ) > 100 ) {
                        let routeId = MouseNavigation.routes.indexOf( this.props.location.pathname );
                        let nextRouteId = routeId;
                        nextRouteId = ( delta > 0 ) ? --routeId : ++routeId;
                        this.redirect( nextRouteId );
                    }
                }
                startX = -1;
            }, false );
            element.addEventListener( 'touchmove', ( e ) => {
                e.preventDefault();
            });
            element.addEventListener( 'touchstart', ( e ) => {
                var touch = e.touches[ 0 ] || e.changedTouches[ 0 ];
                startX = touch.pageY;
            }, false );
            element.addEventListener( 'touchend', ( e ) => {
                var touch = e.touches[ 0 ] || e.changedTouches[ 0 ];
                endX = touch.pageY;
                if ( startX != -1 ) {
                    let delta = endX - startX;
                    if ( Math.abs( delta ) > 100 ) {
                        let routeId = MouseNavigation.routes.indexOf( this.props.location.pathname );
                        let nextRouteId = routeId;
                        nextRouteId = ( delta > 0 ) ? --routeId : ++routeId;
                        this.redirect( nextRouteId );
                    }
                }
                startX = -1;
            }, false );
        }
    }

    render() {
        return (
            <div className={classNames( MouseNavigation.wrapperId, styles.backLining )} id={MouseNavigation.wrapperId}>
                {this.props.children}
            </div>
        );
    }
}

export default withRouter( MouseNavigation );
