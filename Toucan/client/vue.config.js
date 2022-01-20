const path = require('path');

module.exports = {
    outputDir: path.resolve(__dirname, '../server/public'), // __dirname is the name of the directory a command is being called from (when we run 'npm run build' it runs from client folder, so __dirname = client).
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8080'
            }
        }
    }
}