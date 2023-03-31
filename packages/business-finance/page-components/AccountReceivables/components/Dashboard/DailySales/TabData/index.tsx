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

interface TabDataProps {
	toggleData?: boolean,
	loading?: boolean,
	dailyStatsData?: object,
	subActiveTab?: string,
	setSubActiveTab?: (p: string) => void,
	filters?: object,
	filterValue?: object
}

function TabData({
	toggleData, loading, dailyStatsData, subActiveTab, setSubActiveTab,
	filters, filterValue,
} : TabDataProps) {
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
			<CardComponent
				subActiveTab={subActiveTab}
				dailyStatsData={dailyStatsData}
				toggleData={toggleData}
				loading={loading}
				filters={filters}
				filterValue={filterValue}
			/>
		</div>
	);
}
export default TabData;
