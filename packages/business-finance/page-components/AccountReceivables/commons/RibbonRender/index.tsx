import React from 'react';

import styles from './styles.module.css';

function RibbonRender({ row }) {
	const { daysLeftForAutoIrnGeneration = '' } = row || {};
	let value;
	if (daysLeftForAutoIrnGeneration >= 0) {
		value = `${daysLeftForAutoIrnGeneration || '--'} days left` || '0';
	} else {
		value = 'Expired';
	}

	return (
		daysLeftForAutoIrnGeneration ? (
			<div
				className={styles.ribbon}
				style={{ background: daysLeftForAutoIrnGeneration >= 0 ? 'rgb(255, 213, 85)' : '#ff0000' }}
			>
				{value || '-'}
				{' '}
			</div>
		) : null
	);
}

export default RibbonRender;
