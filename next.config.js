require("dotenv").config();

const path = require("path");
const Dotenv = require("dotenv-webpack");
const withLess = require('@zeit/next-less');
const lessToJS = require("less-vars-to-js");
const fs = require("fs");

const theme = lessToJS(
    fs.readFileSync(path.resolve(__dirname, "./assets/theme.less"), "utf8")
);

module.exports = withLess({
    lessLoaderOptions: {
        javascriptEnabled: true,
        modifyVars: theme,
    },
    webpack:  (config, { isServer }) => {
        if (isServer) {
            const antStyles = /antd\/.*?\/style.*?/;
            const origExternals = [...config.externals];
            config.externals = [
                (context, request, callback) => {
                    if (request.match(antStyles)) return callback();
                    if (typeof origExternals[0] === 'function') {
                        origExternals[0](context, request, callback)
                    } else {
                        callback()
                    }
                },
                ...(typeof origExternals[0] === 'function' ? [] : origExternals),
            ];

            config.module.rules.unshift({
                test: antStyles,
                use: 'null-loader',
            })
        }

        config.plugins = config.plugins || [];
        config.plugins = [
            ...config.plugins,

            // Read the .env file
            new Dotenv({
                path: path.join(__dirname, ".env"),
                systemvars: true
            })
        ];

        return config;
    }
});
