import { startCase } from '@cogoport/utils';

const getEnrichmentColumns = () => [
	{
		Header   : 'ENRICHMENT ATTEMPT',
		key      : 'enrichment_attempt',
		id       : 'enrichment_attempt',
		accessor : ({ enrichment_attempt }) => (
			<section>
				{enrichment_attempt || '___'}
			</section>
		),
	},
	{
		Header   : 'ENRICHMENT AGENCY',
		key      : 'enrichment_agency',
		id       : 'enrichment_agency',
		accessor : ({ enrichment_agency }) => (
			<section>
				{startCase(enrichment_agency || '___')}
			</section>
		),
	},
	{
		Header   : 'ENRICHMENT DATE',
		key      : 'enrichment_date',
		id       : 'enrichment_date',
		accessor : ({ enriched_date = '' }) => (
			enriched_date
		),
	},
	{
		Header   : 'ENRICHMENT',
		key      : 'contact_enrichment',
		id       : 'contact_enrichment',
		accessor : ({ contact_enrichment }) => (
			contact_enrichment
		),
	},
];

export default getEnrichmentColumns;
