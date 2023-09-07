import { cl } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

export const fnfColumns = [
	{ Header: 'COMPANY LOAN', accessor: 'companyLoan' },
	{ Header: 'ADVANCE AMOUNT', accessor: 'advanceAmount' },
	{ Header: 'PENDING BILL', accessor: 'pendingBill' },
	{ Header: 'DUE SALARY', accessor: 'dueSalary' },
	{ Header: 'TOTAL FNF', accessor: 'totalFnf' },
	{
		Header   : 'STATUS',
		accessor : (item) => (
			<div className={cl`${styles.pending_flex}
			${styles[item.status === 'pending' ? 'pending_color' : 'approved_color']}`}
			>
				<div className={cl`${styles.pending_dot} 
				${styles[item.status === 'pending' ? 'pending_color_bg' : 'approved_color_bg']}`}
				/>
				{startCase(item?.status) || '-'}
			</div>
		),
	},
];

export const outstandingColumns = [
	{ Header: 'ACCOUNT NAME', accessor: 'accountName' },
	{ Header: 'TENURE', accessor: 'tenure' },
	{ Header: 'DUES', accessor: 'dues' },
	{ Header: 'OUTSTANDING AMT', accessor: 'outstandingAmt' },
	{ Header: 'DESCRIPTION', accessor: 'description' },
	{
		Header   : 'STATUS',
		accessor : (item) => (
			<div className={cl`${styles.pending_flex}
        ${styles[item.status === 'pending' ? 'pending_color' : 'approved_color']}`}
			>
				<div className={cl`${styles.pending_dot} 
            ${styles[item.status === 'pending' ? 'pending_color_bg' : 'approved_color_bg']}`}
				/>
				{startCase(item?.status) || '-'}
			</div>
		),
	},
];
