import React from 'react';

import LeadTable from '../../commons/LeadTable';

import getEnrichmentColumns from './getEnrichmentLogs';
import styles from './styles.module.css';

const LOG_DATA = [
	{
		enrichment_attempt : 10,
		enrichment_agency  : 'Yash Enrichers',
		enriched_date      : '2023-03-01',
		contact_enrichment : ['phone', 'email', 'whatsapp'],
	},
];

function EnrichmentInfo() {
	const columns = getEnrichmentColumns();
	return (
		<div className={styles.container}>
			<LeadTable columns={columns} data={LOG_DATA} loading={false} />
		</div>
	);
}

export default EnrichmentInfo;
