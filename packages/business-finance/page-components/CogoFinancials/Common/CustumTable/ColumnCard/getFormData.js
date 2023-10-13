import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import showOverflowingNumber from '../../../../commons/showOverflowingNumber';
import { LABEL_MAPPING } from '../../../constants';

import styles from './styles.module.css';

const DEFAULT_AMOUNT = 0;
const MAX_STRING_LENGTH = 30;

const getFormData = ({ item, taxType, show, setShow, type }) => ({
	sid             : item?.jobNumber || '_',
	customerName    : showOverflowingNumber(startCase(item?.customerName || '-'), MAX_STRING_LENGTH),
	estimatedProfit : showOverflowingNumber(formatAmount({
		amount   : item?.[`estimatedProfitAmount${taxType}`] || DEFAULT_AMOUNT,
		currency : item?.currency,
		options  : {
			style                 : 'currency',
			currencyDisplay       : 'code',
			maximumFractionDigits : 2,
		},
	}), MAX_STRING_LENGTH),
	actualProfit: showOverflowingNumber(formatAmount({
		amount   : item?.[`${LABEL_MAPPING[type]}ProfitAmount${taxType}`] || DEFAULT_AMOUNT,
		currency : item?.currency,
		options  : {
			style                 : 'currency',
			currencyDisplay       : 'code',
			maximumFractionDigits : 2,
		},
	}), MAX_STRING_LENGTH),
	deviation: formatAmount({
		amount   : item?.[`${LABEL_MAPPING[type]}ProfitAmountDeviation${taxType}`] || DEFAULT_AMOUNT,
		currency : item?.currency,
		options  : {
			style                 : 'currency',
			currencyDisplay       : 'code',
			maximumFractionDigits : 2,
		},
	}),
	action: (
		<div className={styles.arrow_container}>
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
