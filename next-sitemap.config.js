/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://www.hexthecoder.pl/',
    exclude: [],
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
            }
        ]
    }
}