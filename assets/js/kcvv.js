$( document ).ready(function() {

    angular.bootstrap(document, ['footbel', 'instafeed', 'twitterfeed']);

    Reveal.initialize({
        controls: false,
        progress: true,
        history: false,
        center: false,
        loop: true,
        shuffle: true,
        autoSlide: 10000, // 10 seconds per slide.
        viewDistance: 2,
        width: "100%",
        height: "100%",

        theme: Reveal.getQueryHash().theme, // available themes are in /css/theme
        transition: Reveal.getQueryHash().transition || 'slide', // default/cube/page/concave/zoom/linear/fade/none
        transitionSpeed: 'slow', // default/fast/slow

        // Optional libraries used to extend on reveal.js
        dependencies: [
          { src: 'revealjs/lib/js/classList.js', condition: function() { return !document.body.classList; } },
          { src: 'revealjs/plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
          { src: 'revealjs/plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
          { src: 'revealjs/plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
          { src: 'revealjs/plugin/zoom-js/zoom.js', async: true, condition: function() { return !!document.body.classList; } },
          { src: 'revealjs/plugin/notes/notes.js', async: true, condition: function() { return !!document.body.classList; } }
        ]
      });

});
