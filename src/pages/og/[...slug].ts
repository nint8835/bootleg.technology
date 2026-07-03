import { flavors as catppuccinFlavours, type ColorFormat } from '@catppuccin/palette';
import { OGImageRoute } from 'astro-og-canvas';
import { getCollection } from 'astro:content';

function catppuccinToAstroOGCanvas(colour: ColorFormat): [number, number, number] {
    return [colour.rgb.r, colour.rgb.g, colour.rgb.b];
}

const entries = await getCollection('docs');

const pages = Object.fromEntries(entries.map(({ data, id }) => [id, { data }]));

export const { getStaticPaths, GET } = await OGImageRoute({
    pages,
    getImageOptions: (_id, page: (typeof pages)[number]) => ({
        title: page.data.title,
        description: page.data.description,
        bgGradient: [catppuccinToAstroOGCanvas(catppuccinFlavours.frappe.colors.base)],
        font: {
            title: {
                color: catppuccinToAstroOGCanvas(catppuccinFlavours.frappe.colors.text),
            },
            description: {
                color: catppuccinToAstroOGCanvas(catppuccinFlavours.frappe.colors.subtext0),
            },
        },
    }),
});
