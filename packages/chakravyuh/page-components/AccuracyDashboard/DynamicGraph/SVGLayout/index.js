/* eslint-disable no-param-reassign */
import anime from 'animejs/lib/anime.es';
import { useRef, useEffect } from 'react';

const PATH_STYLE = {
	stroke           : '#7EAEB4',
	strokeOpacity    : '1',
	strokeWidth      : '3',
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

function SVGLayout({ paths = [] }) {
	const svgRef = useRef(null);

	const stylesPaths = paths.map((path = '') => ({
		id        : path,
		pathProps : {
			...PATH_STYLE,
			d: path,
		},
	}));

	useEffect(() => {
		if (svgRef.current) {
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
	}, []);

	return (
		<svg
			ref={svgRef}
			width="1200pt"
			height="700pt"
			viewBox="0 0 1200 700"
			xmlSpace="preserve"
			// className={styles.tree_icon}
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
