import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';

import ActionPopover from './ActionPopover';
import styles from './styles.module.css';

const getColumns = ({ setCtcBreakup, onFinalSubmit = () => {} }) => [
	{
		Header   : 'NAME & EMAIL',
		accessor : (item) => (
			<div className={styles.name_and_email}>
				<div className={styles.name}>{item?.employee_detail?.name || '-'}</div>
				{item?.employee_detail?.personal_email || null}
			</div>
		),
	},
	{
		Header   : 'ROLE',
		accessor : (item) => (
			<div>{startCase(item?.employee_detail?.designation || '-')}</div>
		),
	},
	{
		Header   : 'REPORTING MANAGER EMAIL',
		accessor : (item) => (
			<div>{item?.employee_detail?.hiring_manager_email || '-'}</div>
		),
	},
	{
		Header   : 'DATE OF JOINING',
		accessor : (item) => (
			<div>
				{formatDate({
					date       : item?.employee_detail?.date_of_joining || null,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMMM yyyy'],
					formatType : 'date',
				}) || '-'}
			</div>
		),
	},
	{
		Header   : 'CTC OFFERED',
		accessor : (item) => {
			const { metadata } = item || {};
			const {
				init = 0, joining_bonus_yearly = 0,
				retention_bonus_yearly = 0, performance_linked_variable_yearly = 0,
			} = metadata || {};

			const variable_pay = (joining_bonus_yearly
				+ retention_bonus_yearly
				+ performance_linked_variable_yearly) || 0;

			return (
				<div>
					Rs.
					{' '}
					{init}
					{' '}
					LPA (fixed)
					{variable_pay > 0 ? ` + Rs. ${variable_pay} LPA (variable)`
						: null}
				</div>
			);
		},
	},
	{
		Header   : 'FULL CTC BREAKUP',
		accessor : (item) => (
			<div>
				<Button
					type="button"
					themeType="tertiary"
					style={{ textDecoration: 'underline' }}
					onClick={() => setCtcBreakup(item)}
				>
					View
				</Button>
			</div>
		),
	},
	{
		Header   : 'ACTION',
		accessor : (item) => (
			<div className={styles.button_container}>
				<ActionPopover item={item} onFinalSubmit={onFinalSubmit} />

				<Button
					onClick={() => onFinalSubmit({ id: item?.id, status: 'approved' })}
					themeType="primary"
					style={{ marginLeft: 8 }}
				>
					Approve
				</Button>
			</div>
		),
	},
];

export default getColumns;
