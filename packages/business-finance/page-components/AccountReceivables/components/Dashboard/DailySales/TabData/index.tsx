import React from 'react';

import CardComponent from './CardComponent';
import styles from './styles.module.css';

const tabs = [
	{
		key   : 'SALES_INVOICE',
		label : 'Sales Invoice',
	},
	{
		key   : 'CREDIT_NOTE',
		label : 'Credit Note',
	},
	{
		key   : 'SHIPMENT_CREATED',
		label : 'Shipments Created',
	},
];

const tabsKeyComponentMapping = {
	SALES_INVOICE    : CardComponent,
	CREDIT_NOTE      : CardComponent,
	SHIPMENT_CREATED : CardComponent,
};

function TabData({ toggleData, loading, dailyStatsData, subActiveTab, setSubActiveTab, filters, filterValue }) {
	const tabComponentProps = {
		SALES_INVOICE: {
			subActiveTab,
			dailyStatsData,
			toggleData,
			loading,
			filters,
			filterValue,
		},
		CREDIT_NOTE: {
			subActiveTab,
			dailyStatsData,
			toggleData,
			loading,
			filters,
			filterValue,
		},
		SHIPMENT_CREATED: {
			subActiveTab,
			dailyStatsData,
			toggleData,
			loading,
			filters,
			filterValue,
		},
	};

	const ActiveTabComponent = tabsKeyComponentMapping[subActiveTab] || null;
	const onChange = (view:string) => {
		setSubActiveTab(view);
	};

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

							</div>

						</div>
					))}
				</div>

			</div>
			{ActiveTabComponent && <ActiveTabComponent key={subActiveTab} {...tabComponentProps[subActiveTab]} />}
		</div>
	);
}
export default TabData;
