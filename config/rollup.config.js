import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
const pkg = require('../package.json')

// relative to project root
const inputFileName = 'src/index.ts'
const outputFileName = pkg.main
const compressedOutputFileName = pkg.main.replace(/\.js$/, '.min.js')
const umdNamespace = 'exportFromJSON'
const umdTSConfig = 'config/tsconfig.umd.json'

const createUMDTemplate = (isMinify = false) => ({
    input: inputFileName,
    output: {
        file: isMinify ? compressedOutputFileName : outputFileName,
        format: 'umd',
        name: umdNamespace,
    },
    plugins: [
        typescript({
            tsconfig: umdTSConfig,
        }),
        isMinify && terser(),
    ].filter(Boolean),
})

const config = [
    createUMDTemplate(false),
    createUMDTemplate(true),
]

export default config
