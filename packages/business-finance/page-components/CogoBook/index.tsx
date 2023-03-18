import { TabPanel, Tabs } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import Accruals from './Accruals';
import BalanceSheet from './BalanceSheet';
import PLStatement from './P&L';
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
	{
		key   : 'balance_sheet',
		label : 'Balance Sheet',
	},
];

const tabsKeyComponentMapping = {
	accruals      : Accruals,
	pl_statement  : PLStatement,
	balance_sheet : BalanceSheet,
};

function CogoBook() {
	const { query, push } = useRouter();
	const [activeTab, setActiveTab] = useState<string>(query.activeTab || 'accruals');

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
	const onChange = (view:string) => {
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
					onChange={(tab:string) => onChange(tab)}
					fullWidth
					themeType="primary"
				>
					{tabs.map(({ key = '', label = '' }) => (
						<TabPanel
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
