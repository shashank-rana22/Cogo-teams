import { getFormattedPrice } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import React, { useState } from 'react';

import Details from './Details/index';
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

}

function ColumnCard({ item, getTableBodyCheckbox }: Props) {
	const [showDetails, setShowDetails] = useState(false);

	const Icon = showDetails ? IcMArrowRotateUp : IcMArrowRotateDown;

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
						onClick={() => { setShowDetails(!showDetails); }}
					/>
				</div>
				<div className={styles.ribbon_render}>
					<div
						className={styles.ribbon}
						style={{ background: item?.accMode === 'AP' ? '#ee3425' : '#f68b21' }}
					>
						{item?.accMode}
					</div>
				</div>

			</div>
			{showDetails ? <Details item={item} /> : null}
		</div>
	);
}

export default ColumnCard;
