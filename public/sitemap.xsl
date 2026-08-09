<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <title>ExcellenceLinks — XML Sitemap</title>
        <meta charset="UTF-8"/>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background: #0B0F19; color: #F3F4F6; margin: 0; padding: 40px 20px; }
          .container { max-width: 900px; margin: 0 auto; background: #131B2E; border: 1px solid rgba(212,175,55,0.25); border-radius: 16px; padding: 32px; box-shadow: 0 16px 48px rgba(0,0,0,0.5); }
          h1 { color: #D4AF37; font-size: 26px; margin-top: 0; margin-bottom: 8px; }
          p { color: #9CA3AF; font-size: 14px; margin-bottom: 24px; }
          table { width: 100%; border-collapse: collapse; margin-top: 16px; }
          th { text-align: left; padding: 12px 16px; background: rgba(212,175,55,0.1); color: #D4AF37; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid rgba(212,175,55,0.2); }
          td { padding: 14px 16px; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 13.5px; }
          tr:hover td { background: rgba(255,255,255,0.02); }
          a { color: #60A5FA; text-decoration: none; font-weight: 500; }
          a:hover { text-decoration: underline; }
          .badge { display: inline-block; padding: 4px 10px; border-radius: 50px; background: rgba(34,197,94,0.1); color: #22C55E; font-size: 11px; font-weight: 700; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>ExcellenceLinks XML Sitemap</h1>
          <p>This is an automated XML Sitemap generated for search engines like Google and Bing. It contains indexable URLs for ExcellenceLinks.</p>
          <table>
            <thead>
              <tr>
                <th>URL Location</th>
                <th>Priority</th>
                <th>Change Frequency</th>
                <th>Last Modified</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td>
                    <a href="{sitemap:loc}" target="_blank"><xsl:value-of select="sitemap:loc"/></a>
                  </td>
                  <td><span class="badge"><xsl:value-of select="sitemap:priority"/></span></td>
                  <td><xsl:value-of select="sitemap:changefreq"/></td>
                  <td><xsl:value-of select="sitemap:lastmod"/></td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
