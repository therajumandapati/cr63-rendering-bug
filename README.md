The index-with-bug.html file links to the GSAP animation defined in animation-with-bug.js

We believe that the issue lies in the function `rotationRevealTl`:

```
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
.to('.rect.left.top', s.rotationSpeed + 0.2, { skewX: 90, ease: Power2.easeIn })
.set('.rect.left.top', { opacity: 0 })
.to('.rect.left.bottom', s.rotationSpeed, { skewY: -90, ease: Linear.easeNone })
.set('.rect.left.bottom', { opacity: 0 })
.to('.rect.right.bottom', s.rotationSpeed, { skewX: 90, ease: Linear.easeNone })
.set('.rect.right.bottom', { opacity: 0 })
.to('.rect.right.top', s.rotationSpeed + 0.5, { skewY: -90, ease: Power2.easeOut })
.set('.rect.right.top', { opacity: 0 })
.set(['.bg-rotate-reveal'], { display: 'none' });
return tlCircle;
```

Notice the `Power2.easeIn`. 

The index-fixed.html file links to the animation defined in animation-fixed.js

The only change to this function is we replaced `Power2.easeIn` with `Linear.easeNone`. 

In any case, this bug only happens in Chrome 63 and Chrome 64 Dev. It's been fine all the way upto Chrome 62. 