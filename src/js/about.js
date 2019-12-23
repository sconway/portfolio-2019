// (function () {
//     let deviceWidth = window.innerWidth,
//         controller = new ScrollMagic.Controller();

//     function getBarWidth() {
//         if (deviceWidth > 900) {
//             return 600;
//         } else if (deviceWidth > 600) {
//             return 420;
//         } else if (deviceWidth > 330) {
//             return 250;
//         } else {
//             return 200;
//         }
//     }

//     function addTween(tween, offset, duration) {
//         new ScrollMagic.Scene({
//             triggerElement: "#graphTrigger",
//             duration: duration,
//             offset: offset
//         })
//             .setTween(tween)
//             .addTo(controller);
//     }

//     function createCounterTween(number, element) {
//         let counter = { var: 0 };
//         const el = document.getElementById(element);

//         return TweenMax.to(counter, 5, {
//             var: number,
//             onUpdate: function () {
//                 el.innerHTML = Math.ceil(counter.var);
//             },
//             // ease: Circ.easeOut
//         });
//     }

//     function createGrowTween(item, width) {
//         return TweenMax.to(item, 1, { width: width });
//     }

//     function createFadeTween(item) {
//         return TweenMax.to(item, 1, { opacity: 1 })
//     }

//     function addGraphTweens() {
//         // HTML
//         addTween(createGrowTween("#htmlBar", getBarWidth() * 0.8), 0, 200);
//         addTween(createCounterTween(80, "htmlPercentage"), 0, 200);
//         addTween(createFadeTween("#htmlBarWrapper"), -20, 100);
//         // CSS
//         addTween(createGrowTween("#cssBar", getBarWidth() * 0.9), 50, 200);
//         addTween(createCounterTween(90, "cssPercentage"), 50, 200);
//         addTween(createFadeTween("#cssBarWrapper"), 30, 100);
//         // JS
//         addTween(createGrowTween("#jsBar", getBarWidth() * 0.9), 100, 200);
//         addTween(createCounterTween(90, "jsPercentage"), 100, 200);
//         addTween(createFadeTween("#jsBarWrapper"), 80, 100);
//         // REACT
//         addTween(createGrowTween("#reactBar", getBarWidth() * 0.95), 140, 200);
//         addTween(createCounterTween(95, "reactPercentage"), 140, 200);
//         addTween(createFadeTween("#reactBarWrapper"), 120, 100);
//         // REACT NATIVE
//         addTween(createGrowTween("#rnBar", getBarWidth() * 0.9), 180, 200);
//         addTween(createCounterTween(90, "rnPercentage"), 180, 200);
//         addTween(createFadeTween("#rnBarWrapper"), 160, 100);
//         // NODE
//         addTween(createGrowTween("#nodeBar", getBarWidth() * 0.6), 210, 200);
//         addTween(createCounterTween(60, "nodePercentage"), 210, 200);
//         addTween(createFadeTween("#nodeBarWrapper"), 190, 100);
//         // NEXTJS
//         addTween(createGrowTween("#nextBar", getBarWidth() * 0.7), 240, 200);
//         addTween(createCounterTween(70, "nextPercentage"), 240, 200);
//         addTween(createFadeTween("#nextBarWrapper"), 220, 100);
//         // GRAPHQL
//         addTween(createGrowTween("#graphqlBar", getBarWidth() * 0.6), 270, 200);
//         addTween(createCounterTween(60, "graphqlPercentage"), 270, 200);
//         addTween(createFadeTween("#graphqlBarWrapper"), 240, 100);
//         // AWS
//         addTween(createGrowTween("#awsBar", getBarWidth() * 0.5), 300, 200);
//         addTween(createCounterTween(50, "awsPercentage"), 300, 200);
//         addTween(createFadeTween("#awsBarWrapper"), 280, 100);

//     }

//     addGraphTweens();
// })();