import React from 'react';

import LineItems from '../../common/LineItems';

import styles from './styles.module.css';

function AccordianContent({ data = {} }) {
	const { line_items = [], commodity = '' } = data;

	return (
		<div className={styles.container}>
			<span className={styles.pill}>{commodity}</span>

			<LineItems line_items={line_items} />
		</div>
	);
}

export default AccordianContent;
