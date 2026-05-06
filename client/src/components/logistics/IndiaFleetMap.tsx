import { useEffect, useRef } from 'react';

const SOURCES = [
    'https://cdn.jsdelivr.net/gh/adarshbiradar/maps-geojson@master/india.json',
    'https://cdn.jsdelivr.net/gh/Subhash9325/GeoJson-Data-of-Indian-States@master/Indian_States',
    'https://cdn.jsdelivr.net/gh/india-in-data/india-states-2019@master/india_states.geojson',
];

const CITIES: Array<{ name: string; lon: number; lat: number }> = [
    { name: 'Delhi', lon: 77.10, lat: 28.70 },
    { name: 'Mumbai', lon: 72.87, lat: 19.07 },
    { name: 'Bengaluru', lon: 77.59, lat: 12.97 },
    { name: 'Chennai', lon: 80.27, lat: 13.08 },
    { name: 'Kolkata', lon: 88.36, lat: 22.57 },
    { name: 'Hyderabad', lon: 78.49, lat: 17.39 },
    { name: 'Pune', lon: 73.85, lat: 18.52 },
    { name: 'Ahmedabad', lon: 72.57, lat: 23.02 },
    { name: 'Jaipur', lon: 75.79, lat: 26.92 },
    { name: 'Lucknow', lon: 80.95, lat: 26.85 },
    { name: 'Bhopal', lon: 77.41, lat: 23.26 },
    { name: 'Guwahati', lon: 91.74, lat: 26.14 },
    { name: 'Patna', lon: 85.14, lat: 25.59 },
    { name: 'Ranchi', lon: 85.31, lat: 23.34 },
    { name: 'Kochi', lon: 76.27, lat: 9.93 },
    { name: 'Visakhapatnam', lon: 83.22, lat: 17.69 },
    { name: 'Chandigarh', lon: 76.78, lat: 30.73 },
    { name: 'Nagpur', lon: 79.09, lat: 21.15 },
    { name: 'Surat', lon: 72.83, lat: 21.17 },
];

const HIGHLIGHT_STATES = new Set(['west bengal', 'bihar', 'jharkhand']);

type Ring = number[][];
type Polygon = Ring[];
type Geom =
    | { type: 'Polygon'; coordinates: Polygon }
    | { type: 'MultiPolygon'; coordinates: Polygon[] };

function pointInRing(pt: number[], ring: Ring) {
    let inside = false;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
        const xi = ring[i][0], yi = ring[i][1];
        const xj = ring[j][0], yj = ring[j][1];
        const intersect = ((yi > pt[1]) !== (yj > pt[1])) &&
            (pt[0] < (xj - xi) * (pt[1] - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}
function pointInPolygon(pt: number[], polygon: Polygon) {
    if (!polygon.length || !pointInRing(pt, polygon[0])) return false;
    for (let i = 1; i < polygon.length; i++) {
        if (pointInRing(pt, polygon[i])) return false;
    }
    return true;
}
function pointInGeometry(pt: number[], geom: Geom | undefined) {
    if (!geom) return false;
    if (geom.type === 'Polygon') return pointInPolygon(pt, geom.coordinates);
    if (geom.type === 'MultiPolygon') return geom.coordinates.some(p => pointInPolygon(pt, p));
    return false;
}

const statKey = (s: string) => (s || '').toLowerCase().replace(/\s+/g, ' ').trim();

export function IndiaFleetMap() {
    const mapRef = useRef<SVGSVGElement>(null);
    const stationsRef = useRef<SVGSVGElement>(null);
    const ticksRef = useRef<SVGGElement>(null);

    useEffect(() => {
        const NS = 'http://www.w3.org/2000/svg';

        // Generate ring tick marks
        if (ticksRef.current && ticksRef.current.childNodes.length === 0) {
            const cx = 100, cy = 100, rOut = 100, rIn = 96;
            for (let i = 0; i < 12; i++) {
                const a = (i / 12) * Math.PI * 2;
                const x1 = cx + Math.cos(a) * rIn;
                const y1 = cy + Math.sin(a) * rIn;
                const x2 = cx + Math.cos(a) * rOut;
                const y2 = cy + Math.sin(a) * rOut;
                const ln = document.createElementNS(NS, 'line');
                ln.setAttribute('x1', x1.toFixed(2));
                ln.setAttribute('y1', y1.toFixed(2));
                ln.setAttribute('x2', x2.toFixed(2));
                ln.setAttribute('y2', y2.toFixed(2));
                ticksRef.current.appendChild(ln);
            }
        }

        let cancelled = false;

        (async () => {
            const svg = mapRef.current;
            const stationsSvg = stationsRef.current;
            if (!svg || !stationsSvg) return;

            // Clear any prior render (e.g. on hot-reload)
            [...svg.querySelectorAll('.country, .state')].forEach(n => n.remove());
            [...stationsSvg.querySelectorAll('circle')].forEach(n => n.remove());

            function eachRing(coords: Polygon, fn: (p: number[]) => void) {
                for (const r of coords) for (const p of r) fn(p);
            }
            function eachGeom(g: Geom | undefined, fn: (p: number[]) => void) {
                if (!g) return;
                if (g.type === 'Polygon') eachRing(g.coordinates, fn);
                else if (g.type === 'MultiPolygon') for (const p of g.coordinates) eachRing(p, fn);
            }

            function drawFallback() {
                const path = document.createElementNS(NS, 'path');
                path.setAttribute('class', 'country');
                path.setAttribute('d',
                    'M 78 30 L 110 28 L 130 40 L 152 55 L 158 78 L 150 95 ' +
                    'L 158 110 L 150 130 L 130 155 L 110 175 L 95 175 ' +
                    'L 80 155 L 70 130 L 60 110 L 55 90 L 50 70 L 60 50 Z');
                svg.appendChild(path);
            }

            let geo: any = null;
            for (const url of SOURCES) {
                try {
                    const r = await fetch(url, { mode: 'cors' });
                    if (!r.ok) continue;
                    geo = await r.json();
                    if (geo) break;
                } catch (e) { /* try next */ }
            }
            if (cancelled) return;
            if (!geo || !geo.features) { drawFallback(); return; }

            let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
            for (const f of geo.features) {
                eachGeom(f.geometry, (pt) => {
                    const x = pt[0], y = -pt[1];
                    if (x < minX) minX = x; if (x > maxX) maxX = x;
                    if (y < minY) minY = y; if (y > maxY) maxY = y;
                });
            }

            const PAD = 22, W = 200, H = 200;
            const dataW = maxX - minX, dataH = maxY - minY;
            const scale = Math.min((W - PAD * 2) / dataW, (H - PAD * 2) / dataH);
            const offX = (W - dataW * scale) / 2 - minX * scale;
            const offY = (H - dataH * scale) / 2 - minY * scale;

            const project = (pt: number[]) => [pt[0] * scale + offX, (-pt[1]) * scale + offY];
            const projectLL = (lon: number, lat: number) => project([lon, lat]);

            const ringToPath = (ring: Ring) => {
                let d = '';
                for (let i = 0; i < ring.length; i++) {
                    const [x, y] = project(ring[i]);
                    d += (i === 0 ? 'M' : 'L') + x.toFixed(2) + ' ' + y.toFixed(2) + ' ';
                }
                return d + 'Z';
            };
            const geomToPath = (g: Geom | undefined) => {
                if (!g) return '';
                if (g.type === 'Polygon') return g.coordinates.map(ringToPath).join(' ');
                if (g.type === 'MultiPolygon') return g.coordinates.map(p => p.map(ringToPath).join(' ')).join(' ');
                return '';
            };

            // 1) country fill
            const countryPath = document.createElementNS(NS, 'path');
            let combinedD = '';
            for (const f of geo.features) combinedD += ' ' + geomToPath(f.geometry);
            countryPath.setAttribute('class', 'country');
            countryPath.setAttribute('d', combinedD.trim());
            countryPath.setAttribute('fill-rule', 'evenodd');
            svg.appendChild(countryPath);

            // 2) state outlines
            for (const f of geo.features) {
                const d = geomToPath(f.geometry);
                if (!d) continue;
                const p = document.createElementNS(NS, 'path');
                p.setAttribute('class', 'state');
                p.setAttribute('d', d);
                const name = (f.properties && (f.properties.st_nm || f.properties.NAME_1 || f.properties.ST_NM)) || 'State';
                p.setAttribute('data-name', name);
                svg.appendChild(p);
            }

            // 3) charging stations — only inside highlighted states
            const highlightGeoms: Geom[] = geo.features
                .filter((f: any) => HIGHLIGHT_STATES.has(statKey(
                    (f.properties && (f.properties.st_nm || f.properties.NAME_1 || f.properties.ST_NM)) || ''
                )))
                .map((f: any) => f.geometry);

            const visibleStations = CITIES.filter(c =>
                highlightGeoms.some(g => pointInGeometry([c.lon, c.lat], g))
            );

            visibleStations.forEach((c, i) => {
                const [x, y] = projectLL(c.lon, c.lat);
                const delay = ((i % 7) * 0.32).toFixed(2) + 's';

                const halo = document.createElementNS(NS, 'circle');
                halo.setAttribute('class', 'ifm-station-halo');
                halo.setAttribute('cx', x.toFixed(2));
                halo.setAttribute('cy', y.toFixed(2));
                halo.setAttribute('r', '3.2');
                stationsSvg.appendChild(halo);

                const pulse = document.createElementNS(NS, 'circle');
                pulse.setAttribute('class', 'ifm-station-pulse');
                pulse.setAttribute('cx', x.toFixed(2));
                pulse.setAttribute('cy', y.toFixed(2));
                pulse.setAttribute('r', '2.2');
                pulse.style.setProperty('--cx', x.toFixed(2) + 'px');
                pulse.style.setProperty('--cy', y.toFixed(2) + 'px');
                pulse.style.setProperty('--delay', delay);
                stationsSvg.appendChild(pulse);

                const core = document.createElementNS(NS, 'circle');
                core.setAttribute('class', 'ifm-station-core');
                core.setAttribute('cx', x.toFixed(2));
                core.setAttribute('cy', y.toFixed(2));
                core.setAttribute('r', '1.4');
                core.style.setProperty('--delay', delay);
                stationsSvg.appendChild(core);
            });
        })();

        return () => { cancelled = true; };
    }, []);

    return (
        <div className="ifm-stage relative w-full h-full grid place-items-center">
            <style>{`
                .ifm-stage svg {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    overflow: visible;
                }
                .ifm-bolt { z-index: 0; pointer-events: none; animation: ifm-bolt-pulse 2.4s ease-in-out infinite; transform-origin: 50% 50%; }
                .ifm-bolt path {
                    fill: #5CF09E;
                    fill-opacity: 0.10;
                    stroke: #5CF09E;
                    stroke-opacity: 0.55;
                    stroke-width: 0.8;
                    stroke-linejoin: round;
                    stroke-linecap: round;
                }
                @keyframes ifm-bolt-pulse {
                    0%, 100% { opacity: 0.45; transform: scale(1); }
                    50%      { opacity: 0.95; transform: scale(1.08); }
                }

                .ifm-ring-wrap { z-index: 1; pointer-events: none; }
                .ifm-ring-track { fill: none; stroke: #F4F5F6; stroke-opacity: 0.10; stroke-width: 1.6; }
                .ifm-ring-fill {
                    fill: none;
                    stroke: #5CF09E;
                    stroke-opacity: 0.55;
                    stroke-width: 1.4;
                    stroke-linecap: round;
                    stroke-dasharray: 4 6;
                    filter: drop-shadow(0 0 3px rgba(92,240,158,0.35));
                }
                .ifm-ring-ticks line { stroke: #F4F5F6; stroke-opacity: 0.30; stroke-width: 0.8; stroke-linecap: round; }

                .ifm-car-body { fill: #5CF09E; filter: drop-shadow(0 0 3px rgba(92,240,158,0.55)); }
                .ifm-car-glass { fill: rgba(244,245,246,0.45); }
                .ifm-car-wheel { fill: #F4F5F6; }
                .ifm-car-light { fill: #fff; filter: drop-shadow(0 0 2px #5CF09E); }

                .ifm-map { z-index: 2; }
                .ifm-map .country {
                    fill: rgba(92,240,158,0.04);
                    stroke: rgba(244,245,246,0.55);
                    stroke-width: 0.7;
                    stroke-linejoin: round;
                    stroke-linecap: round;
                    pointer-events: none;
                }
                .ifm-map .state {
                    fill: rgba(92,240,158,0.02);
                    stroke: rgba(244,245,246,0.5);
                    stroke-width: 0.3;
                    stroke-opacity: 0.7;
                    stroke-linejoin: round;
                    stroke-linecap: round;
                    pointer-events: none;
                    transition: fill 0.22s ease, stroke 0.22s ease;
                }

                .ifm-stations { z-index: 3; pointer-events: none; }
                .ifm-station-core {
                    fill: #5CF09E;
                    filter: drop-shadow(0 0 3px rgba(92,240,158,0.55));
                    animation: ifm-blink 2.4s ease-in-out infinite;
                    animation-delay: var(--delay, 0s);
                }
                .ifm-station-halo {
                    fill: #5CF09E;
                    fill-opacity: 0.18;
                    filter: blur(0.6px);
                }
                .ifm-station-pulse {
                    fill: none;
                    stroke: #5CF09E;
                    stroke-width: 1;
                    transform-origin: var(--cx) var(--cy);
                    animation: ifm-pulse 2.4s ease-out infinite;
                    animation-delay: var(--delay, 0s);
                }
                @keyframes ifm-pulse {
                    0%   { transform: scale(0.4); opacity: 0.9; }
                    80%  { transform: scale(2.6); opacity: 0; }
                    100% { transform: scale(2.6); opacity: 0; }
                }
                @keyframes ifm-blink {
                    0%, 100% { opacity: 0.55; }
                    50%      { opacity: 1; }
                }
            `}</style>

            {/* bolt behind map */}
            <svg viewBox="0 0 200 200" className="ifm-bolt" aria-hidden="true">
                <path d="M 108 70 L 86 104 L 100 104 L 92 132 L 116 96 L 102 96 Z" />
            </svg>

            {/* charging progress ring + orbiting car */}
            <svg viewBox="0 0 200 200" className="ifm-ring-wrap" aria-hidden="true">
                <circle className="ifm-ring-track" cx="100" cy="100" r="92" />
                <g className="ifm-ring-ticks" ref={ticksRef} />
                <circle className="ifm-ring-fill" cx="100" cy="100" r="92" />

                <g>
                    <rect className="ifm-car-body" x="-9" y="-2" width="18" height="4" rx="1.6" />
                    <path className="ifm-car-body" d="M -5 -2 L -3 -4.8 L 4 -4.8 L 6 -2 Z" />
                    <path className="ifm-car-glass" d="M -3.8 -2.2 L -2.2 -4 L 3.2 -4 L 4.8 -2.2 Z" />
                    <circle className="ifm-car-wheel" cx="-5.5" cy="2.2" r="1.5" />
                    <circle className="ifm-car-wheel" cx="5.5" cy="2.2" r="1.5" />
                    <rect className="ifm-car-light" x="8.4" y="-1.2" width="1.2" height="1.6" rx="0.3" />
                    <animateMotion dur="6s" repeatCount="indefinite" rotate="auto">
                        <mpath href="#ifm-car-path" />
                    </animateMotion>
                </g>

                <path id="ifm-car-path"
                    d="M 8 100 A 92 92 0 0 1 192 100 A 92 92 0 0 1 8 100"
                    fill="none" stroke="none" />
            </svg>

            {/* India map (populated by JS) */}
            <svg viewBox="0 0 200 200" className="ifm-map" ref={mapRef} aria-hidden="true" />

            {/* charging-station markers (populated by JS) */}
            <svg viewBox="0 0 200 200" className="ifm-stations" ref={stationsRef} aria-hidden="true" />
        </div>
    );
}
