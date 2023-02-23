import { useState } from 'react';

import EnrichmentTable from './components/EnrichmentTable';
import Header from './components/Header';
import PrimaryTabs from './components/PrimaryTabs';
import Statistics from './components/Statistics';
import styles from './styles.module.css';

function Enrichment() {
	const [activeTab, setActiveTab] = useState('enrichment_requests');

	return (

		<>
			<div className={styles.title}>Enrichment Data</div>

			<PrimaryTabs activeTab={activeTab} setActiveTab={setActiveTab} />

			<Header activeTab={activeTab} setActiveTab={setActiveTab} />

			<Statistics />

			<EnrichmentTable />
		</>

	);
}

export default Enrichment;
