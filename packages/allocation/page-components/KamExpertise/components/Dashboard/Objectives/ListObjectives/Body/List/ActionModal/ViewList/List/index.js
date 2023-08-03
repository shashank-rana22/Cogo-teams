import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function List(props) {
	const {
		item: listItem = {},
		LIST_COLUMN_MAPPING = [],
		loadingKAMsList = false,
	} = props || {};

	if (loadingKAMsList) {
		return (
			<div className={styles.loader_container}>
				<Placeholder height="80px" width="500px" />
			</div>
		);
	}

	return (
		<div className={styles.list_card}>
			{LIST_COLUMN_MAPPING.map((column) => {
				const { key, flex, accessor } = column;

				return (
					<div
						key={key}
						style={{ flex }}
						className={styles.card_column}
					>
						{accessor(listItem)}
					</div>
				);
			})}
		</div>
	);
}

export default List;
