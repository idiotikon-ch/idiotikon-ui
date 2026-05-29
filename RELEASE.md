# Release workflow

This guide covers releasing new versions of `@idiotikon/ui`.

## Prerequisites

1. Install `standard-version` as a dev dependency:
   ```bash
   npm install --save-dev standard-version
   ```

2. Set up NPM token in GitHub (one-time):
   - Go to https://www.npmjs.com/settings/~/tokens/new
   - Select **"Granular access token"**
   - Permissions needed: **"Publish packages and write package settings"** for `@idiotikon` scope
   - **Expiration:** Set to **90 days maximum** (default is only 7 days—change this!)
   - Generate the token, copy it
   - In your GitHub repo: Settings → Secrets and Variables → New repository secret
   - Name: `NPM_TOKEN`, Value: paste the token

3. Ensure GitHub Actions workflow exists: `.github/workflows/publish.yml`

## Release process

### 1. Document changes as you go
Add entries to `CHANGELOG.md` under `## Unreleased` as you make changes:

```markdown
## Unreleased

### Added
- New SearchField prop: `maxSuggestions`

### Fixed
- NavDrawer spacing issue on mobile

### Changed
- Updated Vuetify to 4.0.5
```

### 2. Release (automatic CHANGELOG + version update)

Choose based on your change type:

```bash
# Patch release (0.0.1 → 0.0.2) - bugfixes only
npm run release

# Minor release (0.0.1 → 0.1.0) - new features
npm run release:minor

# Major release (0.0.1 → 1.0.0) - breaking changes
npm run release:major

# Preview changes without committing
npm run release:dry
```

This command automatically:
- bumps `package.json` version
- moves `## Unreleased` → `## [0.1.0] - 2026-05-28` in `CHANGELOG.md`
- creates git commit: "chore(release): 0.1.0"
- creates git tag: `v0.1.0`

### 3. Push & publish

```bash
git push origin main --tags
```

GitHub Actions will automatically detect the tag and:
- build the package
- publish to NPM
- create a GitHub Release page


## Example flow

```bash
# Make changes and commit normally (any message format works)
git commit -m "add new component feature"
git commit -m "fix styling issue"

# Ready to release?
npm run release:minor           # Bumps to 0.1.0, updates CHANGELOG
git push origin main --tags     # GitHub Actions publishes automatically

# Next cycle - more changes
git commit -m "another fix"
npm run release                 # Bumps to 0.1.1
git push origin main --tags
```

## Troubleshooting

**"npm publish" failed in GitHub Action**
- verify `NPM_TOKEN` is set in repo secrets (Settings → Secrets)
- check token has publish permissions to `@idiotikon/ui` scope on npmjs.com

**CHANGELOG didn't update or tag missing**
- run `npm run release:dry` to preview what will happen
- make sure `CHANGELOG.md` file exists

**Want to undo a release?**
```bash
git tag -d v0.1.0              # Delete local tag
git push origin --delete v0.1.0  # Delete remote tag
# Fix any issues, then try releasing again
```
