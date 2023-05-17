import React from 'react';

import ColumnCard from './ColumnCard';
import styles from './styles.module.css';

interface ListItem {
	id: string;
	jvNum: string;
	category: string;
	transactionDate: string;
	currency: string;
	entityCode: string;
	jvCodeNum: string;
	exchangeRate: string;
	ledCurrency: string;
	status: string;
}
interface Props {
	list: ListItem[];
	refetch: () => void;
}

function List({ list = [], refetch }:Props) {
	return (
		<div className={styles.list}>
			{list?.map((item) => (<ColumnCard key={item?.id} item={item} refetch={refetch} />))}
		</div>
	);
}

export default List;
