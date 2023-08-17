import { Loader, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMPortArrow } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from '../styles.module.css';

import EmptyState from './EmptyState';

function List({ loading = false, finalList = [], setActiveId = () => {}, originName = '' }) {
	if (loading && isEmpty(finalList)) {
		return (
			<div className={styles.loader_container}>
				<Loader />
			</div>
		);
	}
	if (loading || finalList.length) {
		return finalList.map(({ total_rates = 0, destination_id, destination_name, accuracy = 0 }) => (
			// eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
			<button
				onMouseOver={() => setActiveId(destination_id)}
				onMouseOut={() => setActiveId(null)}
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
					<h4>{`${Number(accuracy).toFixed(GLOBAL_CONSTANTS.zeroth_index)}%`}</h4>
				</div>
			</button>
		));
	}
	return <EmptyState emptyText="There are no rates to show for selected filters" />;
}

export default List;
