// @ts-check
import starlight from '@astrojs/starlight';
import starlightCatppuccin from '@catppuccin/starlight';
import { defineConfig } from 'astro/config';
import starlightSiteGraph from 'starlight-site-graph';

const siteVal = process.env.CF_PAGES_URL || 'http://localhost:3000';

export default defineConfig({
    site: siteVal,
    integrations: [
        starlight({
            title: 'bootleg.technology',
            social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/nint8835/bootleg.technology' }],
            plugins: [starlightSiteGraph(), starlightCatppuccin({ dark: { flavor: 'frappe' } })],
            head: [
                {
                    tag: 'link',
                    attrs: { rel: 'human-json', href: new URL('.well-known/human.json', siteVal).pathname },
                },
            ],
        }),
    ],
});
