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
	notPostedSettlementIds : Array<number>;
	ledCurrency: string;
}
interface Props {
	list: ListItem[];
	getTableBodyCheckbox: (item: object) => React.JSX.Element;
	refetch: ()=> void;

}

function ListData({ list = [], getTableBodyCheckbox, refetch }:Props) {
	return (
		<div className={styles.list}>
			{(list || []).map((item) => (
				<ColumnCard
					key={item?.id}
					item={item}
					getTableBodyCheckbox={getTableBodyCheckbox}
					refetch={refetch}
				/>
			))}
		</div>
	);
}

export default ListData;
