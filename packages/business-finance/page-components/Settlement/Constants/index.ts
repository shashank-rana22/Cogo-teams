export const EMPTY_LINE_ITEMS = ({
	entityCode   : '',
	accMode      : '',
	glCode       : '',
	tradePartyId : '',
	type         : 'CREDIT',
	amount       : '',
});

export const AR_FILE_URL =	'https://cogoport-production.sgp1.digitaloceanspaces.com'
+ '/f9d559fd0f5f48f69a1b2d05ecd0cda9/Sample-AR-BulkUpload.xlsx';
export const AP_FILE_URL =	'https://cogoport-production.sgp1.digitaloceanspaces.com'
+ '/8a2e2474b9b779cb1cc4c741bc50c5d1/Sample-AP-BulkUpload.xlsx';

export const STEPPER_ITEMS_DOWNLOAD_FILE_FORMAT = [
	{ title: 'Select Trade Party', key: 'tradeParty' },
	{ title: 'Select Bank Name', key: 'bankName' },
];

export const TRADE_PARTY_OPTIONS = [
	{ name: 'R1', value: 'AP', label: 'AP' }, { name: 'R2', value: 'AR', label: 'AR' },
];
