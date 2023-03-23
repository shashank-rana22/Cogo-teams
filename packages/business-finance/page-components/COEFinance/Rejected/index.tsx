import { useRouter } from '@cogoport/next';
import React, { useState, useEffect } from 'react';

import CommonListData from './CommonListData';
import styles from './styles.module.css';

const tabs = [
	{
		key   : 'finance_rejected',
		label : 'Finance Rejected',
	},
	{
		key   : 'coe_rejected',
		label : 'COE Rejected',
	},
];

const tabsKeyComponentMapping = {
	finance_rejected : CommonListData,
	coe_rejected     : CommonListData,
};

function Rejected({ statsData }) {
	const { push } = useRouter();
	const [filters, setFilters] = useState({});
	const { FINANCE_REJECTED = '', COE_REJECTED = '' } = statsData || {};
	const [subActiveTabReject, setSubActiveTabReject] = useState<string>('finance_rejected');

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
	};

	const ActiveTabComponent = tabsKeyComponentMapping[subActiveTabReject] || null;

	const handleTabChange = (tab) => {
		setSubActiveTabReject(tab.key);
	};

	useEffect(() => {
		push(
			'/business-finance/coe-finance/[active_tab]/[view]',
			`/business-finance/coe-finance/rejected/${subActiveTabReject}`,
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
									{tab.key === 'finance_rejected' ? FINANCE_REJECTED : COE_REJECTED }
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
