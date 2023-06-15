import React from 'react';

import ColumnCard from './ColumnCard';
import styles from './styles.module.css';

interface ListItem {
	id: string;
	documentValue: string;
	documentAmount: number;
	settledAmount: number;
	balanceAmount: number;
	transactionDate: string;
	lastEditedDate: string;
	currency: string;
	documentNo: string;
	accountType: string;
	accMode: string;
}
interface Props {
	list: ListItem[];
	refetch: () => void;
}

function ListData({ list = [], refetch }:Props) {
	return (
		<div className={styles.list}>
			{(list || []).map((item) => (<ColumnCard key={item?.id} item={item} refetch={refetch} />))}
		</div>
	);
}

export default ListData;
