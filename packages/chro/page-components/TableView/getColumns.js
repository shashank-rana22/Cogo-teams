import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';

import ActionPopover from './ActionPopover';
import styles from './styles.module.css';

const LAKHS_CONVERSION_NUMBER = 100000;
const VARIABLE_PAY_THRESHOLD = 0;

const getColumns = ({ setCtcBreakup, onFinalSubmit = () => {}, activeTab, updateOfferLetterLoading }) => [
	{
		Header   : 'NAME & EMAIL',
		accessor : (item) => (
			<div className={styles.name_and_email}>
				<div className={styles.name}>{item?.employee_detail?.name || '-'}</div>
				{item?.employee_detail?.cogoport_email || item?.employee_detail?.personal_email || null}
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
				sign_on_bonus_yearly = 0, retention_bonus_twice_yearly = 0,
				retention_bonus_thrice_yearly = 0,
			} = metadata || {};

			const variable_pay = (Number(joining_bonus_yearly)
				+ Number(retention_bonus_yearly)
				+ Number(performance_linked_variable_yearly) + Number(sign_on_bonus_yearly)
				+ Number(retention_bonus_twice_yearly) + Number(retention_bonus_thrice_yearly))
				|| VARIABLE_PAY_THRESHOLD;

			return (
				<div>
					Rs.
					{' '}
					{init / LAKHS_CONVERSION_NUMBER}
					{' '}
					LPA (fixed)
					{variable_pay > VARIABLE_PAY_THRESHOLD
						? ` + Rs. ${variable_pay / LAKHS_CONVERSION_NUMBER} LPA (variable)`
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
				{activeTab === 'active' ? (
					<>
						<ActionPopover
							item={item}
							onFinalSubmit={onFinalSubmit}
							updateOfferLetterLoading={updateOfferLetterLoading}
						/>

						<Button
							onClick={() => onFinalSubmit({ id: item?.id, status: 'approved' })}
							themeType="primary"
							style={{ marginLeft: 8 }}
							loading={updateOfferLetterLoading}
						>
							Approve
						</Button>
					</>
				) : (
					<div
						style={{
							background   : item?.status === 'approved' ? 'lightgreen' : '#ff6865',
							color        : item?.status === 'approved' ? '' : '#fff',
							padding      : '2px 5px',
							borderRadius : 4,
						}}
					>
						{startCase(item?.status)}
					</div>
				)}
			</div>
		),
	},
];

export default getColumns;
