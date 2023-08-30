import { cl } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const HUNDRED = 100;

const getProps = (props) => {
	const {
		currentForecastCount = 0,
		currentAllocatedCount = 0,
		pastFulfilledCount = 0,
		pastAllocatedCount = 0,
		view = '',
	} = props;

	const PROPERTIES_MAPPING = {
		current_container_allocation: {
			color         : '#ddebc0',
			leftSideText  : `${currentAllocatedCount} TEU Allocated`,
			rightSideText : `${currentForecastCount} TEU Forecast`,
			percent       : 'ff',
			progress      : Math.min(((currentAllocatedCount / currentForecastCount) * HUNDRED), HUNDRED),
		},
		past_container_allocation: {
			color         : '#e0e0e0',
			leftSideText  : `${pastFulfilledCount} TEU Fulfilled`,
			rightSideText : `${pastAllocatedCount} TEU Allocated`,
			progress      : Math.min(((pastFulfilledCount / pastAllocatedCount) * HUNDRED), HUNDRED),
		},
	};

	return PROPERTIES_MAPPING[view];
};

function CustomProgressBar(props) {
	const { color, leftSideText, rightSideText, progress } = getProps(props);

	return (
		<div
			className={cl`
			${styles.container}
			${cl.ns('progressbar_container')}`}
		>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<div>{leftSideText}</div>

				<div>{rightSideText}</div>
			</div>

			<div
				className={cl`
				${styles.progress_bar}
				${cl.ns('progressbar_bar')}`}
			>
				<div
					className={cl`
						${styles.progress} 
						${cl.ns('progressbar_progress')}`}
					style={{
						width      : `${progress}%`,
						background : `${color}`,
					}}
				/>
			</div>
		</div>
	);
}
export default CustomProgressBar;
