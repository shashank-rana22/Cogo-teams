import { cl, Popover } from '@cogoport/components';
import { IcMArrowDown } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

export const getFnfColumns = ({ onStatusChange = () => {} }) => [
	{ Header: 'PARTICULARS', accessor: 'companyLoan' },
	{ Header: 'RECOVERABLE AMOUNT', accessor: 'advanceAmount' },
	{
		Header   : 'STATUS',
		accessor : (item) => (
			<div
				className={cl`${styles.pending_flex}
				${styles[(item.status === null || item.status === 'not_recovered')
					? 'pending_color' : 'approved_color']}`}
			>
				<div style={{ display: 'flex', alignItems: 'center', marginRight: '6px' }}>
					<div className={cl`${styles.pending_dot}
					${styles[(item.status === null || item.status === 'not_recovered')
						? 'pending_color_bg' : 'approved_color_bg']}`}
					/>
					{startCase((item.status === null || item.status === 'not_recovered'))
						? 'Not recovered' : 'Recovered' || '-'}
				</div>
				<Popover
					caret={false}
					placement="bottom"
					render={(
						<div>
							<div
								aria-hidden
								onClick={() => onStatusChange({ id: item.id, status: 'not_recovered' })}
								className={styles.popover_red}
							>
								Not Recovered
							</div>

							<div
								aria-hidden
								className={styles.popover_green}
								onClick={() => onStatusChange({ id: item.id, status: 'recovered' })}
							>
								Recovered
							</div>
						</div>
					)}
				>
					<div style={{ alignItems: 'center' }}>
						<IcMArrowDown
							style={{ marginTop: '8px', cursor: 'pointer' }}
							width={16}
							height={16}
						/>
					</div>
				</Popover>
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
        ${styles[item.status === 'Pending' ? 'pending_color' : 'approved_color']}`}
			>
				<div className={cl`${styles.pending_dot} 
            ${styles[item.status === 'Pending' ? 'pending_color_bg' : 'approved_color_bg']}`}
				/>
				{startCase(item?.status) || '-'}
			</div>
		),
	},
];
