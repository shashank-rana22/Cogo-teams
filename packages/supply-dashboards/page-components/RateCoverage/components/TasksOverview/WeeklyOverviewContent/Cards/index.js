/* eslint-disable custom-eslint/variables-name-check */
/* eslint-disable no-restricted-syntax */
import { Placeholder } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import { SVG_PATH_D } from '../../../../helpers/constants';

import styles from './styles.module.css';

const DEFAULT_VALUE = 0;
const FIFTY = 50;
const SEVENTY_FIVE = 75;

const getColor = (value) => {
	if (value >= DEFAULT_VALUE && value < FIFTY) { return '#F8AEA8'; }
	if (value >= FIFTY && value < SEVENTY_FIVE) { return '#FEF199'; }
	return '#C4DC91';
};

function findClosestValue(targetValue) {
	const keys = Object.keys(SVG_PATH_D);

	if (isEmpty(keys)) {
		return null;
	}

	let [closestKey] = keys;
	let closestDiff = Math.abs(targetValue - closestKey);

	for (const key of keys) {
		const diff = Math.abs(targetValue - key);

		if (diff < closestDiff) {
			closestKey = key;
			closestDiff = diff;
		}
	}

	return SVG_PATH_D[closestKey];
}

function Cards({ data = {}, statsLoading = false }) {
	const { weekly_completed_percentage = {} } = data;
	// const weekly_completed_percentage = {
	// 	a : '35',
	// 	b : '45',
	// 	c : '50',
	// 	d : '60',
	// 	e : '75',
	// 	f : '70',
	// 	g : '90',
	// };

	return (
		<div className={styles.container}>
			{Object.keys(weekly_completed_percentage).map((key) => (
				<div className={styles.box} key={key}>
					<svg width="80" height="80" viewBox="0 0 80 80" fill="none">
						<circle cx="40" cy="40" r="36" stroke="#F3FAFA" strokeWidth="8" />
						<text x="32" y="40" fontSize="12" fill="black">
							{weekly_completed_percentage[key]}
							%
						</text>
						<text x="16" y="55" fontSize="10" fill="black">
							completed
						</text>
						<path
							d={findClosestValue(weekly_completed_percentage[key])}
							stroke={getColor(weekly_completed_percentage[key])}
							strokeWidth="8"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
					<div className={styles.date}>
						{statsLoading ? <Placeholder style={{ height: '16px', width: '80px' }} /> : (
							<>
								{' '}
								{ key }
							</>
						)}
					</div>
				</div>
			))}
		</div>
	);
}
export default Cards;
