import { useRouter } from '@cogoport/next';
import React, { useState, useEffect } from 'react';

import CommonListData from './CommonListData';
import styles from './styles.module.css';

const tabs = [
	{
		key   : 'coe_rejected',
		label : 'COE Rejected',
	},
	{
		key   : 'coe_on_hold',
		label : 'COE On Hold',
	},
	{
		key   : 'finance_rejected',
		label : 'Finance Rejected',
	},
];

const tabsKeyComponentMapping = {
	finance_rejected : CommonListData,
	coe_rejected     : CommonListData,
	coe_on_hold      : CommonListData,
};

function Rejected({ statsData = {} }) {
	const { push } = useRouter();
	const [filters, setFilters] = useState({});

	const [subActiveTabReject, setSubActiveTabReject] = useState('coe_rejected');

	const { FINANCE_REJECTED = '', COE_REJECTED = '', ON_HOLD = '' } = statsData || {};

	const statsDataMapping = {
		finance_rejected : FINANCE_REJECTED,
		coe_rejected     : COE_REJECTED,
		coe_on_hold      : ON_HOLD,
	};

	const tabComponentProps = {
		finance_rejected: {
			filters,
			setFilters,
			subActiveTabReject,
		},
		coe_rejected: {
			filters,
			setFilters,
			subActiveTabReject,
		},
		coe_on_hold: {
			filters,
			setFilters,
			subActiveTabReject,
		},
	};

	const ActiveTabComponent = tabsKeyComponentMapping[subActiveTabReject] || null;

	const handleTabChange = (tab) => {
		setSubActiveTabReject(tab.key);
	};

	useEffect(() => {
		push(
			'/business-finance/audit-function/[active_tab]/[view]',
			`/business-finance/audit-function/rejected/${subActiveTabReject}`,
		);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [subActiveTabReject]);

	return (
		<div>

			<div className={styles.container}>

				<div className={styles.flex}>

					{tabs.map((tab) => (
						<div
							key={tab.key}
							onClick={() => {
								handleTabChange(tab);
							}}
							role="presentation"
						>
							<div className={tab.key === subActiveTabReject
								? styles.sub_container_click : styles.sub_container}
							>
								{tab.label}
								<div className={styles.badge}>
									{statsDataMapping[tab.key]}
								</div>

							</div>

						</div>
					))}
				</div>

			</div>
			{ActiveTabComponent && (
				<ActiveTabComponent
					key={subActiveTabReject}
					{...tabComponentProps[subActiveTabReject]}
				/>
			)}
		</div>
	);
}
export default Rejected;
