import React from 'react';

import ColumnCard from './ColumnCard';
import ribbonstyles from './ColumnCard/styles.module.css';
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

function ListData({ list = [], getTableBodyCheckbox = () => {}, refetch = () => {}, source = '' }: Props) {
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
					{source ? null : (
						<div className={ribbonstyles.ribbon_render}>
							<div
								className={
									item?.accMode === 'AP'
										? ribbonstyles.ribbon_red
										: ribbonstyles.ribbon_orange
								}
							>
								{item?.accMode}
							</div>
						</div>
					)}
				</div>
			))}
		</div>
	);
}

export default ListData;
