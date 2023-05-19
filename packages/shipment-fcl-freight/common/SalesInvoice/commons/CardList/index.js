import { cl } from '@cogoport/components';
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
	creditNote = false,
}) {
	return (
		<main className={cl`${styles.main} ${creditNote ? styles.creditNote : ''}`}>
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
