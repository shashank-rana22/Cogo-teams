import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import React, { useState } from 'react';

import getFormattedDate from '../../../Utils/getFormattedDate';

import Details from './Details';
import styles from './styles.module.css';
import ToolTipWrapper from './ToolTipWrapper';

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
	item: ListItem;
	refetch: () => void;
}

function ColumnCard({ item, refetch }: Props) {
	const [showDetails, setShowDetails] = useState(false);

	const Icon = showDetails ? IcMArrowRotateUp : IcMArrowRotateDown;

	return (
		<div className={styles.column}>
			<div className={styles.flex}>
				<div className={styles.jvnumb}><ToolTipWrapper text={item?.jvNum} maxlength={14} /></div>
				<div className={styles.jvtype}>{item?.category || ''}</div>
				<div className={styles.accdate}>
					{item?.transactionDate
						? getFormattedDate({ date: item?.transactionDate })
						: '--'}
				</div>
				<div className={styles.curr}>{item?.currency || ''}</div>
				<div className={styles.entity}>{item?.entityCode || ''}</div>
				<div className={styles.journal}>{item?.jvCodeNum || ''}</div>
				<div className={styles.exrate}>{item?.exchangeRate || ''}</div>
				<div className={styles.legcurr}>{item?.ledCurrency || ''}</div>
				<div className={styles.accord}>
					<Icon
						className={styles.icon}
						onClick={() => { setShowDetails(!showDetails); }}
					/>
				</div>
			</div>
			{showDetails ? <Details item={item} refetch={refetch} /> : null}
		</div>
	);
}

export default ColumnCard;
