import { Loader, Tooltip } from '@cogoport/components';
import { IcMPortArrow } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import styles from '../styles.module.css';

import EmptyState from './EmptyState';

const HOVER_DELAY = 100;
const TO_FIXED = 2;

function List({ loading = false, finalList = [], setActiveId = () => {}, originName = '' }) {
	const [hoverTimer, setHoverTimer] = useState(null);

	const handleMouseOver = (destination_id) => {
		const timer = setTimeout(() => {
			setActiveId(destination_id);
		}, HOVER_DELAY);
		setHoverTimer(timer);
	};

	const handleMouseOut = () => {
		clearTimeout(hoverTimer);
		setActiveId(null);
	};

	useEffect(() => () => {
		clearTimeout(hoverTimer);
	}, [hoverTimer]);

	if (loading && isEmpty(finalList)) {
		return (
			<div className={styles.loader_container}>
				<Loader />
			</div>
		);
	}
	if (loading || finalList.length) {
		return finalList.map(({ total_rates = 0, destination_id, destination_name, total_accuracy = 0 }) => (
			// eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
			<button
				onMouseOver={() => handleMouseOver(destination_id)}
				onMouseOut={handleMouseOut}
				key={destination_id}
				className={styles.card}
			>
				<div className={styles.left}>
					<div className={styles.locations_container}>
						<Tooltip content={originName}>
							{originName}
						</Tooltip>
						<IcMPortArrow className={styles.anchor_icon} />
						<Tooltip content={destination_name}>
							{destination_name}
						</Tooltip>
					</div>
					<p>{`${total_rates} Rates`}</p>
				</div>
				<div className={styles.right}>
					<p>Accuracy</p>
					<h4>{`${Number(total_accuracy).toFixed(TO_FIXED)}%`}</h4>
				</div>
			</button>
		));
	}
	return <EmptyState emptyText="There are no rates to show for selected filters" />;
}

export default List;
