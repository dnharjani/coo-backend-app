module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-istanbul');

    grunt.initConfig({
        express: {
            test: {
                options: {
                    script: 'server.js'
                }
            }
        },
        mochaTest: {
            unit: {
                    options: {
                        require: [
                            'test/blanket',
                            'test/globals'
                        ],
                        globals: ['expect'],
                        reporter: 'spec',
                        captureFile: 'results.txt', // Optionally capture the reporter output to a file
                        quiet: false, // Optionally suppress output to standard out (defaults to false)
                        clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
                    },
                    src: ['test/unit/**/*.js']
            },
            functional: {
                    options: {
                        require: 'test/blanket',
                        reporter: 'spec',
                        captureFile: 'results.txt', // Optionally capture the reporter output to a file
                        quiet: false, // Optionally suppress output to standard out (defaults to false)
                        clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
                    },
                    src: ['test/functional/**/*.js']
            },
            coverage: {
                options: {
                    reporter: 'html-cov',
                    // use the quiet flag to suppress the mocha console output
                    quiet: true,
                    // specify a destination file to capture the mocha
                    // output (the quiet option does not suppress this)
                    captureFile: 'coverage.html'
                },
                src: ['test/**/*.js']
            },


            // currently turned off cause everything is shit
            'travis-cov': {
                options: {
                    reporter: 'travis-cov'
                },
                src: ['test/**/*.js']
            }
        }
    });
    grunt.registerTask('test', ['mochaTest:unit','express:test', 'mochaTest:functional','mochaTest:coverage','express:test:stop']);
};