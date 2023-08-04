import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import { LABEL_MAPPING } from '../../../constants';

import styles from './styles.module.css';

const DEFAULT_AMOUNT = 0;

const getFormData = ({ item, taxType, show, setShow, type }) => ({
	sid             : item?.jobNumber || '_',
	customerName    : startCase(item?.customerName || '-'),
	estimatedProfit : formatAmount({
		amount   : item?.[`estimatedProfitAmount${taxType}`] || DEFAULT_AMOUNT,
		currency : item?.currency,
		options  : {
			style                 : 'currency',
			currencyDisplay       : 'code',
			maximumFractionDigits : 2,
		},
	}),
	actualProfit: formatAmount({
		amount   : item?.[`${LABEL_MAPPING[type]}ProfitAmount${taxType}`] || DEFAULT_AMOUNT,
		currency : item?.currency,
		options  : {
			style                 : 'currency',
			currencyDisplay       : 'code',
			maximumFractionDigits : 2,
		},
	}),
	deviation : item?.[`${LABEL_MAPPING[type]}ProfitAmountDeviation${taxType}`] || '_',
	action    : (
		<div className={styles.flex}>
			{!show ? (
				<IcMArrowRotateDown
					className={styles.edit}
					height={15}
					width={15}
					onClick={() => setShow(true)}
				/>
			) : (
				<IcMArrowRotateUp
					className={styles.edit}
					height={15}
					width={15}
					onClick={() => setShow(false)}
				/>
			)}
		</div>
	),
});

export default getFormData;
