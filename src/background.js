const GITHUB_REPO = 'owner/repo'; // replace with your repository

async function fetchLatestRelease() {
  const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases/latest`);
  const data = await response.json();
  return data.tag_name;
}

chrome.runtime.onInstalled.addListener(async () => {
  const latestRelease = await fetchLatestRelease();
  chrome.storage.local.set({ latestRelease });
});
