const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const globImporter = require("node-sass-glob-importer");

const path = require("path");
const glob = require("glob");

const jsPath = "./assets/js";
const cssPath = "./assets/scss";
const imgsPath = "./assets/imgs/*";
const iconsPath = "./assets/icons/*";
const outputPath = "./dist";
const localDomain = "http://localhost";
const entryPoints = {
    index: jsPath + "/index.js",
    style: cssPath + "/main.scss",
};
const iconsEntry = glob.sync(iconsPath).reduce(function (obj, el) {
    obj[path.parse(el).name] = el;
    return obj;
}, {});
const imgsEntry = glob.sync(imgsPath).reduce(function (obj, el) {
    obj[path.parse(el).name] = el;
    return obj;
}, {});

module.exports = {
    entry: {
        ...entryPoints,
        ...imgsEntry,
        ...iconsEntry,
    },
    output: {
        path: path.resolve(__dirname, outputPath),
        filename: "[name].js",
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
        new BrowserSyncPlugin(
            {
                proxy: localDomain,
                files: [outputPath + "/*.css"],
                injectCss: true,
            },
            { reload: false }
        ),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            sassOptions: {
                                importer: globImporter(),
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loader: "file-loader",
                options: {
                    name: "/imgs/[name].[ext]",
                },
            },
            {
                test: /\.(svg)$/i,
                loader: "file-loader",
                options: {
                    name: "/icons/[name].[ext]",
                },
            },
        ],
    },
};
