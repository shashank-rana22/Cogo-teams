import { Tooltip, Toggle } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMDelete } from '@cogoport/icons-react';

import GetSortingData from '../components/ExceptionsManagement/sorting';

import styles from './styles.module.css';

const masterExceptionColumn = ({ sort, setSort }) => [
	{
		Header   : 'Customer Name',
		id       : 'name',
		accessor : (row) => (
			<div>
				<Tooltip
					content={(
						<div className={styles.tooltip_text}>
							{row?.name}
						</div>
					)}
					interactive
				>
					<div className={styles.customer_name}>
						{(row?.name as string).substring(0, 12)}
						...
					</div>
				</Tooltip>
			</div>
		),
	},
	{
		Header   : 'PAN',
		id       : 'registrationNumber',
		accessor : (row) => (
			<div className={styles.text}>
				{row?.registrationNumber}
			</div>
		),
	},
	{
		Header   : 'Category',
		id       : 'orgSegment',
		accessor : (row) => (
			<div className={styles.text}>
				{row?.orgSegment}
			</div>
		),
	},
	{
		Header   : <GetSortingData sort={sort} setSort={setSort} headerName="Credit Days" />,
		id       : 'creditDays',
		accessor : (row) => (
			<div className={styles.text}>
				{row?.creditDays}
			</div>
		),
	},
	{
		Header   : <GetSortingData sort={sort} setSort={setSort} headerName="Credit Amount" />,
		id       : 'creditAmount',
		accessor : (row) => (
			<div className={styles.text}>
				{formatAmount({
					amount   : row?.creditAmount,
					currency : 'INR',
					options  : {
						style                 : 'currency',
						currencyDisplay       : 'code',
						minimumFractionDigits : 2,
					},
				})}
			</div>
		),
	},
	{
		Header   : <GetSortingData sort={sort} setSort={setSort} headerName="Total Due" />,
		id       : 'totalDueAmount',
		accessor : (row) => (
			<div className={styles.text}>
				{formatAmount({
					amount   : row?.totalDueAmount,
					currency : 'INR',
					options  : {
						style                 : 'currency',
						currencyDisplay       : 'code',
						minimumFractionDigits : 2,
					},
				})}
			</div>
		),
	},
	{
		Header   : '',
		id       : 'toggle',
		accessor : () => (
			<div>
				<Toggle name="a1" size="md" showOnOff disabled={false} />
			</div>
		),
	},
	{
		Header   : '',
		id       : 'delete',
		accessor : () => (
			<div>
				<IcMDelete width={24} height={24} color="#2C3E50" />
			</div>
		),
	},
];

export default masterExceptionColumn;
