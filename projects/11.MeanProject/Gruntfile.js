module.exports = function(grunt){

    // configuration
    grunt.initConfig({
        concat:{
            js:{
                src: ["./angular/*.js", "./angular/controllers/*.js"],
                dest: "./angular/min-js/script-concat.js"
            }
        },
        
        uglify: {
            build: {
                files: {"./angular/min-js/script-min.js" : "./angular/min-js/script-concat.js"}
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");

    grunt.registerTask("ugly", ["concat", "uglify"]);


}