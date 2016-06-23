$( document ).ready(function() {
    angular.bootstrap(document, ['footbel']);

    Reveal.initialize({
        controls: false,
        progress: false,
        history: false,
        center: true,
        loop: true,
        shuffle: true,
        autoSlide: 5000,
        viewDistance: 2,

        theme: Reveal.getQueryHash().theme, // available themes are in /css/theme
        transition: Reveal.getQueryHash().transition || 'default', // default/cube/page/concave/zoom/linear/fade/none

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