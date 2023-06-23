import formatAmount from '@cogoport/globalization/utils/formatAmount';

import showOverflowingNumber from '../../../../../../commons/showOverflowingNumber';
import CheckboxItem from '../../../../../commons/ExcludeList/CheckboxItem';

export const config = (
	{
		uncheckedRows,
		setUncheckedRows,
	},
) => [
	{
		Header   : '',
		id       : 'checkbox',
		accessor : (row?:object) => (
			<CheckboxItem
				uncheckedRows={uncheckedRows}
				setUncheckedRows={setUncheckedRows}
				row={row}
				feature="campaign-management"
			/>
		),
	},
	{
		Header   : 'Customer Name',
		id       : 'tradePartyDetailName',
		accessor : ({ tradePartyDetailName }) => <div>{showOverflowingNumber(tradePartyDetailName, 24)}</div>,
	},
	{
		Header   : 'Total Outstanding',
		id       : 'outstandingAmount',
		accessor : ({ outstandingAmount, ledCurrency }) => (
			<div>
				{formatAmount({
					amount   : outstandingAmount,
					currency : ledCurrency,
					options  : {
						style                 : 'currency',
						currencyDisplay       : 'code',
						maximumFractionDigits : 2,
					},
				})}
			</div>
		),
	},
	{
		Header   : 'On Account',
		id       : 'onAccountAmount',
		accessor : ({ onAccountAmount, ledCurrency }) => (
			<div>
				{formatAmount({
					amount   : onAccountAmount,
					currency : ledCurrency,
					options  : {
						style                 : 'currency',
						currencyDisplay       : 'code',
						maximumFractionDigits : 2,
					},
				})}
			</div>
		),
	},
];

export default config;
