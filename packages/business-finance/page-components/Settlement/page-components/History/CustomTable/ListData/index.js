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
	notPostedSettlementIds: Array<number>;
	ledCurrency: string;
}
interface Props {
	list: ListItem[];
	getTableBodyCheckbox: Function;
	refetch: () => void;
	source?: string;
}

function ListData({ list = [], getTableBodyCheckbox = () => { }, refetch = () => { }, source = '' }: Props) {
	return (
		<div className={styles.list}>
			{(list || []).map((item) => (
				<div key={item?.id} className={styles.position}>
					<ColumnCard
						item={item}
						getTableBodyCheckbox={getTableBodyCheckbox}
						refetch={refetch}
						source={source}
					/>
				</div>
			))}
		</div>
	);
}

export default ListData;
