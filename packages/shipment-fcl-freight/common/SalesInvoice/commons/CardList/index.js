import React from 'react';

import Header from './CardHeader';
import CardItem from './Carditem';
import styles from './styles.module.css';

function List({
	fields = [],
	data = [],
	loading = false,
	showCode = false,
	detail = {},
}) {
	return (
		<main className={styles.main}>
			<Header fields={fields} showCode={showCode} detail={detail} />

			{(data || []).map((item, i) => (
				<CardItem
					key={item}
					item={item}
					loading={loading}
					fields={fields}
					isLast={data?.length === i + 1}
				/>
			))}
		</main>
	);
}

export default List;
