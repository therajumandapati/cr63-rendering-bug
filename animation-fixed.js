(function ($) {
  'use strict';
  var s, BA = {
      init: function () {
          s = this.settings;
          CSSPlugin.defaultSkewType = "simple";
          TweenLite.set('.box-voggle', { transformOrigin: '50% 50%', autoAlpha: 1 });
          TweenLite.set(['.content-slides>div'], { perspective: 600 });
          TweenLite.set('.paper-planes', { perspective: 600 });
          TweenLite.set('.paper-plane-2', { transformOrigin: '100% 50%', smoothOrigin: true });
          TweenLite.set('.paper-plane-3', { smoothOrigin: true, z: 100, y: '+=50%', transformOrigin: '0% 0%', rotationX: 45 });
          // Calling main animation
          this.MainAnimation();
      },
      settings: {
          rotationSpeed: 0.1,
          bgColor: '#0198ff'
      },

      // Rotation reveal timeline
      rotationRevealTl: function () {
          var tlCircle = new TimelineLite()
          .staggerTo('.rect', 0, {
              cycle: {
                  transformOrigin: [
                      '100% 100%',
                      '100% 0%',
                      '0% 0%',
                      '0% 100%'
                  ]
              }
          }, 0)
          .to('.rect.left.top', s.rotationSpeed + 0.2, { skewX: 90, ease: Linear.easeNone })
          .set('.rect.left.top', { opacity: 0 })
          .to('.rect.left.bottom', s.rotationSpeed, { skewY: -90, ease: Linear.easeNone })
          .set('.rect.left.bottom', { opacity: 0 })
          .to('.rect.right.bottom', s.rotationSpeed, { skewX: 90, ease: Linear.easeNone })
          .set('.rect.right.bottom', { opacity: 0 })
          .to('.rect.right.top', s.rotationSpeed + 0.3, { skewY: -90, ease: Linear.easeNone })
          .set('.rect.right.top', { opacity: 0 })
          .set(['.bg-rotate-reveal'], { display: 'none' });
          return tlCircle;
      },

      // voggle box slide 1 animation
      slide1Tl: function () {
          var slide1Tl = new TimelineLite();
          var path1 = 'M118.8 89.8h287v287h-287z';
          var pathArrow = 'M465.3 233.3l-203 203-202.9-203h202.9z';
          slide1Tl.from('.box-voggle', 0.2, {
              scale: 0,
              ease: Linear.easeNone
          })
          .to('.box-voggle', 0.8, {
              morphSVG: {
                  shape: 'M118.8 89.8h287v287h-287z'
              },
              ease: Elastic.easeOut.config(1, 0.3)
          }, 0.1)
          .to('.box-voggle', 0.2, {
              rotation: -45,
              ease: Linear.easeNone
          }, 0.6)
          .set('.arrow-down', { autoAlpha: 1 })
          .to('.arrow-down', 0.3, {
              morphSVG: {
                  shape: pathArrow
              },
              ease: Back.easeOut.config(2)
          })
          .to('.content-slides .slide-1', 0.3, {
              autoAlpha: 0,
              scale: 0,
              delay: 0.2,
              transformOrigin: '50% 50%'
          });
          return slide1Tl;
      },
      // Logo slide 2 animation
      slide2Tl: function () {
          var slide2Tl = new TimelineLite();
          slide2Tl.to('.content-slides .slide-2', 0.1, { autoAlpha: 1 })
          .from('.logo-box', 0.3, {
              autoAlpha: 0,
              z: -200
          })
          .fromTo('.logo-pattern-box', 1.5, {

              z: -500
          }, {
              z: 200
          }, 0)
          .staggerFrom('.logo-pattern-box path', 0.5, {
              scale: 0,
              cycle: {
                  y: [10, -10]
              }
          }, 0.2, 0)
          .to('.content-slides .slide-2', 0.3, {
              autoAlpha: 0,
          });
          return slide2Tl;
      },
      slide3Tl: function () {
          var slide3Tl = new TimelineLite();
          slide3Tl.to('.slide-3', 1, { autoAlpha: 1 });
          return slide3Tl;
      },
      arrow1Animations: function () {
          var arrow2dur = 2;
          if (window.innerWidth <= 768) {
              arrow2dur = 1;
          }
          var arrowTl = new TimelineLite();

          arrowTl.to('.arrow-swipe-1', 0.8, {
              x: '100%',
              ease: Linear.easeNone
          })
          .to('.arrow-swipe-2', arrow2dur, {
              x: '100%',
              ease: Linear.easeNone
          }, 'swipe-2')
          .set('.animation-canvas', {
              backgroundColor: s.bgColor
          }, 'swipe-2+=1.5')
          .set(['.arrow-swipe-1', '.arrow-swipe-2'], { display: 'none' });

          return arrowTl;

      },

      // Small plane move
      paperPlanes: function () {
          var flyPathDesk1 = [
              { x: -window.innerWidth / 5, y: -100 },
              { x: -(window.innerWidth / 2 + 50), y: 0 }

          ];
          var flyPathDesk2 = [
              { x: '-=100', y: '+=50', z: 200 },
              { x: '-=200', y: '-=20', z: 400 },
              { x: -(window.innerWidth - 500), y: '+=100', z: 600 }
          ];
          if (window.innerWidth < 993) {
              flyPathDesk1 = [
                  { x: -window.innerWidth / 3, y: -50 },
                  { x: -(window.innerWidth / 2 + 50), y: 0 }

              ];
              flyPathDesk2 = [
                  { x: '-=100', y: '+=10', z: 200 },
                  { x: '-=200', y: '-=20', z: 400 },
                  { x: -window.innerWidth, y: '+=100', z: 600 }
              ];

          }
          if (window.innerWidth < 568) {
              flyPathDesk1 = [
                  { x: -150, y: -50 },
                  { x: -250, y: 0 }

              ];
              flyPathDesk2 = [
                  { x: '-=50', y: '+=10', z: 200 },
                  { x: '-=100', y: '-=10', z: 400 },
                  { x: -window.innerWidth, y: '+=50', z: 600 }
              ];

          }
          var paperTl = new TimelineLite()
          paperTl.to('.paper-plane-1', 0.2, { autoAlpha: 1 })
              .to('.paper-plane-1', 0.5, { right: -120, bottom: '30%' }, 0)
              .to('.paper-plane-2', 1, {
                  bezier: {
                      type: 'thru',
                      curviness: 1,
                      values: flyPathDesk1,
                      autoRotate: ['x', 'y', 'rotation', -190, false]
                  },

                  ease: SlowMo.ease.config(0.1, 0.1, false),
              })
              .to('.paper-plane-2', 1, {


                  rotationZ: 0,
                  bezier: {
                      curviness: 1,

                      values: flyPathDesk2,
                  },
                  ease: SlowMo.ease.config(0.1, 0.3, false),
              }, 'start-change');

          var planeStart = document.querySelectorAll('#plane-start>path');
          var planeFinish = document.querySelectorAll('.plane-finish');
          var time = 0;
          for (var i = 0; i < planeFinish.length; i++) {
              var finishPaths = planeFinish[i].querySelectorAll('path');

              for (var j = 0; j < planeStart.length; j++) {

                  paperTl.to(planeStart[j], 0.2, {
                      morphSVG: {
                          shape: finishPaths[j]
                      },

                      ease: Linear.easeNone
                  }, 'start-change+=' + time)
              }

              time += 0.2;
          }
          paperTl.to('.paper-plane-3', 1.5, {
              bezier: {
                  curviness: 3,
                  values: [
                      //{x : '+=0' , y : '+=0', z : '+=0'},
                      {
                          x: window.innerWidth + document.querySelector('.paper-plane-3').clientWidth
                          , y: '-30%', z: 100
                      },
                  ]
              },
              rotationX: 0,
              rotationZ: -20,
              ease: Circ.easeOut
          }, 'paper-plane-final')
              .to('#plane-body', 1, {
                  morphSVG: {
                      shape: '#plane-body-rotation'
                  }
              }, 'paper-plane-final-=0.2')
              .to('.paper-plane-3 .shade', 0.2, {
                  x: 50,
                  y: -60,
                  autoAlpha: 0
              }, 'paper-plane-final+=0.1')
              .to('.paper-plane-3 .shade-rotation', 1, {
                  autoAlpha: 1
              }, 'paper-plane-final+=0.1');

          return paperTl;
      },
      // Adding to main animation timeline
      MainAnimation: function () {
          var MainTl = new TimelineLite({
              delay: 0.5, onComplete: function () {
                  document.querySelector('.paper-planes').remove();
                  document.body.classList.add('banner-animation-done');
              }
          });
          MainTl.add(this.slide1Tl())
              .add(this.slide2Tl())
              .add(this.rotationRevealTl(), 0.4)
              .add(this.arrow1Animations(), 1.5)
              .add('planeAnimation')
              .add(this.paperPlanes(), 3.2)
              .add(this.slide3Tl(), 'planeAnimation+=1.5');
      }
  };
  $(document).ready(function () {
      BA.init();
  });
})(jQuery);