document.getElementById('checkUpdate').addEventListener('click', async () => {
  const GITHUB_REPO = 'owner/repo'; // replace with your repository
  
  document.getElementById('UpdateDisplay').innerText = 'Checking...';

  const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases/latest`);
  const data = await response.json();
  const latestRelease = data.tag_name;

  chrome.storage.local.get('latestRelease', (result) => {
    if (result.latestRelease === latestRelease) {
      document.getElementById('UpdateDisplay').innerText = 'Extension is up to date.';
    } else {
      document.getElementById('UpdateDisplay').innerText = `New version available: ${latestRelease}`;
      chrome.storage.local.set({ latestRelease });
    }
  });
});
