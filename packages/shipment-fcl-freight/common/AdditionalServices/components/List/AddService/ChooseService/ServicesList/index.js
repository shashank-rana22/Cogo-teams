import React from 'react';

import EmptyState from '../../../../../../EmptyState';

import Header from './CardHeader';
import CardItem from './Carditem';
import styles from './styles.module.css';

function List({ fields, data, loading }) {
	return (
		<div className={styles.container}>
			<Header fields={fields} />
			<CardList>
				{data.length ? (
					(data || []).map((item) => (
						<CardItem item={item} loading={loading} fields={fields} />
					))
				) : (
					<EmptyState />
				)}
			</CardList>
		</div>
	);
}

export default List;
