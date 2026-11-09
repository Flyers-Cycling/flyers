import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const DIST_DIR = path.resolve(import.meta.dirname, '../../dist');

const EXPECTED_HTML_FILES = [
  'index.html',
  '404.html',
  'about/index.html',
  'faq/index.html',
  'schedule/index.html',
  'store/index.html',
  'programs/index.html',
  'programs/xc/index.html',
  'programs/enduro/index.html',
  'programs/jr-flyers/index.html',
  'sponsors/index.html',
  'sponsors/prospectus/index.html',
];

function resolveDistTarget(hrefOrSrc: string): boolean {
  const clean = hrefOrSrc.split('#')[0]?.split('?')[0] || '';
  if (!clean || !clean.startsWith('/')) return true;

  const relative = clean.replace(/^\//, '');
  if (!relative) {
    return fs.existsSync(path.join(DIST_DIR, 'index.html'));
  }

  const directFile = path.join(DIST_DIR, relative);
  const indexFile = path.join(DIST_DIR, relative, 'index.html');
  const htmlFile = `${directFile}.html`;

  return fs.existsSync(directFile) || fs.existsSync(indexFile) || fs.existsSync(htmlFile);
}

describe('Built Static Site HTML & Asset Integrity (dist/)', () => {
  it('generates all 12 static HTML pages plus sitemap-index.xml', () => {
    for (const relPath of EXPECTED_HTML_FILES) {
      expect(fs.existsSync(path.join(DIST_DIR, relPath)), `Missing dist/${relPath}`).toBe(true);
    }
    expect(fs.existsSync(path.join(DIST_DIR, 'sitemap-index.xml'))).toBe(true);
  });

  it('enforces single <h1>, sequential headings, image dimensions, and valid internal links across every page', () => {
    for (const relPath of EXPECTED_HTML_FILES) {
      const html = fs.readFileSync(path.join(DIST_DIR, relPath), 'utf8');

      // HTML5 doctype & lang="en"
      expect(html.toLowerCase()).toContain('<!doctype html>');
      expect(html).toMatch(/<html[^>]*\blang="en"/);

      // Single <h1> per page
      const h1Matches = html.match(/<h1\b/gi) || [];
      expect(h1Matches.length, `Expected exactly 1 <h1> in ${relPath}`).toBe(1);

      // Sequential heading hierarchy (no skipping e.g. h1 -> h3 or h2 -> h4)
      const headingLevels = Array.from(html.matchAll(/<h([1-6])\b/gi)).map((m) => Number(m[1]));
      for (let i = 1; i < headingLevels.length; i += 1) {
        const prev = headingLevels[i - 1]!;
        const curr = headingLevels[i]!;
        expect(
          curr - prev,
          `Heading hierarchy skipped from h${prev} to h${curr} in ${relPath}`,
        ).toBeLessThanOrEqual(1);
      }

      // Every <img> specifies width, height, and alt, and never mixes fetchpriority="high" with loading="lazy"
      const imgTags = Array.from(html.matchAll(/<img\b[^>]*>/gi)).map((m) => m[0]);
      for (const imgTag of imgTags) {
        expect(imgTag, `Missing width on <img> in ${relPath}`).toMatch(/\bwidth="/);
        expect(imgTag, `Missing height on <img> in ${relPath}`).toMatch(/\bheight="/);
        expect(imgTag, `Missing alt on <img> in ${relPath}`).toMatch(/\balt="/);
        if (imgTag.includes('fetchpriority="high"')) {
          expect(imgTag).not.toContain('loading="lazy"');
        }
      }

      // Internal root-relative href & src attributes resolve to real built files
      const internalRefs = Array.from(html.matchAll(/\b(?:href|src)="(\/[^"]*)"/gi)).map(
        (m) => m[1]!,
      );
      for (const ref of internalRefs) {
        expect(resolveDistTarget(ref), `Broken internal reference "${ref}" in ${relPath}`).toBe(
          true,
        );
      }
    }
  });

  it('includes accurate club differentiators ($50/$150 volunteer-led fees & all 5 NICA schools)', () => {
    const homeHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf8');
    const aboutHtml = fs.readFileSync(path.join(DIST_DIR, 'about/index.html'), 'utf8');

    expect(homeHtml).toContain('$50 or $150');
    expect(homeHtml).toContain('100% Volunteer-Led');
    expect(homeHtml).toContain('closedby="any"');

    for (const school of ['Westlake', 'Lehi', 'Cedar Valley', 'Skyridge', 'Lone Peak']) {
      expect(aboutHtml).toContain(school);
    }
  });

  it('embeds official brand logos', () => {
    const homeHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf8');
    const prospectusHtml = fs.readFileSync(
      path.join(DIST_DIR, 'sponsors/prospectus/index.html'),
      'utf8',
    );

    expect(homeHtml).toContain('/images/brand/flyers-logo-dark-bg.svg');
    expect(homeHtml).toContain('fetchpriority="low"');
    expect(prospectusHtml).toContain('/images/brand/flyers-logo-red.svg');
  });
});
