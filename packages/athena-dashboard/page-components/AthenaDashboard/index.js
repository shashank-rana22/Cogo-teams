import { Tabs, TabPanel } from '@cogoport/components';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import Shipment from './Shipment';
import Trends from './Trend';

const getAthenaDashboardMapping = ({ t = () => {} }) => ({
	shipments: {
		name      : 'shipments',
		title     : t('athenaDashboard:tabs_shipments_label'),
		Component : Shipment,
	},
	trends: {
		name      : 'trends',
		title     : t('athenaDashboard:tabs_trends_labels'),
		Component : Trends,
	},
});

function AthenaDashboard() {
	const { t } = useTranslation(['athenaDashboard']);

	const [activeTab, setActiveTab] = useState('shipments');

	const athenaDashboardMapping = getAthenaDashboardMapping({ t });

	return (
		<Tabs
			activeTab={activeTab}
			fullWidth
			themeType="primary"
			onChange={setActiveTab}
		>
			{Object.values(athenaDashboardMapping).map((item) => {
				const { name = '', title = '', Component } = item;

				if (!Component) return null;

				return (
					<TabPanel
						key={name}
						name={name}
						title={title}
					>
						<Component />
					</TabPanel>
				);
			})}
		</Tabs>
	);
}
export default AthenaDashboard;
