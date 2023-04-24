const EMPTY_PORT = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/empty-chat.jpg';
// eslint-disable-next-line max-len
const EMPTY_CHART = 'https://cogoport-testing.sgp1.digitaloceanspaces.com/e3d9b8569d67ea2cfe336581fd4d7c14/empty_3.svg';

const EMPTY_CUSTOMER_CARD = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/empty-state-file.svg';

const SORT_OPTIONS = [
	{ label: 'Newest Arrival', value: 'newest' },
	{ label: 'Profitability (High to Low)', value: 'profitability_high' },
	{ label: 'Profitability (Low to High)', value: 'profitability_low' },
	{ label: 'Port Pair request (High to Low)', value: 'request_high' },
	{ label: 'Port Pair request (Low to High)', value: 'request_low' },
];

const SERVICE_MAPPING = [];

export { EMPTY_PORT, EMPTY_CHART, EMPTY_CUSTOMER_CARD, SORT_OPTIONS, SERVICE_MAPPING };
