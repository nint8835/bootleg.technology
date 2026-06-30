type Vouch = { url: string; vouched_at: string };
type HumanJson = { url: string; version: '0.1.1'; vouches: Vouch[] };

const VOUCHED_URLS: string[] = [
    // Vouch for my personal site which vouches for all the actual sites I want to vouch for
    // Prevents needing to maintain in two places
    'https://rileyflynn.me',
];

export function GET({}) {
    const vouchTime = new Date();
    const vouchTimeString = vouchTime.toISOString().split('T')[0];

    const humanJson: HumanJson = {
        // TODO: Can this be made non-hardcoded?
        url: 'https://bootleg.technology',
        version: '0.1.1',
        vouches: VOUCHED_URLS.map((url) => ({
            url,
            vouched_at: vouchTimeString,
        })),
    };

    return new Response(JSON.stringify(humanJson), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
}
