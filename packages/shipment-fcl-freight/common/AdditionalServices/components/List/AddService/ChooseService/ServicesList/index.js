import { Placeholder } from '@cogoport/components';
import EmptyState from '@cogoport/ocean-modules/common/EmptyState';
import React from 'react';

import Header from './CardHeader';
import CardItem from './Carditem';
import styles from './styles.module.css';

const NUMBER_OF_LOADING_ROWS = 5;

function List({ fields, data, loading }) {
	if (loading) {
		return (
			<div className={styles.container}>
				<Header fields={fields} />

				{[...Array(NUMBER_OF_LOADING_ROWS).keys()].map((value) => (
					<div className={styles.loading_row} key={`loading-row-${value}`}>
						<Placeholder height="35px" width="30%" margin="12px" />
						<Placeholder height="35px" width="17.5%" margin="12px" />
						<Placeholder height="35px" width="17.5%" margin="12px" />
						<Placeholder height="35px" width="35%" margin="12px" />
					</div>
				))}
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<Header fields={fields} />
			<div className={styles.card_list}>
				{data.length ? (
					(data || []).map((item) => (
						<CardItem
							key={item?.code}
							item={item}
							loading={loading}
							fields={fields}
						/>
					))
				) : (
					<EmptyState />
				)}
			</div>
		</div>
	);
}

export default List;
