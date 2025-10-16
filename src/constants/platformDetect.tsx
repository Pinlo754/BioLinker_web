export type Platform =
  | 'Instagram'
  | 'TikTok'
  | 'YouTube'
  | 'Telegram'
  | 'Spotify'
  | 'Threads'
  | 'Facebook'
  | 'X'
  | 'Github'
  | 'Linkedin'
  | 'Discord'
  | 'SoundCloud'
  | 'Link'
  | 'unknown';

const platformDetect = (url: string) => {

    function ensureUrl(input: string): URL | null {
      try {
        return new URL(input.trim());
      } catch {
        // Không tự động thêm scheme; coi như không phải URL hợp lệ
        return null;
      }
    }

    function normalizeHost(hostname: string): string {
      return hostname.toLowerCase().replace(/^(www|m|mobile)\./, '');
    }

    const PLATFORM_RULES: Array<{ hosts: RegExp[]; platform: Platform }> = [
      { hosts: [/^instagram\.com$/], platform: 'Instagram' },
      { hosts: [/^tiktok\.com$/], platform: 'TikTok' },
      { hosts: [/^youtube\.com$/, /^youtu\.be$/], platform: 'YouTube' },
      { hosts: [/^t\.me$/], platform: 'Telegram' },
      { hosts: [/^open\.spotify\.com$/], platform: 'Spotify' },
      { hosts: [/^threads\.net$/], platform: 'Threads' },
      { hosts: [/^facebook\.com$/, /^fb\.com$/], platform: 'Facebook' },
      { hosts: [/^x\.com$/, /^twitter\.com$/], platform: 'X' },
      { hosts: [/^github\.com$/], platform: 'Github' },
      { hosts: [/^linkedin\.com$/], platform: 'Linkedin' },
      { hosts: [/^discord\.com$/], platform: 'Discord' },
      { hosts: [/^soundcloud\.com$/], platform: 'SoundCloud' },
    ];

    function isHttpUrl(input: string): boolean {
      const u = ensureUrl(input);
      if (!u) return false;
      if (u.protocol !== 'http:' && u.protocol !== 'https:') return false;
      const host = u.hostname.toLowerCase();
      return host === 'localhost' || host.includes('.');
    }

    function detectPlatformFromUrl(input: string): Platform {
      const url = ensureUrl(input);
      if (!url) return 'unknown';
    
      const host = normalizeHost(url.hostname);
    
      for (const rule of PLATFORM_RULES) {
        if (rule.hosts.some((re) => re.test(host))) {
          return rule.platform;
        }
      }
      return 'unknown';
    }
    return {
      detectPlatformFromUrl: detectPlatformFromUrl(url),
      isHttpUrl: isHttpUrl(url),
    }
}
export default platformDetect;