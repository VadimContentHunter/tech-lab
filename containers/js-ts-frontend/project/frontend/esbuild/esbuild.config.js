import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build, context } from 'esbuild';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isWatch = process.argv.includes('--watch');

const htmlTemplate = path.resolve(__dirname, '../src/index.html');
const htmlOutput = path.resolve(__dirname, '../dist/index.html');

const buildOptions = {
    entryPoints: [path.resolve(__dirname, '../src/main.ts')],
    bundle: true,
    sourcemap: true,
    outfile: path.resolve(__dirname, '../dist/esbuild.bundle.js'),
    platform: 'browser',
    format: 'esm',
    target: 'es2024',
};

async function generateHtml() {
    const html = await fs.readFile(htmlTemplate, 'utf8');
    const result = html.replace('</head>', '    <script type="module" src="esbuild.bundle.js"></script>\n</head>');
    await fs.writeFile(htmlOutput, result);
}

if (isWatch) {
    const ctx = await context(buildOptions);

    await ctx.watch();
    await generateHtml();

    console.log('esbuild is watching for changes...');
} else {
    await build(buildOptions);
    await generateHtml();

    console.log('esbuild build completed.');
}
