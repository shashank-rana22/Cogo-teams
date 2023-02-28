import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

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
	const { push, query } = useRouter();
	const [filters, setFilters] = useState({});
	const [subActiveTab, setSubActiveTab] = useState<string>(() => query.view || tabs[0].key);
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
	const onChange = (view) => {
		setSubActiveTab(view);
		push(
			'/business-finance/coe-finance/[active_tab]/[view]',
			`/business-finance/coe-finance/rejected/${view}` as never as null,
		);
	};

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
								onChange(tab.key);
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
