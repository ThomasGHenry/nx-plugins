const name = 'nx-python';
const srcRoot = `packages/${name}`;

module.exports = {
  branches: ['main'],
  pkgRoot: `dist/${srcRoot}`,
  tagFormat: `${name}-v\${version}`,
  commitPaths: [`${srcRoot}/src`],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogFile: `${srcRoot}/CHANGELOG.md`,
      }
    ],
    '@semantic-release/npm',
    [
      '@semantic-release/git',
      {
        assets: [`${srcRoot}/CHANGELOG.md`, `${srcRoot}/package.json`],
        message: `chore(release): ${name} v\${nextRelease.version} [skip ci]\n\n\${nextRelease.notes}`,
      }
    ]
  ]
}