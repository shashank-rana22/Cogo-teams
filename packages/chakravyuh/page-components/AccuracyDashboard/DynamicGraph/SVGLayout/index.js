/* eslint-disable no-param-reassign */
import anime from 'animejs/lib/anime.es';
import { useRef, useEffect } from 'react';

const PATH_STYLE = {
	stroke           : '#001219',
	strokeOpacity    : '1',
	strokeWidth      : '2',
	strokeDasharray  : 'none',
	strokeLinecap    : 'butt',
	strokeDashoffset : '0',
	strokeLinejoin   : 'miter',
	strokeMiterlimit : '4',
	fill             : 'none',
	fillRule         : 'nonzero',
	opacity          : '0.8',
};

const ANIMATION_DURATION = 2000;
const ANIMATION_END_DELAY = 2000;
const ADJUSTMENT_FACTOR = 120;

function SVGLayout({ paths = [], bounds = [], mode = '' }) {
	const svgRef = useRef(null);

	const stylesPaths = paths.map((path = '') => ({
		id        : path,
		pathProps : {
			...PATH_STYLE,
			stroke : mode === 'background' ? '#f4f4f4' : PATH_STYLE.stroke,
			d      : path,
		},
	}));

	useEffect(() => {
		if (svgRef.current && mode !== 'background') {
			const svgPaths = svgRef.current.querySelectorAll('path');

			svgPaths.forEach((path) => {
				const length = path.getTotalLength();

				path.style.strokeDasharray = length;
				path.style.strokeDashoffset = length;

				anime({
					targets          : path,
					strokeDashoffset : 0,
					easing           : 'linear',
					duration         : ANIMATION_DURATION,
					endDelay         : ANIMATION_END_DELAY,
					loop             : true,
				});
			});
		}
	}, [mode]);

	const { maxX, maxY } = bounds;
	return (
		<svg
			ref={svgRef}
			width={`${maxX + ADJUSTMENT_FACTOR}pt`}
			height={`${maxY + ADJUSTMENT_FACTOR}pt`}
			viewBox={`0 0 ${maxX + ADJUSTMENT_FACTOR} ${maxY + ADJUSTMENT_FACTOR}`}
			xmlSpace="preserve"
			shapeRendering="geometricPrecision"
			textRendering="geometricPrecision"
		>
			{stylesPaths.map(({ id, pathProps }) => (
				<path key={id} {...pathProps} />
			))}
		</svg>
	);
}

export default SVGLayout;
