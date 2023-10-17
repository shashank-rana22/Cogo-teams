import React from 'react';

import styles from './styles.module.css';

function formatDate(date) {
	if (date) {
		return new Date(date).toLocaleDateString('en-GB', {
			day   : 'numeric',
			month : 'short',
			year  : 'numeric',
		});
	}
	return new Date().toLocaleDateString('en-GB', {
		day   : 'numeric',
		month : 'short',
		year  : 'numeric',
	});
}

function RenderRibbon({ item }) {
	const today = new Date();
	const scheduleDeparture = new Date(item?.scheduleDeparture);
	const beforeScheduleDeparture = new Date(scheduleDeparture);
	beforeScheduleDeparture.setDate(scheduleDeparture.getDate() - 1);

	return (
		<div>
			{formatDate(beforeScheduleDeparture) === formatDate(today) ? (
				<div className={styles.ribbon}><span>PRIORITY</span></div>
			) : ''}
		</div>

	);
}

export default RenderRibbon;
