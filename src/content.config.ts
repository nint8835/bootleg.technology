import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { defineCollection } from 'astro:content';
import { autoSidebarLoader } from 'starlight-auto-sidebar/loader';
import { autoSidebarSchema } from 'starlight-auto-sidebar/schema';
import { pageSiteGraphSchema } from 'starlight-site-graph/schema';

export const collections = {
    docs: defineCollection({
        loader: docsLoader(),
        schema: docsSchema({
            extend: pageSiteGraphSchema,
        }),
    }),
    autoSidebar: defineCollection({
        loader: autoSidebarLoader(),
        schema: autoSidebarSchema(),
    }),
};
