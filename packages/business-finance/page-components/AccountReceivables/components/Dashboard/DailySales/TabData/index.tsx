import React from 'react';

import CardComponent from './CardComponent';
import SalesComponent from './SalesComponent';
import styles from './styles.module.css';

interface TabDataProps {
	toggleData?: boolean,
	loading?: boolean,
	dailyStatsData?: object,
	subActiveTab?: string,
	setSubActiveTab?: (p: string) => void,
	filters?: object,
	filterValue?: object
	entityCode?: string
}

const tabs = [
	{
		key   : 'SALES_INVOICE',
		label : 'Revenue',
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
	SALES_INVOICE    : SalesComponent,
	CREDIT_NOTE      : CardComponent,
	SHIPMENT_CREATED : CardComponent,
};

function TabData({
	toggleData, loading, dailyStatsData, subActiveTab, setSubActiveTab,
	filters, filterValue, entityCode,
} : TabDataProps) {
	const tabComponentProps = {
		SALES_INVOICE: {
			subActiveTab,
			dailyStatsData,
			toggleData,
			loading,
			filters,
			filterValue,
			entityCode,
		},
		CREDIT_NOTE: {
			subActiveTab,
			dailyStatsData,
			toggleData,
			loading,
			filters,
			filterValue,
			entityCode,
		},
		SHIPMENT_CREATED: {
			subActiveTab,
			dailyStatsData,
			toggleData,
			loading,
			filters,
			filterValue,
			entityCode,
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
