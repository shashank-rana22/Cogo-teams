import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import styles from './styles.module.css';

const tableColumns = [
	{
		Header   : <div className={styles.table_heading}>ROLE NAME</div>,
		accessor : (item) => item?.name,
		id       : 'name',
	},
	{
		Header   : <div className={styles.table_heading}>TOTAL USERS</div>,
		accessor : (item) => item?.user_count,
		id       : 'user_count',
	},
	{
		Header: (
			<div className={styles.table_heading}>
				BUDGET (
				{GLOBAL_CONSTANTS.currency_code.USD}
				)
			</div>
		),
		accessor : (item) => item?.total_budget,
		id       : 'total_budget',
	},
	{
		Header   : <div className={styles.table_heading}>FREQUENCY</div>,
		accessor : (item) => item?.frequency,
		id       : 'frequency',
	},
	{
		Header   : <div className={styles.table_heading}>CREATED DATE</div>,
		accessor : (item) => item?.validity_start,
		id       : 'validity_start',
	},

	{
		Header: (
			<div className={styles.table_heading}>
				<div>STATUS</div>
			</div>
		),
		accessor : (item) => item?.status,
		id       : 'status',
	},
	{
		Header   : '',
		accessor : (item) => item?.dots,
		id       : 'dots',
	},
];
export default tableColumns;
