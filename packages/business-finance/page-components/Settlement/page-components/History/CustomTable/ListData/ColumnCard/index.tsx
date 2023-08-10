import { getFormattedPrice } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useHistorySingleDataList from '../../../../../hooks/useHistorySingleDataList';

import Details from './Details';
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
	item: ListItem;
	getTableBodyCheckbox: (item: object) => React.JSX.Element;
	refetch: ()=>void

}

function ColumnCard({ item, getTableBodyCheckbox, refetch }: Props) {
	const [showDetails, setShowDetails] = useState(false);

	const Icon = showDetails ? IcMArrowRotateUp : IcMArrowRotateDown;

	const {
		data,
		loading,
		onPageChange,
		getHistoryChild,
	} = useHistorySingleDataList();

	const handleClickIcon = () => {
		if (!showDetails) { getHistoryChild(item); }
		setShowDetails(!showDetails);
	};

	return (
		<div className={styles.column}>
			<div className={styles.flex}>
				<div>{getTableBodyCheckbox(item)}</div>
				<div className={styles.refnumb}>{item?.documentValue}</div>
				<div className={styles.amount}>
					{	getFormattedPrice(
						item?.documentAmount,
						item?.currency,
					)}
				</div>
				<div className={styles.utilized}>
					{	getFormattedPrice(
						item?.settledAmount,
						item?.currency,
					)}
				</div>
				<div className={styles.balance}>
					{	getFormattedPrice(
						item?.balanceAmount,
						item?.currency,
					)}
				</div>
				<div className={styles.accdate}>
					{item?.transactionDate
						? formatDate({
							date       : item?.transactionDate,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMMM yyyy'],
							formatType : 'date',
						})
						: '--'}
				</div>
				<div className={styles.lastdate}>
					{item?.lastEditedDate
						? formatDate({
							date       : item?.lastEditedDate,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMMM yyyy'],
							formatType : 'date',
						})
						: '--'}
				</div>
				<div className={styles.accord}>
					<Icon
						className={styles.icon}
						onClick={() => { handleClickIcon(); }}
					/>
				</div>
				<div className={styles.ribbon_render}>
					<div
						className={item?.accMode === 'AP' ? styles.ribbon_red : styles.ribbon_orange}

					>
						{item?.accMode}
					</div>
				</div>

			</div>
			{showDetails ? (
				<Details
					item={item}
					data={data}
					loading={loading}
					refetch={refetch}
					onPageChange={onPageChange}
				/>
			) : null}
		</div>
	);
}

export default ColumnCard;
