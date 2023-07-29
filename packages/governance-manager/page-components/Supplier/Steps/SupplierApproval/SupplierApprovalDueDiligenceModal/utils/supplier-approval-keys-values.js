const ZERO = 0;

export const comapany_detail_objects = ({ data }) => [{
	key   : 'Company Name',
	value : data?.data?.statutoryRegistration?.lei?.[ZERO].name,
}, {
	key   : 'Corporate Indentification Number (CIN)',
	// value : 'CIN1234413409',
	value : data?.a,
}, {
	key   : 'E-Filling Status',
	// value : 'Status',
	value : data?.a,
}, {
	key   : 'Director Name',
	value : data?.data?.statutoryRegistration?.gst?.[ZERO].legalName,
}, {
	key   : 'LEI Code',
	value : data?.data?.statutoryRegistration?.lei?.[ZERO].lei,
}, {
	key   : 'LEI Status',
	value : data?.data?.statutoryRegistration?.lei?.[ZERO].entityStatus,
},
];

export const financial_detail_objects = ({ data }) => [{
	key   : 'Net Revenue',
	// value : 'INR 30,00,000.24',
	value : data?.a,
}, {
	key   : 'Long Term Borrowings',
	// value : 'INR 30,00,000.24',
	value : data?.a,
}, {
	key   : 'Deferred Tax Liabilities Net',
	// value : 'INR 30,00,000.24',
	value : data?.a,
}, {
	key   : 'Reserves',
	// value : 'INR 30,00,000.24',
	value : data?.a,
}, {
	key   : 'EBITDA',
	// value : 'INR 30,00,000.24',
	value : data?.a,
}, {
	key   : 'Current Ratio',
	// value : '1.2',
	value : data?.a,
}, {
	key   : 'D/E Ratio',
	// value : '1.4',
	value : data?.a,
},
];

export const director_detail_objects = ({ data }) => [{
	key   : 'Company Name',
	// value : 'Salman Khan Cab Services',
	value : data?.a,
}, {
	key   : 'Corporate Indentification Number (CIN)',
	// value : 'CIN1234413409',
	value : data?.a,
}, {
	key   : 'E-Filling Status',
	// value : 'Status',
	value : data?.a,
},
];

export const generic_detail_objects = ({ data }) => [{
	key   : 'Company Registered Since',
	// value : '2016',
	value : data?.data?.statutoryRegistration?.gst?.[ZERO]?.dateOfRegistration,
}, {
	key   : 'Charge ID',
	// value : 'CIN1234413409',
	value : data?.a,
}, {
	key   : 'Status',
	// value : 'Status',
	value : data?.a,
}, {
	key   : 'Date',
	// value : 'Status',
	value : data?.a,
}, {
	key   : 'Holder Name',
	// value : 'Status',
	value : data?.a,
},
];

export const shareholder_detail_objects = ({ data }) => [{
	key   : 'Financial Year',
	value : data?.a,
}, {
	key   : 'Total No. of Equity Shares',
	value : data?.a,
}, {
	key   : 'Total No. of Preference Shares',
	value : data?.a,
}, {
	key   : 'No. of Promoter Shareholders',
	value : data?.a,
}, {
	key   : 'No. of Public Shareholders',
	value : data?.a,
}, {
	key   : 'Total No. of Shareholders',
	value : data?.a,
},
];

export const legal_detail_objects = ({ data }) => [{
	key   : 'Case Type',
	value : data?.a,
}, {
	key   : 'Filed by or Filed Against',
	value : data?.a,
}, {
	key   : 'Case Status',
	value : data?.a,
},
];
