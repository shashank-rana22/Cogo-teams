export const LAYER = [
	{
		name        : 'Cogo Maps',
		url         : `${process.env.NEXT_PUBLIC_MAPS_BASE_URL}/cogo-tiles/{z}/{x}/{y}.png`,
		attribution : '',
	},
];

export const MAP_ATTRIBUTE = `<a href="https://www.cogoport.com/en/terms-and-conditions/" target="_blank">
&copy; Cogoport T&C</a> |
<a href="https://www.cogoport.com/en/privacy-policy/" target="_blank">Privacy & data protection</a> |
<a href="https://leafletjs.com/" target="_blank">Leaflet</a>`;

export const CENTER = { lat: '28.679079', lng: '77.069710' };

export const PATH_OPTION = {
	ocean : { color: '#1867D2', weight: 2 },
	air   : { color: '#f37166', weight: 2 },
	land  : { color: '#136f29', weight: 2 },
};

export const COLOR_MAPPING = {
	ocean   : '#1867D2',
	land    : '#136f29',
	air     : '#f37166',
	road    : '#136f29',
	haulage : '#8B0000',
};

export const DEFAULT_LAT_INDEX = 0;
export const DEFAULT_LNG_INDEX = 1;

export const BOTTOM_LEFT_LAT = -90;
export const BOTTOM_LEFT_LNG = -350;
export const TOP_RIGHT_LAT = 90;
export const TOP_RIGHT_LNG = 350;
