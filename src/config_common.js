var path = require('path');

module.exports = {
    clean: {
        common: {
            files: [{
                expand: true,
                cwd: './<%=dist%>',
                src: '**/*.*'
            }]
        }
    },
    copy: {
        //copy files to output directory
        totemp: {
            files: [{
                expand: true,
                cwd: './',
                src: '{lib,src,test}/**/*.*',
                dest: './<%=dist%>/temp/<%=path%>'
            }]
        },
        tobuild: {
            files: [{
                expand: true,
                cwd: './<%=dist%>/temp/<%=path%>',
                src: [
                    '**/*.js',
                    '!<%=widget%>/*/**/main.js',
                    '**/*.{css,html,json,png,jpg,gif,cur,swf}'
                ],
                dest: './<%=dist%>/build/static/<%=path%>'
            }, {
                expand: true,
                cwd: './<%=dist%>/temp/<%=path%>/src',
                src: 'tpl/**/*.*',
                dest: './<%=dist%>/build/tpl/<%=path%>'
            }]
        },
        towebroot: {
            files: [{
                expand: true,
                cwd: './<%=dist%>/build',
                src: [
                    '**/*.*'
                ],
                dest: '<%=serverbase%>'
            }]
        }
    },
    //compile .less file to .css
    less: {
        common: {
            files: [{
                expand: true,
                cwd: './<%=dist%>/temp/<%=path%>',
                src: '**/*.less',
                dest: './<%=dist%>/temp/<%=path%>',
                ext: '.css',
                extDot: 'last'
            }]
        }
    },

    //css lint
    csslint: {
        common: {
            options: {
                'compatible-vendor-prefixes': false,
                'universal-selector': false,
                'vendor-prefix': false,
                'box-model': false,
                'display-property-grouping': false,
                'fallback-colors': false,
                'box-sizing': false,
                'outline-none': false,
                'ids': false,
                'adjoining-classes': false,
                'font-sizes': false,
                'duplicate-background-images': false,
                'floats': false
            },
            files: [{
                expand: true,
                cwd: './<%=dist%>/temp/<%=path%>',
                src: '**/*.css'
            }]
        }
    },

    //http upload
    'wow-httpupload': {
        common: {}
    },

    //concat files
    'wow-pack': {
        common: {
            files: [{
                expand: true,
                cwd: './<%=dist%>/build/static/<%=path%>',
                src: []
            }]
        }
    },

    //generate file md5
    'wow-md5': {
        common: {
            files: [{
                expand: true,
                cwd: './<%=dist%>/build',
                src: '**/*.{js,png,gif,jpg,less,css,ico}',
                dest: './<%=dist%>/build'
            }]
        }
    },

    //js hint
    jshint: {
        common: {
            options: {
                browser: true,
                curly: true, //����ʹ�ô����Ű���
                newcap: true, //����ĸ��д�ĺ�����ʹ��new����
                noarg: true, //���� arguments.callee & arguments.caller
                boss: true, //��ֹ���磺if(a=1){}�����ı��ʽ
                es3: true, //֧��es3
                camelcase: false, //ǿ���շ�����
                forin: false, //ǿ��for in  ����hasOwnProperty�ж�
                quotmark: 'single', //ǿ�Ƶ�����
                maxparams: 6, //���ò�������
                asi: true,
                loopfunc: true,
                shadow: true
            },
            files: [{
                expand: true,
                cwd: './',
                src: 'src/**/*.js'
            }]
        }
    },

    //add amd wrap
    'wow-wrap': {
        widget: {
            options: {
                isWidget: true
            },
            files: [{
                expand: true,
                cwd: './<%=dist%>/temp/<%=path%>',
                src: [
                    'src/widget/**/main.js'
                ],
                dest: './<%=dist%>/temp/<%=path%>'
            }]
        },
        common: {
            files: [{
                expand: true,
                cwd: './<%=dist%>/temp/<%=path%>',
                src: [
                    'src/widget/*/*.js',
                    'src/js/handler/**/*.js',
                    'src/js/dt/**/*.js'
                ],
                dest: './<%=dist%>/temp/<%=path%>'
            }]
        }
    },

    'wow-spg': {
        common: {
            options: {
                base: './<%=dist%>/temp/',
                dist: './<%=dist%>/temp/<%=path%>/src/dust',
                target: './<%=dist%>/temp/<%=path%>/src/js/router.js',
                isDeleteSource: true
            }
        }
    },

    'wow-httpserver': {
        common: {
            options: {
                base: '../webroot',
                entrance: './tpl/common/tpl/layout.tpl'
            }
        }
    },

    'wow-urlmap': {
        common: {
            options: {
                mapOption: 'online'
            }, 
            files: [{
                expand: true,
                cwd: './<%=dist%>/temp/',
                src: [
                    '**/*.*'
                ],
                dest: './<%=dist%>/build'
            }]
        }
    },

    'wow-urlfix': {
        tplPreFix: {
            options: {
                type: 'tpl'
            },
            files: [{
                expand: true,
                cwd: './<%=dist%>/temp',
                src: './<%=path%>/**/*.dust',
                dest: './<%=dist%>/temp'
            }]
        },
        html: {
            options: {
                type: 'html'
            },
            files: [{
                expand: true,
                cwd: './<%=dist%>/build/',
                src: 'tpl/<%=path%>/**/*.*',
                dest: './<%=dist%>/build'
            }]
        },
        css: {
            options: {
                type: 'css'
            },
            files: [{
                expand: true,
                cwd: './<%=dist%>/build/',
                src: 'static/<%=path%>/**/*.css',
                dest: './<%=dist%>/build'
            }]
        },
        js: {
            options: {
                type: 'js'
            },
            files: [{
                expand: true,
                cwd: './<%=dist%>/build/',
                src: 'static/<%=path%>/**/*.js',
                dest: './<%=dist%>/build'
            }]
        }
    },

    //generate the rewrite config file
    'wow-rewrite': {
        common: {
            options: {
            }
        }
    },

    'wow-requiremap': {
        common: {
            options: {
                target: './<%=dist%>/build/tpl/<%=path%>/conf/require_map.js'
            }
        }
    },

    'wow-addrequiremap': {
        common: {
            options: {
                isSetBase: false
            }
        }
    },

    //js compress
    uglify: {
        options: {
            mangle: {
                except: ['require', 'module', 'exports']
            }
        },
        common: {
            files: [{
                expand: true,
                cwd: './<%=dist%>/build/static/<%=path%>',
                src: '**/*.js',
                dest: './<%=dist%>/build/static/<%=path%>'
            }]
        }
    },

    //css compress
    cssmin: {
        common: {
            files: [{
                expand: true,
                cwd: './<%=dist%>/build/static/<%=path%>',
                src: '**/*.css',
                dest: './<%=dist%>/build/static/<%=path%>'
            }]
        }
    },

    //html compress
    htmlmin: {
        options: {
            removeComments: true,
            collapseWhitespace: true,
            minifyJS: true,
            minifyCSS: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
        },
        common: {
            files: [{
                expand: true,
                cwd: './<%=dist%>/build/',
                src: '**/*.{tpl,html}',
                dest: './<%=dist%>/build/'
            }]
        }
    },

    //dust complie
    dust: {
        common: {
            options: {
                relative: './<%=dist%>/temp',
                wrapperOptions: {
                    templatesNamesGenerator: function(dustInfo, outputName){
                        var sepReg = new RegExp(path.sep.replace(/\\/g, '\\\\'), 'g');
                        var realPath = path.relative(dustInfo.relative, outputName);
                        var baseName = path.basename(realPath, path.extname(realPath));
                        var amdId = path.join(path.dirname(realPath), baseName).replace(sepReg, '/');
                        
                        return amdId;
                    }
                },
                runtime: false
            },
            files: [{
                expand: true,
                cwd: './<%=dist%>/temp/<%=path%>',
                src: 'src/**/*.dust',
                dest: './<%=dist%>/temp/<%=path%>',
                ext: '.js',
                extDot: 'last'
            }]
        }
    },

    //string replace
    'string-replace': {
        common: {}
    },

    //watch file
    watch: {
        options: {
            livereload: true,
            spawn: false
        },
        common: {
            files: '**/*'
        }
    }
};