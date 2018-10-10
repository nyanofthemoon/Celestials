module.exports = {
    plugins: ['react-hot-loader/babel', '@babel/plugin-proposal-class-properties'],
    presets: [
        ['@babel/env', {'targets': {'browsers': ['last 2 versions', 'safari >= 7']}}],
        '@babel/preset-react'
    ]
}
