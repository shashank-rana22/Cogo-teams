import styles from 'styles.module.css';

const controls = [
	{
		name           : 'shipment_type',
		type           : 'select',
		placeholder    : 'Service',
		theme          : 'admin',
		span           : 1,
		isClearable    : true,
		multiple       : true,
		defaultOptions : false,
		options        : [
			{ label: 'FCL Freight', value: 'fcl_freight' },
			{ label: 'LCL Freight', value: 'lcl_freight' },
			{ label: 'Air Freight', value: 'air_freight' },
			{ label: 'FTL Freight', value: 'ftl_freight' },
			{ label: 'LTL Freight', value: 'ltl_freight' },
			{ label: 'Haulage Freight', value: 'haulage_freight' },
			{ label: 'Trailer Freight', value: 'trailer_freight' },
			{ label: 'FCL Customs', value: 'fcl_customs' },
			{ label: 'LCL Customs', value: 'lcl_customs' },
			{ label: 'Air Customs', value: 'air_customs' },
		],
	},
	{
		name           : 'jobs',
		type           : 'select',
		placeholder    : 'Job Status',
		theme          : 'admin',
		span           : 3,
		isClearable    : true,
		multiple       : true,
		defaultOptions : false,
		options        : [
			{
				label : 'ALL',
				value : 'all',
			},
			{
				label : 'Open Jobs',
				value : 'openJobs',
			},
			{
				label : 'Operationally Closed',
				value : 'operationallyClosed',
			},
			{
				label : 'Closed Jobs',
				value : 'closedJobs',
			},
		],

	},
];

export default controls;
