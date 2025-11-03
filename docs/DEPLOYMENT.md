# Deployment Guide

## GitHub Pages Setup

This project is ready to be deployed to GitHub Pages.

### Steps to Deploy

1. **Commit and Push Your Code**
   ```bash
   git add .
   git commit -m "Initial commit: Guitar Chord Finder"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click on "Settings"
   - Scroll down to "Pages" in the left sidebar
   - Under "Source", select "Deploy from a branch"
   - Choose `main` branch and `/ (root)` folder
   - Click "Save"

3. **Wait for Deployment**
   - GitHub Pages will build and deploy your site
   - This usually takes 1-2 minutes
   - Your site will be available at: `https://yourusername.github.io/chords`

4. **Custom Domain (Optional)**
   - In the same Pages settings, you can add a custom domain
   - GitHub will provide instructions for DNS configuration

### Verification

Once deployed, test your site:
- Visit the URL
- Try clicking different chords
- Test the search functionality
- Try building custom chords on the fretboard
- Test on mobile devices

### Troubleshooting

**Site not updating?**
- GitHub Pages can take a few minutes to update
- Hard refresh your browser (Ctrl+F5 or Cmd+Shift+R)
- Check the Actions tab for deployment logs

**Wrong styling?**
- Ensure `.nojekyll` file is present
- This prevents Jekyll from processing your files
- Check that all file paths are correct

**404 errors?**
- Verify all files are committed and pushed
- Check that file names match exactly (case-sensitive)
- Ensure `index.html` is in the root directory

### Local Testing

Test before deploying:
```bash
# Start a local server
python -m http.server 8000
# or
npx serve
```

Then open: `http://localhost:8000`

## Continuous Deployment

Your site will automatically redeploy whenever you push changes to the main branch. No additional configuration needed!

