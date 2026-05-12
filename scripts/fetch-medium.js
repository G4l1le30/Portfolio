import Parser from 'rss-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MEDIUM_USERNAME = 'joshuahutasoit809';
const OUTPUT_FILE = path.join(__dirname, '../src/data/posts.json');

async function fetchWithStealth(url) {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
  });
  if (!response.ok) throw new Error(`Status ${response.status}`);
  return await response.text();
}

async function fetchMedium() {
  console.log('>>> [STARDUST_UPLINK] Initiating data extraction...');
  const parser = new Parser({
    customFields: {
      item: ['content:encoded'],
    }
  });
  
  const urls = [
    `https://medium.com/feed/@${MEDIUM_USERNAME}`,
    `https://${MEDIUM_USERNAME}.medium.com/feed`
  ];

  let lastError = null;

  for (const url of urls) {
    try {
      console.log(`>>> Attempting connection to: ${url}`);
      const xml = await fetchWithStealth(url);
      const feed = await parser.parseString(xml);
      
      const posts = feed.items.map(item => {
        // Use content:encoded for the full text, fallback to contentSnippet
        const rawContent = item['content:encoded'] || item.content || item.contentSnippet || "";
        
        // Remove all HTML tags to get clean text
        const cleanText = rawContent
          .replace(/<[^>]*>/g, " ") // Remove tags
          .replace(/\s+/g, " ")     // Collapse whitespace
          .trim();

        return {
          title: item.title,
          link: item.link,
          pubDate: item.pubDate,
          creator: item.creator || MEDIUM_USERNAME,
          categories: item.categories || [],
          guid: item.guid || item.link,
          snippet: cleanText.length > 200 
            ? cleanText.slice(0, 200) + '...' 
            : cleanText || "No description available."
        };
      });

      fs.writeFileSync(OUTPUT_FILE, JSON.stringify(posts, null, 2));
      console.log(`>>> [SUCCESS] Database synchronized: ${posts.length} logs recorded.`);
      return;
    } catch (err) {
      lastError = err;
      console.warn(`>>> [RETRY] Link ${url} failed: ${err.message}`);
    }
  }

  console.error('>>> [CRITICAL_FAILURE] All uplink attempts failed:', lastError.message);
  if (!fs.existsSync(OUTPUT_FILE)) {
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify([]));
  }
}

fetchMedium();
