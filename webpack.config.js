const path = require('path');

module.exports = {
    "entry": './src/index.ts',
    "devtool": 'inline-source-map',
    "devServer": {
        "static": {
            "directory": path.resolve(__dirname),
        },
        "compress": true,
        "port": 9000,
    },
    "module": {
        "rules": [
            {
                "test": /\.tsx?$/,
                "use": 'ts-loader',
                "exclude": /node_modules/,
            },
        ],
    },
    "resolve": {
        "extensions": ['.tsx', '.ts', '.js'],
    },
    "output": {
        "filename": 'bundle.js',
        "path": path.resolve(__dirname, 'dist'),
    },
};
