import { Button } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals.json';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const getColumns = (setCtcBreakup) => [
	{
		Header   : 'NAME & EMAIL',
		accessor : (item) => (
			<div className={styles.name_and_email}>
				<div className={styles.name}>{item?.name || 'Shivam Singh'}</div>
				{item?.personal_email || 'shivam.singh@cogoport.com'}
			</div>
		),
	},
	{
		Header   : 'ROLE',
		accessor : (item) => (
			<div>
				{startCase(item?.designation || 'frontend engineer')}
			</div>
		),
	},
	{
		Header   : 'REPORTING MANAGER',
		accessor : (item) => (
			<div>
				{item?.reporting_manager || 'Khushal Paliwal'}
			</div>
		),
	},
	{
		Header   : 'DATE OF JOINING',
		accessor : (item) => (
			<div>
				{formatDate({
					date       : item.date_of_joining || new Date(),
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMMM yyyy'],
					formatType : 'date',
				})}
			</div>
		),
	},
	{
		Header   : 'CTC OFFERED',
		accessor : (item) => (
			<div>
				Rs. 1000000LPA (fixed) + Rs. 150000LPA (variable)
			</div>
		),
	},
	{
		Header   : 'FULL CTC BREAKUP',
		accessor : (item) => (
			<div>
				<Button
					type="button"
					themeType="tertiary"
					style={{ textDecoration: 'underline' }}
					onClick={() => setCtcBreakup(item?.id)}
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
				<Button themeType="secondary">Reject</Button>
				<Button themeType="primary" style={{ marginLeft: 8 }}>Approve</Button>
			</div>
		),
	},
];

export default getColumns;
