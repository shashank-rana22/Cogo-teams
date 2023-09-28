import { Tabs, TabPanel } from '@cogoport/components';
import { useState } from 'react';

import Accounts from './components/Accounts';
import EnrichmentRequests from './components/EnrichmentRequests';

const LEAD_ENRICHMENT_TABS = {
	lead_dasdhoard: {
		name      : 'lead_dasdhoard',
		title     : 'Lead Dashboard',
		Component : Accounts,
	},
	enrichment_requests: {
		name      : 'enrichment_requests',
		title     : 'Enrichment Requests',
		Component : EnrichmentRequests,
	},
};

function LeadEnrichment() {
	const [activeTab, setActiveTab] = useState('lead_dasdhoard');

	return (
		<Tabs
			activeTab={activeTab}
			themeType="primary"
			onChange={setActiveTab}
		>
			{Object.values(LEAD_ENRICHMENT_TABS).map((item) => {
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

export default LeadEnrichment;
