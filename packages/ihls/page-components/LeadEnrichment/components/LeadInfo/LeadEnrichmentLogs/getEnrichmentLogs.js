import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase, format } from '@cogoport/utils';

const getEnrichmentColumns = () => [
	{
		Header   : 'REQUEST NAME',
		key      : 'request_name',
		id       : 'request_name',
		accessor : ({ request_name }) => (
			<section>
				{request_name || '___'}
			</section>
		),
	},
	{
		Header   : 'ENRICHMENT AGENCY',
		key      : 'enrichment_agency',
		id       : 'enrichment_agency',
		accessor : ({ source_name }) => (
			<section>
				{startCase(source_name || '___')}
			</section>
		),
	},
	{
		Header   : 'ENRICHMENT STATUS',
		key      : 'enrichment_status',
		id       : 'enrichment_status',
		accessor : ({ enrichment_status }) => (
			<section>
				{startCase(enrichment_status || '___')}
			</section>
		),
	},
	{
		Header   : 'USERS ENRICHED',
		key      : 'users_enriched',
		id       : 'users_enriched',
		accessor : ({ users_enriched }) => (
			users_enriched
		),
	},
	{
		Header   : 'ENRICHMENT DATE',
		key      : 'created_at',
		id       : 'created_at',
		accessor : ({ created_at = '' }) => (
			<section>
				{created_at ? format(created_at, GLOBAL_CONSTANTS.formats.date['dd MMM yyyy']) : '___'}
			</section>
		),
	},
];

export default getEnrichmentColumns;
