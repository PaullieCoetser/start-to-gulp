export function htmlCompileAdvanced(gulp, plugins) {
  return () => {
    gulp.src('../app/**/*.html')
      .pipe(plugins.useref({ searchPath: '{.tmp,app}' }))
      // Remove any unused CSS
      .pipe(plugins.if('*.css', uncss({
        html: [
          'app/index.html'
        ],
        // CSS Selectors for UnCSS to ignore
        ignore: []
      })))
      // Concatenate and minify styles
      // In case you are still using useref build blocks
      .pipe(plugins.if('*.css', cssnano()))
      // Minify any HTML
      .pipe(plugins.if('*.html', htmlmin({
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        removeOptionalTags: true
      })))
      // Output files
      .pipe(plugins.if('*.html', size({ title: 'html', showFiles: true })))
      .pipe(gulp.dest('dist'));
  };
};

