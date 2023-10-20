import { Avatar } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

import styles from './styles.module.css';

const PAYMENT_TYPE_MAPPING = {
	bonus                   : 'Bonus',
	salary_structured_bonus : 'Salary incentive',
	byod                    : 'BYOD',
	arrear                  : 'Arrear',
	gift                    : 'Gift',
};

const TAXATION_MAPPING = {
	current : 'Now',
	future  : 'Future',
};

export const columns = [
	{
		Header   : 'NAME',
		accessor : (item) => (
			<div className={styles.table_item}>
				<Avatar personName={item?.name} size="40px" />
				<span>
					{`${item?.name} (${item?.employee_code})`}
				</span>
			</div>
		),
	},
	{ Header: 'AMOUNT', accessor: 'amount' },
	{
		Header   : 'TYPE OF PAYMENT',
		accessor : (item) => (
			<span>
				{PAYMENT_TYPE_MAPPING[item?.payment_type]}
			</span>
		),
	},
	{
		Header   : 'DESCRIPTION',
		accessor : (item) => <span>{item?.description ? item?.description : '-'}</span>,
	},
	{
		Header   : 'TAXATION',
		accessor : (item) => (
			<span>{TAXATION_MAPPING[item?.tds_recovery_method]}</span>
		),
	},
	{
		Header   : 'FROM DATE',
		accessor : (item) => (
			<span>
				{item?.from_date ? formatDate({
					date       : item?.from_date,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MMM/yy'],
					formatType : 'date',
				}) : '-'}
			</span>
		),
	},
	{
		Header   : 'TO DATE',
		accessor : (item) => (
			<span>
				{item?.to_date ? formatDate({
					date       : item?.to_date,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MMM/yy'],
					formatType : 'date',
				}) : '-'}
			</span>
		),
	},
	{
		Header   : 'RECURRENCE',
		accessor : (item) => (
			<span>
				{item?.recurring_interval === GLOBAL_CONSTANTS.zeroth_index
					? 'None' : item?.recurring_interval}
			</span>
		),
	},
	{
		Header   : 'STATUS',
		accessor : (item) => <span>{item?.payment_status ? item?.payment_status : '-'}</span>,
	},
];
