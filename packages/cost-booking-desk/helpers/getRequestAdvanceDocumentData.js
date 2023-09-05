import { Tooltip } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import styles from './styles.module.css';

const ONE_OPTION = 1;
const MAXIMUM_FRACTION_DIGITS = 2;
const REMARK_LENGTH_LIMIT = 30;

const getRequestAdvanceDocumentData = ({ viewRequestModal:{ data = {} } = {} }) => {
	const {
		details = {},
		currency = '',
		paymentMode = '',
		remarks = '',
	} = data || {};

	const {
		numberOfContainers = '',
		amountPerContainer = '',
	} = details || {};

	return (
		[
			{
				title : 'Amount per container',
				value : formatAmount({
					amount  : amountPerContainer,
					currency,
					options : {
						style                 : 'currency',
						currencyDisplay       : 'code',
						maximumFractionDigits : MAXIMUM_FRACTION_DIGITS,
					},
				}),
			},
			{
				title : 'Number of containers',
				value : `${numberOfContainers} Container${numberOfContainers > ONE_OPTION ? 's' : ''}`,
			},
			{
				title : 'Total Amount to be paid',
				value : (amountPerContainer && numberOfContainers)
					? formatAmount({
						amount  : amountPerContainer * numberOfContainers,
						currency,
						options : {
							style                 : 'currency',
							currencyDisplay       : 'code',
							maximumFractionDigits : MAXIMUM_FRACTION_DIGITS,
						},
					}) : currency,
			},
			{ title: 'Payment Mode', value: paymentMode },
			{
				title: 'Remark',
				value:
	<div>
		{remarks?.length >= REMARK_LENGTH_LIMIT ? (
			<Tooltip
				placement="top"
				content={<div className={styles.tooltip_text}>{remarks}</div>}
				interactive
			>
				<div className={styles.remark_overflow}>
					{remarks}
					...
				</div>
			</Tooltip>
		) : (
			remarks
		)}
	</div>,
			},
		]
	);
};

export default getRequestAdvanceDocumentData;
