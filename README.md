# Sierra Robison Portfolio

Static portfolio site for Sierra Robison, featuring an about page, project gallery, and resume/contact page. The site is designed to deploy directly to GitHub Pages from the repository root. 

## Live URL .

After GitHub Pages is configured and the workflow succeeds, the site should publish at:

`https://sierraliangshu.github.io/website-portfolio/`

## Repository Structure

- `index.html`: Home and About page
- `projects.html`: Filterable project gallery with modal details
- `resume-contact.html`: Resume viewer/download and contact information
- `assets/`: Shared CSS, JavaScript, images, video, and resume files
- `.github/workflows/pages.yml`: GitHub Pages deployment workflow

## Repo Setup

1. Push the repository to GitHub on the `main` branch.
2. Open the repository on GitHub: `sierraliangshu/website-portfolio`.
3. Go to `Settings` > `Pages`.
4. Under `Build and deployment`, set `Source` to `GitHub Actions`.
5. Confirm the workflow file exists at `.github/workflows/pages.yml`.

## How Publishing Works

- Every push to `main` triggers the GitHub Pages workflow.
- The workflow deploys the current repository root as a static site artifact.
- Workflow success in the GitHub Actions tab is the source of truth for publish status.
- The deployed site URL will appear in the `github-pages` environment and Actions run summary.

## Publish Verification

After pushing to `main`, verify the following:

1. The `Deploy static site to GitHub Pages` workflow appears under the `Actions` tab.
2. The workflow completes successfully on the `main` branch.
3. GitHub Pages shows deployment through `GitHub Actions`, not branch deployment.
4. The homepage loads at `https://sierraliangshu.github.io/website-portfolio/`.
5. These direct pages also load:
   - `https://sierraliangshu.github.io/website-portfolio/projects.html`
   - `https://sierraliangshu.github.io/website-portfolio/resume-contact.html`
6. Static assets load correctly:
   - CSS and JavaScript
   - Project images and videos
   - Resume PDF download and embedded viewer
7. Client-side interactions work on the live site:
   - Theme toggle persists
   - Project filtering updates correctly
   - Project modal opens and closes correctly

## Troubleshooting

- If the workflow succeeds but the site does not update, wait a few minutes and refresh again.
- If the site 404s, make sure Pages is configured to use `GitHub Actions`.
- If the homepage loads without styling or media, check that asset paths are relative to the repository root.
- If the first deployment does not start, verify that the workflow file is committed on `main`.
