/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from '@cogoport/next';
import React, { useState, useEffect } from 'react';

import usePurchaseViewStats from '../hook/getPurchaseViewStats';

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

function Rejected() {
	const { push } = useRouter();
	const [filters, setFilters] = useState({});
	const [subActiveTab, setSubActiveTab] = useState<string>('finance_rejected');
	const tabComponentProps = {
		finance_rejected: {
			filters,
			setFilters,
			subActiveTab,
		},
		coe_rejected: {
			filters,
			setFilters,
			subActiveTab,
		},
	};

	const ActiveTabComponent = tabsKeyComponentMapping[subActiveTab] || null;

	useEffect(() => {
		push(
			'/business-finance/coe-finance/[active_tab]/[view]',
			`/business-finance/coe-finance/rejected/${subActiveTab}`,
		);
	}, [subActiveTab]);

	const { statsData }: any = usePurchaseViewStats();

	const { FINANCE_REJECTED = '', COE_REJECTED = '' } = statsData || {};

	return (
		<div>

			<div className={styles.container}>

				<div className={styles.flex}>

					{tabs.map((tab) => (
						<div
							key={tab.key}
							onClick={() => {
								setSubActiveTab(tab.key);
							}}
							role="presentation"
						>
							<div className={tab.key === subActiveTab
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
			{ActiveTabComponent && <ActiveTabComponent key={subActiveTab} {...tabComponentProps[subActiveTab]} />}
		</div>
	);
}
export default Rejected;
