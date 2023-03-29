import { Tabs, TabPanel } from '@cogoport/components';
import { useState } from 'react';

import IngestionCP from './components/IngestionCP';
import IngestionIE from './components/IngestionIE';
import IngestionLeads from './components/IngestionLeads';
import styles from './styles.module.css';

const TAB_PANEL_MAPPING = {

	ingestion_cp: {
		name      : 'channel_partner',
		title     : 'Channel Partner',
		Component : IngestionCP,
	},
	ingestion_ie: {
		name      : 'import_export',
		title     : 'Import / Export',
		Component :	IngestionIE,
	},
	ingestion_leads: {
		name      : 'leads',
		title     : 'Leads',
		Component :	IngestionLeads,
	},
};

function Ingestion() {
	const [activeIngestion, setActiveIngestion] = useState('leads');

	return (
		<section className={styles.container} id="core_engine_container">
			<section className={styles.heading_container}>
				Ingestion
			</section>

			<div className={styles.tab_list}>
				<Tabs
					activeTab={activeIngestion}
					fullWidth
					themeType="primary"
					onChange={setActiveIngestion}
				>
					{Object.values(TAB_PANEL_MAPPING).map((item) => {
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
			</div>
		</section>
	);
}

export default Ingestion;
