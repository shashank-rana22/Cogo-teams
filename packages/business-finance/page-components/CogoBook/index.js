import { TabPanel, Tabs } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import Accruals from './Accruals';
import ProfitAndLoss from './P&L';
import styles from './styles.module.css';

const tabs = [
	{
		key   : 'accruals',
		label : 'Accruals',
	},
	{
		key   : 'pl_statement',
		label : 'P&L Statement',
	},
];

const tabsKeyComponentMapping = {
	accruals     : Accruals,
	pl_statement : ProfitAndLoss,
};

function CogoBook() {
	const { push, query } = useRouter();
	const [activeTab, setActiveTab] = useState(query.active_tab || 'accruals');

	const tabComponentProps = {
		accruals: {
			activeTab,

		},
		pl_statement: {
			activeTab,

		},
		balance_sheet: {
			activeTab,

		},
	};
	const ActiveTabComponent = tabsKeyComponentMapping[activeTab] || null;
	const onChange = (view) => {
		setActiveTab(view);

		push(
			'/business-finance/cogo-book/[active_tab]',
			`/business-finance/cogo-book/${view}`,
		);
	};

	return (
		<div>
			<div className={styles.header}>
				<div className={styles.header_style}>
					Cogo Books
				</div>
			</div>
			<div className={styles.tabs_container}>
				<Tabs
					activeTab={activeTab}
					onChange={(tab) => onChange(tab)}
					fullWidth
					themeType="primary"
				>
					{tabs.map(({ key = '', label = '' }) => (
						<TabPanel
							key={key}
							name={key}
							title={label}
						>
							{ActiveTabComponent && (
								<ActiveTabComponent
									key={key}
									{...tabComponentProps[key]}
								/>
							)}
						</TabPanel>
					))}
				</Tabs>
			</div>
		</div>
	);
}
export default CogoBook;
