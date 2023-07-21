import { cl } from '@cogoport/components';
import { IcMTick } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

const INCREAMENT_DECREAMENT_VALUE = 1;

function ModifiedStepper({ active = '', items = [] }) {
	const previousItems = new Set();

	items.some((item) => {
		if (item.key === active) {
			return true;
		}
		previousItems.add(item.key);
		return false;
	});

	return (
		<div className={styles.container}>
			{items.map((item, index) => (
				<div key={item.key} className={styles.single_step}>
					{' '}
					<div
						className={cl`${styles.number} ${
							item.key === active ? `${styles.active}` : `${styles.inactive}`} ${
							previousItems.has(item.key) ? `${styles.passed}` : ''
						}`}
					>
						{previousItems.has(item.key) ? <IcMTick /> : index + INCREAMENT_DECREAMENT_VALUE}
					</div>
					<div
						className={cl`${styles.title} ${
							item.key === active ? `${styles.active_title}` : `${styles.inactive_title}`
						} ${previousItems.has(item.key) ? `${styles.passed_title}` : ''}`}
					>
						{item.title}
					</div>
					{index !== items.length - INCREAMENT_DECREAMENT_VALUE ? (
						<div
							className={cl`${styles.line} ${
								previousItems.has(item.key) ? `${styles.passed_line}` : ''
							}`}
						/>
					) : null}
				</div>
			))}
		</div>
	);
}

export default ModifiedStepper;
