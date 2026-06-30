// @ts-check
import starlight from '@astrojs/starlight';
import starlightCatppuccin from '@catppuccin/starlight';
import d2 from 'astro-d2';
import { defineConfig } from 'astro/config';
import starlightLinksValidator from 'starlight-links-validator';
import starlightSiteGraph from 'starlight-site-graph';

const siteVal = process.env.CF_PAGES_URL || 'http://localhost:3000';

export default defineConfig({
    site: siteVal,
    integrations: [
        starlight({
            title: 'bootleg.technology',
            social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/nint8835/bootleg.technology' }],
            plugins: [starlightSiteGraph(), starlightCatppuccin({ dark: { flavor: 'frappe' } })].concat(
                process.env.CHECK_LINKS ? [starlightLinksValidator()] : [],
            ),
            head: [
                {
                    tag: 'link',
                    attrs: { rel: 'human-json', href: new URL('.well-known/human.json', siteVal).pathname },
                },
            ],
        }),
        d2({
            experimental: { useD2js: true },
        }),
    ],
});
