// @ts-check
import starlight from '@astrojs/starlight';
import starlightCatppuccin from '@catppuccin/starlight';
import { defineConfig } from 'astro/config';
import starlightSiteGraph from 'starlight-site-graph';

export default defineConfig({
    integrations: [
        starlight({
            title: 'bootleg.technology',
            social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/nint8835/bootleg.technology' }],
            plugins: [starlightSiteGraph(), starlightCatppuccin({ dark: { flavor: 'frappe' } })],
        }),
    ],
});
