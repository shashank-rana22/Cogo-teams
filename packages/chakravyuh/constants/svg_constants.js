/* eslint-disable max-len */
const PATH_STYLE = {
	stroke           : '#7EAEB4',
	strokeOpacity    : '1',
	strokeWidth      : '4',
	strokeDasharray  : 'none',
	strokeLinecap    : 'butt',
	strokeDashoffset : '0',
	strokeLinejoin   : 'miter',
	strokeMiterlimit : '4',
	fill             : 'none',
	fillRule         : 'nonzero',
	opacity          : '0.8',
};

const LINE_TRANSFORM = 'translate(151.5685, 110.0803)';
const D_PATH_1 = 'M 639.849 333.516 h 250.478 c 3.366 0 6.127 -2.743 6.127 -6.086 l 0.001 -53.977 v -198.352 c 0 -3.344 2.76 -6.086 6.126 -6.086 h 220.099';
const T_PATH_1 = 'translate(-881.2645, -201.2655)';
const T_PATH_2 = 'translate(-879.0295, -289.221)';
const D_PATH_2 = 'M 639.849 333.516 h 250.478 c 3.366 0 6.127 -2.743 6.127 -6.086 v -76.418 c 0 -3.344 2.761 -6.086 6.127 -6.086 h 215.629';
const D_LINE = 'm -239.45955 -110.08035 h 175.7822';

export const FACTOR = 1000;
export const LAST_INDEX = -1;

export const MAPPING = {
	line      : 1,
	path      : 2,
	left_path : 3,
};

const COLORS_CONFIG = {
	checkout : { ...PATH_STYLE, stroke: '#044863dd' },
	missing  : { ...PATH_STYLE, stroke: '#0a9396' },
	dislike  : { ...PATH_STYLE, stroke: '#ca6702' },
	dropoff  : { ...PATH_STYLE, stroke: '#9b2226' },
};

export const ANIMATION_CONFIG = [
	{
		parentProps : { transform: 'matrix(0.6637 0 0 0.6637 655.5654 422.8342)', id: 'g1' },
		children    : [
			{
				gProps: {
					transform : 'matrix(0.8618 0 0 0.8736 -412.0402 -70.2303)',
					id        : 'g12',
				},
				pathProps: {
					id        : 'path_2',
					style     : COLORS_CONFIG.missing,
					d         : D_PATH_2,
					transform : T_PATH_2,
				},
			},
			{
				gProps    : { transform: 'matrix(0.8618 0 0 0.8736 -410.114 -147.0696)', id: 'g11' },
				pathProps : {
					id        : 'path_1',
					style     : COLORS_CONFIG.checkout,
					d         : D_PATH_1,
					transform : T_PATH_1,
				},
			},
			{
				gProps: {
					transform : 'matrix(0.8633 0 0 -0.7748 -413.0237 29.6076)',
					id        : 'g13',
				},
				pathProps: {
					id        : 'path_3',
					style     : COLORS_CONFIG.dislike,
					d         : D_PATH_2,
					transform : T_PATH_2,
				},
			},
			{
				gProps: {
					transform : 'matrix(0.8633 0 0 -0.7748 -411.0941 97.7556)',
					id        : 'g14',
				},
				pathProps: {
					id        : 'path_4',
					style     : COLORS_CONFIG.dropoff,
					d         : D_PATH_1,
					transform : T_PATH_1,
				},
			},
			{
				gProps: {
					transform : 'matrix(3.7171 0 0 0.3727 147.8524 -262.2221)',
					id        : 'g15',
				},
				pathProps: {
					id        : 'line_1',
					style     : { ...COLORS_CONFIG.checkout, strokeWidth: '8' },
					transform : LINE_TRANSFORM,
					d         : D_LINE,
				},
			},
			{
				gProps: {
					transform : 'matrix(2.1951 0 0 0.3727 -0.0151 -109.4343)',
					id        : 'g16',
				},
				pathProps: {
					id        : 'line_2',
					style     : { ...COLORS_CONFIG.missing, strokeWidth: '8' },
					transform : LINE_TRANSFORM,
					d         : D_LINE,
				},
			},
			{
				gProps: {
					transform : 'matrix(2.2273 0 0 0.3727 -1.954 63.9707)',
					id        : 'g17',
				},
				pathProps: {
					id        : 'line_3',
					style     : { ...COLORS_CONFIG.dislike, strokeWidth: '8' },
					transform : LINE_TRANSFORM,
					d         : D_LINE,
				},
			},
		],
	},
	{
		parentProps: {
			transform : 'matrix(0.5891 0 0 0.5891 243.3743 435.0277)',
			id        : 'g2',
		},
		children: [
			{
				gProps: {
					transform : 'matrix(0.9469 0 0 0.9469 -253.9066 -133.6871)',
					id        : 'g21',
				},
				pathProps: {
					id        : 'left_path_1',
					style     : { ...PATH_STYLE },
					transform : ' translate(-322.4265, -235.311)',
					d         : 'M 52.944 151.878 h 299.238 a 6 6 0 0 1 6 6 v 154.866 a 6 6 0 0 0 6 6 h 227.727',
				},
			},
			{
				gProps: {
					transform : 'matrix(0.9469 0 0 0.9469 -258.3002 -44.2679)',
					id        : 'g22',
				},
				pathProps: {
					id        : 'left_path_2',
					style     : { ...PATH_STYLE },
					transform : ' translate(-317.7865, -329.7485)',
					d         : 'M 50.914 325.421 h 268.092 c 2.418 0 4.356 1.925 4.356 4.327 c 0 2.403 1.939 4.328 4.357 4.328 h 256.94',
				},
			},
			{
				gProps: {
					transform : 'matrix(0.9469 0 0 0.9469 -252.5018 40.7547)',
					id        : 'g23',
				},
				pathProps: {
					id        : 'left_path_3',
					style     : { ...PATH_STYLE },
					transform : ' translate(-323.91, -419.5395)',
					d         : 'M 49.007 488.827 h 267.665 a 6 6 0 0 0 6 -6 V 356.251 a 6 6 0 0 1 6 -5.999 h 270.141',
				},
			},
		],
	},
];
