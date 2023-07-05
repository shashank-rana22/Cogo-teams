import EmptyState from '@cogoport/surface-modules/common/EmptyState';
import React from 'react';

import Header from './CardHeader';
import CardItem from './Carditem';
import styles from './styles.module.css';

function List({ fields, data }) {
	return (
		<div className={styles.container}>
			<Header fields={fields} />

			<div className={styles.card_list}>
				{data.length ? (
					(data || []).map((item) => (
						<CardItem key={item?.code} item={item} fields={fields} />
					))
				) : (
					<EmptyState />
				)}
			</div>
		</div>
	);
}

export default List;
