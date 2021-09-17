const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const base64InlineLoader = path.join(__dirname, '../index.js');
const outputPath = path.join(__dirname, 'actual');

module.exports = [
    {
        entry: './tests/fixtures/index.css',

        output: {
            path: outputPath,
            clean: true
        },

        module: {
            rules: [
                {
                    test: /\.(png|css|woff)$/,
                    use: [
                        {
                            options: {
                                // limit: 1000
                                typeMapper: {
                                    'image/png': 'mapped/png'
                                }
                            },
                            loader: base64InlineLoader
                        }
                    ]
                },

                {
                    test: /\.css$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader'
                        }
                    ]
                }
            ]
        },

        plugins: [
            new MiniCssExtractPlugin({
                filename: 'index.css'
            })
        ]
    }
];
