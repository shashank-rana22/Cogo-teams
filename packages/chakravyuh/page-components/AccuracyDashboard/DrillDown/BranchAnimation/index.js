/* eslint-disable no-param-reassign */
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import anime from 'animejs/lib/anime.es';
import { useRef, useEffect } from 'react';

import { ONE } from '../../../../constants/map_constants';
import { ANIMATION_CONFIG, MAPPING, LAST_INDEX, FACTOR } from '../../../../constants/svg_constants';
import styles from '../styles.module.css';

function BranchAnimation({ rate_type = null }) {
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
			className={styles.tree_icon}
		>
			{ANIMATION_CONFIG.map(({ parentProps, children }) => (
				<g {...parentProps} key={parentProps.id}>
					{children.map(({ gProps, pathProps }) => {
						const showPath = !rate_type || !pathProps.id.includes('left')
						|| pathProps.id.slice(-ONE) === '2';

						return showPath && (
							<g key={gProps.id} {...gProps}>
								<path {...pathProps} />
							</g>
						);
					})}
				</g>
			))}
		</svg>
	);
}

export default BranchAnimation;
