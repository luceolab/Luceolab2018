import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import styles from './SwingingLogo.css';
import largeLogo from '../../assets/img/homepage-logo-large.png';
import offLamp from '../../assets/img/logo-lamp-off-large.png';
import onLamp from '../../assets/img/logo-lamp-on-large.png';
import logoWithoutLamp from '../../assets/img/logo-without-lamp.png';

let animationTimeout = null;
const MAX_CANVAS_WIDTH = 700;
const MAX_CANVAS_HEIGHT = 300;

const isMobile = () => {
    var check = false;
    if ( process.env.BROWSER ) {
        ( function( a ) {
            if ( /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test( a ) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test( a.substr( 0, 4 ))) {
                let width = ( window.innerWidth > 0 ) ? window.innerWidth : screen.width;
                if ( width < 813 ) {
                    check = true;
                }
            }
        })( navigator.userAgent || navigator.vendor || window.opera );
    }
    return check;
};

class SwingingLogo extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            overlay: true,
            fade: false,
            isAnimation: props.animation,
            canvasWidth: MAX_CANVAS_WIDTH,
            canvasHeight: MAX_CANVAS_HEIGHT,
        };
    }

    componentWillReceiveProps( nextProps ) {
        if ( process.env.BROWSER ) {
            if ( this.props.animation && !nextProps.animation ) {
                clearInterval( animationTimeout );
                this.setState({
                    overlay: false,
                });
                nextProps.onCancelAnimation();

                setTimeout(() => {
                    let height = MAX_CANVAS_HEIGHT;
                    let width = document.getElementById( 'root' ).clientWidth;
                    width = Math.min( width, MAX_CANVAS_WIDTH );

                    if ( isMobile()) {
                    //width = 290;
                        height = document.getElementById( 'root' ).clientHeight * 0.4;
                    }

                    this.setState({
                        canvasWidth: width,
                        canvasHeight: height,
                    });

                    let canvas = document.getElementById( 'canvas' );
                    let context = canvas.getContext( '2d' );

                    let canvasWidth = width;
                    let shiftX = 0;
                    if ( width > 500 && isMobile()) {
                        canvasWidth = 220;
                        shiftX = ( width - 220 ) / 2;
                    }
                    const canvasHeight = height;

                    var imgSymbols = new Image();
                    imgSymbols.src = logoWithoutLamp;
                    imgSymbols.onload = () => {
                        if ( !isMobile()) {
                            context.drawImage(
                            imgSymbols,
                            100,
                            180,
                            357,
                            100
                        );
                        } else {
                            context.drawImage(
                            imgSymbols,
                            shiftX,
                            canvasHeight - canvasWidth * 0.269 - 20,
                            canvasWidth,
                            canvasWidth * 0.269
                        );
                        }
                    };

                /*context.beginPath();
                context.strokeStyle = '#838586';
                context.lineWidth = 2;
                if ( !isMobile()) {
                    context.moveTo( canvasWidth / 2, 0 );
                    context.lineTo( 350, 150 );
                } else {
                    context.moveTo( canvasWidth * 0.699 + shiftX, 0 );
                    context.lineTo( canvasWidth * 0.699 + shiftX, 115 );
                }
                context.closePath();
                context.stroke();

                var img = new Image();
                img.src = onLamp;
                img.onload = () => {
                    if ( !isMobile()) {
                        context.drawImage( img, 290, 150, 120, 143 );
                    } else {
                        context.drawImage( img, 157 + shiftX, 115, 91, 108 );
                    }
                };*/

                    var img = new Image();
                    img.src = onLamp;
                    var isLightingStarted = false;
                    var lightningOpacity = 1;
                    var prev = 0;
                    let render = function( angle, lightOn ) {
                        if ( !isMobile()) {
                            var rPend = canvasHeight / 2;
                        } else {
                            var rPend = canvasHeight - canvasWidth * 0.3  - 30;
                        }

                        var rBall = 80;
                        var rBar = Math.min( canvasWidth, canvasHeight ) * 0.005;
                        var ballX = Math.sin( angle ) * rPend;
                        var ballY = Math.cos( angle ) * rPend;

                        context.fillStyle = 'rgba(255,255,255,0.51)';
                        context.globalCompositeOperation = 'destination-out';
                        context.fillRect( 0, 0, canvasWidth + shiftX * 2, canvasHeight );
                        context.globalCompositeOperation = 'source-over';
                        context.save();

                        context.beginPath();
                        context.strokeStyle = '#838586';
                        context.lineWidth = 2;
                        if ( !isMobile()) {
                            context.moveTo( canvasWidth / 2, 0 );
                            context.lineTo( -ballX + canvasWidth / 2, ballY );
                        } else {
                            context.moveTo( canvasWidth * 0.699 + shiftX, 0 );
                            context.lineTo( -ballX + canvasWidth * 0.699 + shiftX, ballY );
                        }
                        context.closePath();
                        context.stroke();

                        if ( !isMobile()) {
                            context.translate( canvasWidth / 2, 0 );
                        } else {
                            context.translate( canvasWidth * 0.699 + shiftX, 0 );
                        }

                        context.rotate( angle );

                        if ( lightOn && img.src.indexOf( onLamp ) == -1 ) {
                        //img = img2;
                            isLightingStarted = true;
                            that.props.onEnd();
                            that.setState({ fade: true });
                        }

                        img.onload = () => {
                            if ( !isMobile()) {
                                if ( isLightingStarted ) {
                                    context.globalAlpha = 1 - lightningOpacity;
                                }
                                context.drawImage(
                            img,
                            -60,
                            rPend,
                            120,
                            143
                        );
                                if ( isLightingStarted ) {
                                    context.globalAlpha = lightningOpacity;
                                    context.drawImage(
                                img2,
                                -60,
                                rPend,
                                120,
                                143
                            );

                                    if ( lightningOpacity < 1 ) {
                                        lightningOpacity += 0.003;
                                    }
                                }
                            } else {
                                if ( isLightingStarted ) {
                                    context.globalAlpha = 1 - lightningOpacity;
                                }
                                context.drawImage(
                                img,
                                canvasWidth - canvasWidth * 0.46 + shiftX,
                                rPend,
                                canvasWidth * 0.314,
                                canvasWidth * 0.314 * 1.196
                            );

                                if ( isLightingStarted ) {
                                    context.globalAlpha = lightningOpacity;
                                    context.drawImage(
                                img2,
                                -canvasWidth * 0.314 / 2,
                                rPend,
                                canvasWidth * 0.314,
                                canvasWidth * 0.314 * 1.196
                            );
                                    if ( lightningOpacity < 1 ) {
                                        lightningOpacity += 0.003;
                                    }
                                }
                            }
                            context.globalAlpha = 1;
                        };

                        context.restore();
                        prev = angle;
                    };

                    render( 0, true );
                }, 500 );
            }
        }
    }

    componentDidMount() {
        if ( process.env.BROWSER ) {
            var that = this;

            let height = MAX_CANVAS_HEIGHT;
            let width = document.getElementById( 'root' ).clientWidth;
            width = Math.min( width, MAX_CANVAS_WIDTH );

            if ( isMobile()) {
            //width = 290;
                height = document.getElementById( 'root' ).clientHeight * 0.4;
            }

            this.setState({
                canvasWidth: width,
                canvasHeight: height,
            });

            let canvas = document.getElementById( 'canvas' );
            let context = canvas.getContext( '2d' );

            let canvasWidth = width;
            let shiftX = 0;
            if ( width > 500 && isMobile()) {
                canvasWidth = 220;
                shiftX = ( width - 220 ) / 2;
            }
            const canvasHeight = height;

            function PendulumSim( length_m, gravity_mps2, initialAngle_rad, timestep_ms, callback ) {
                var stops = [ -60, 45, -5, -1, 0 ];
                var velocity = 0;
                var angle = initialAngle_rad;
                var k = -gravity_mps2 / length_m;
                var timestep_s = timestep_ms / 1000;
                var zeroCount = 0;
                var lightOn = false;

                var func = function() {
                    var acceleration = k * Math.sin( angle );
                    velocity += acceleration * timestep_s;
                    angle += velocity * timestep_s;
                    var degrees = angle * 180 / Math.PI;
                    degrees = Math.round( degrees % 360 );
                    if ( degrees == stops[ 0 ]) {
                        if ( stops[ 0 ] === 45 ) {
                            lightOn = true;
                        }
                        if ( stops[ 0 ] === 0 ) {
                            zeroCount++;
                        } else {
                            velocity = velocity * 0.65;
                            stops.shift();
                        }
                        if ( zeroCount > 2 ) {
                            var imgLetters = new Image();
                            imgLetters.src = logoWithoutLamp;
                            imgLetters.onload = () => {
                                if ( !isMobile()) {
                                    context.drawImage(
                                    imgLetters,
                                    100,
                                    180,
                                    357,
                                    100
                                );
                                } else {
                                    context.drawImage(
                                    imgLetters,
                                    shiftX,
                                    canvasHeight - canvasWidth * 0.269 - 20,
                                    canvasWidth,
                                    canvasWidth * 0.269
                                );
                                }
                                that.setState({ overlay: false });
                            };
                            clearInterval( refreshIntervalId );
                        }
                    }
                    window.requestAnimFrame( function() {
                        callback( angle, lightOn );
                    });
                };

                window.requestAnimFrame = ( function( func ) {
                    return window.requestAnimationFrame ||
              window.webkitRequestAnimationFrame ||
              function( func ) {
                  func();
              };
                })();

                var refreshIntervalId = setInterval(() => {
                    window.requestAnimFrame( function() {
                        func();
                    });
                }, 10 );

                return refreshIntervalId;
            }

            var img = new Image();
            img.src = offLamp;
            var img2 = new Image();
            img2.src = onLamp;
            var prev = 0;
            var isLightingStarted = false;
            var lightningOpacity = 0.01;

            let render = function( angle, lightOn ) {
                if ( !isMobile()) {
                    var rPend = canvasHeight / 2;
                } else {
                    var rPend = canvasHeight - canvasWidth * 0.3  - 30;
                }

                var rBall = 80;
                var rBar = Math.min( canvasWidth, canvasHeight ) * 0.005;
                var ballX = Math.sin( angle ) * rPend;
                var ballY = Math.cos( angle ) * rPend;

                context.fillStyle = 'rgba(255,255,255,0.51)';
                context.globalCompositeOperation = 'destination-out';
                context.fillRect( 0, 0, canvasWidth + shiftX * 2, canvasHeight );
                context.globalCompositeOperation = 'source-over';
                context.save();

                context.beginPath();
                context.strokeStyle = '#838586';
                context.lineWidth = 2;
                if ( !isMobile()) {
                    context.moveTo( canvasWidth / 2, 0 );
                    context.lineTo( -ballX + canvasWidth / 2, ballY );
                } else {
                    context.moveTo( canvasWidth * 0.699 + shiftX, 0 );
                    context.lineTo( -ballX + canvasWidth * 0.699 + shiftX, ballY );
                }
                context.closePath();
                context.stroke();

                if ( !isMobile()) {
                    context.translate( canvasWidth / 2, 0 );
                } else {
                    context.translate( canvasWidth * 0.699 + shiftX, 0 );
                }

                context.rotate( angle );

                if ( lightOn && img.src.indexOf( onLamp ) == -1 ) {
                //img = img2;
                    isLightingStarted = true;
                    that.props.onEnd();
                    that.setState({ fade: true });
                }

                if ( !isMobile()) {
                    if ( isLightingStarted ) {
                        context.globalAlpha = 1 - lightningOpacity;
                    }
                    context.drawImage(
                    img,
                    -60,
                    rPend,
                    120,
                    143
                );
                    if ( isLightingStarted ) {
                        context.globalAlpha = lightningOpacity;
                        context.drawImage(
                        img2,
                        -60,
                        rPend,
                        120,
                        143
                    );

                        if ( lightningOpacity < 1 ) {
                            lightningOpacity += 0.003;
                        }
                    }
                } else {
                    if ( isLightingStarted ) {
                        context.globalAlpha = 1 - lightningOpacity;
                    }
                    context.drawImage(
                    img,
                    -canvasWidth * 0.314 / 2,
                    rPend,
                    canvasWidth * 0.314,
                    canvasWidth * 0.314 * 1.196
                );

                    if ( isLightingStarted ) {
                        context.globalAlpha = lightningOpacity;
                        context.drawImage(
                        img2,
                        -canvasWidth * 0.314 / 2,
                        rPend,
                        canvasWidth * 0.314,
                        canvasWidth * 0.314 * 1.196
                    );
                        if ( lightningOpacity < 1 ) {
                            lightningOpacity += 0.003;
                        }
                    }
                }
                context.globalAlpha = 1;

                context.restore();
                prev = angle;
            };

            animationTimeout = setTimeout(() => {
                var sim = PendulumSim( 2, 5, Math.PI * 70 / 100, 10, render );
            }, 1000 );

            setTimeout(() => {
                isLightingStarted = true;
                this.setState({ fade: true });
            }, 2700 );

        /*
        animationTimeout = setTimeout(() => {
            //var sim = PendulumSim( 2, 5, Math.PI * 70 / 100, 10, render );
            // instantiate new Animation object
            var anim = new Animation( 'canvas' );
            var context = anim.getContext();
            var canvas = anim.getCanvas();
            var img = new Image();
            img.src = offLamp;

            var amplitude = -Math.PI * 0.6;
            var period = 4000;
            var theta = 0;
            var pendulumLength = 150;
            var pendulumWidth = 2;
            var rotationPointX = canvas.width / 2;
            var rotationPointY = 0;

            anim.setStage( function() {
                theta = ( amplitude * Math.sin(( 2 * Math.PI * this.getTime()) / period )) + Math.PI / 2;
                this.clear();

                context.beginPath();
                var endPointX = rotationPointX + ( pendulumLength * Math.cos( theta ));
                var endPointY = rotationPointY + ( pendulumLength * Math.sin( theta ));
                context.beginPath();
                context.moveTo( rotationPointX, rotationPointY );
                context.lineTo( endPointX, endPointY );
                context.lineWidth = pendulumWidth;
                context.strokeStyle = '#838586';
                context.stroke();

                context.translate( endPointX, endPointY );
                context.rotate( theta - Math.PI / 2 );
                context.drawImage(
                    img,
                    -60,
                    0,
                    120,
                    143
                );
                context.rotate( -theta + Math.PI / 2 );
                context.translate( -endPointX, -endPointY );
            });
            anim.start();
        }, 1000 );*/
        }
    }

    render() {
        const { canvasWidth, canvasHeight } = this.state;
        return (
            <div style={{ display: 'flex' }}>
                <canvas id="canvas" className={styles.canvas} width={canvasWidth} height={canvasHeight} />
                {( this.state.overlay ) && <div className={classNames( 'overlay', { fade: this.state.fade })} />}
            </div>
        );
    }
}

export default SwingingLogo;
