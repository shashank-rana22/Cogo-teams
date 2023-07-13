/* eslint-disable no-param-reassign */
import anime from 'animejs/lib/anime.es';
import React, { useRef, useEffect } from 'react';

import IcBranch from '../../../../../assets/ic-tree.svg';
import { D_NEXT, D_TOP, PATH_STYLE } from '../../../../../constants/svg_constants';

import styles from './styles.module.css';

function DrillDown() {
	const svgRef = useRef(null);

	useEffect(() => {
		if (svgRef.current) {
			const paths = svgRef.current.querySelectorAll('path');
			paths.forEach((path) => {
				const length = path.getTotalLength();
				path.style.strokeDasharray = length;
				path.style.strokeDashoffset = length;

				anime({
					targets          : path,
					strokeDashoffset : 0,
					easing           : 'linear',
					duration         : 2000,
					delay            : 0,
					loop             : true,
				});
			});
		}
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.header}>Rate DrillDown</div>
			<div className={styles.main_container}>
				<IcBranch />
				<svg
					ref={svgRef}
					xmlns="http://www.w3.org/2000/svg"
					width="600"
					height="600"
					viewBox="0 0 1000 1000"
					xmlSpace="preserve"
				>
					<g transform="matrix(1.5053 0 0 1.5259 500 506.2204)" id="group1">
						<g transform="matrix(1 0 0 1 14.2195 -168.2045)" id="path1_group1">
							<path
								style={PATH_STYLE}
								transform=" translate(-881.2645, -201.2655)"
								d={D_TOP}
								strokeLinecap="round"
							/>
						</g>
						<g transform="matrix(1 0 0 1 11.9845 -80.249)" id="path2_group1">
							<path
								style={PATH_STYLE}
								transform=" translate(-879.0295, -289.221)"
								d={D_NEXT}
								strokeLinecap="round"
							/>
						</g>
					</g>
					<g transform="matrix(1.0017 0 0 0.8991 498.2413 449.55)" id="group2">
						<g transform="matrix(1.5053 0 0 -1.5053 21.4002 253.1932)" id="path1_group2">
							<path
								style={PATH_STYLE}
								transform=" translate(-881.2645, -201.2655)"
								d={D_TOP}
								strokeLinecap="round"
							/>
						</g>
						<g transform="matrix(1.5053 0 0 -1.5053 18.0358 120.7938)" id="path2_group2">
							<path
								style={PATH_STYLE}
								transform=" translate(-879.0295, -289.221)"
								d={D_NEXT}
								strokeLinecap="round"
							/>
						</g>
					</g>
				</svg>
				<div className={styles.main_card}>Total Rates</div>
			</div>
		</div>
	);
}

export default DrillDown;
