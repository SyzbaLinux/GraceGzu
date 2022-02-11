const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */
//
mix.js('resources/frontend/src/main.js', 'public/js')
    .vue()
    .version()


mix.options({
    devServer: {
        host: 'http://127.0.0.1',
        port: 8000,
    },
});



