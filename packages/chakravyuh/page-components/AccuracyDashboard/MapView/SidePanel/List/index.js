import { Loader } from '@cogoport/components';
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
					<div>
						<h4>{originName}</h4>
						<IcMPortArrow />
						<p>{destination_name}</p>
					</div>
					<p className={styles.total_rates}>{`${total_rates} Rates`}</p>
				</div>
				<div className={styles.right}>
					<p>Accuracy</p>
					<h4>
						{accuracy}
						%
					</h4>
				</div>
			</button>
		));
	}
	return <EmptyState emptyText="There are no rates to show for selected filters" />;
}

export default List;
