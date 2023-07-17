/* eslint-disable no-param-reassign */
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import anime from 'animejs/lib/anime.es';
import { useRef, useEffect } from 'react';

import { ANIMATION_CONFIG, MAPPING, LAST_INDEX, FACTOR } from '../../../../constants/svg_constants';

function BranchAnimation() {
	const svgRef = useRef(null);

	useEffect(() => {
		if (svgRef.current) {
			const paths = svgRef.current.querySelectorAll('path');

			paths.forEach((path) => {
				const key = path.id.split('_').slice(GLOBAL_CONSTANTS.zeroth_index, LAST_INDEX).join('_');
				const length = MAPPING[key] * path.getTotalLength();

				path.style.strokeDasharray = length;
				path.style.strokeDashoffset = length;

				const delay = (MAPPING.left_path - MAPPING[key]) * FACTOR;

				const duration = MAPPING[key] * FACTOR;

				anime({
					targets          : path,
					strokeDashoffset : 0,
					easing           : 'linear',
					duration,
					delay,
					loop             : true,
				});
			});
		}
	}, []);

	return (
		<svg
			ref={svgRef}
			width="1000"
			height="800"
			viewBox="0 0 1000 800"
			xmlSpace="preserve"
		>
			<defs>
				<clipPath id="clip">
					<rect x="0" y="100" width="1000" height="600" />
				</clipPath>
			</defs>
			<g clipPath="url(#clip)">
				f
				{ANIMATION_CONFIG.map(({ parentProps, children }) => (
					<g {...parentProps} key={parentProps.id}>
						{children.map(({ gProps, pathProps }) => (
							<g key={gProps.id} {...gProps}>
								<path {...pathProps} />
							</g>
						))}
					</g>
				))}
			</g>
		</svg>
	);
}

export default BranchAnimation;
