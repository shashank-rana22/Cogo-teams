import styles from './styles.module.css';

const tdsPayableFilters = () => {
	console.log('hy');

	return ([
		{
			label       : 'Business Partner',
			name        : 'id',
			type        : 'asyncSelect',
			asyncKey    : 'trade_party_details',
			theme       : 'admin',
			valueKey    : 'id',
			size        : 'md',
			show        : true,
			// initialCall : true,
			// isClearable    : true,
			style       : { width: '100%', margin: '6px 0px 10px 0px' },
			span        : 6,
			placeholder : 'Business Partner',
			rules       : { required: 'Customer Name is required' },
			// className   : styles.businessPartner,
			className   : 'primaryfilter primary md',
		},
		{
			label        : 'TDS Certificate number',
			name         : 'tds_certificate_number',
			placeholder  : 'Enter certificate number',
			type         : 'text',
			span         : 3,
			show         : true,
			theme        : 'admin',
			size         : 'md',
			style        : { width: '100%', margin: '6px 0px 10px 0px' },
			showOptional : false,
		},
		{
			label       : 'TDS Type',
			name        : 'tds_deduction_type',
			type        : 'select',
			theme       : 'admin',
			size        : 'md',
			placeholder : 'TDS Style',
			show        : true,
			span        : 4,
			options     : [
				{ label: 'Normal', value: 'normal' },
				{ label: 'No - Deduction', value: 'no_deduction' },
				{ label: 'Lower - Deduction', value: 'lower_deduction' },
			],
			style        : { width: '100%', margin: '6px 0px 10px 0px' },
			showOptional : false,
		},

		{
			label       : 'Select New TDS Style',
			name        : 'tds_deduction_style',
			type        : 'select',
			placeholder : 'TDS Style',
			show        : true,
			theme       : 'admin',
			span        : 4,
			options     : [
				{ label: 'Gross Amount', value: 'gross' },
				{ label: 'Net Amount', value: 'net' },
				{ label: 'Gross - Taxable', value: 'gross_taxable' },
				{ label: 'Gross - Non - Taxable', value: 'gross_non_taxable' },
				{ label: 'Net - Taxable', value: 'net_taxable' },
				{ label: 'Random - Undefined', value: 'random' },
			],
			size         : 'md',
			style        : { width: '100%', margin: '6px 0px 10px 0px' },
			showOptional : false,
		},
		{
			label        : 'New TDS Rate (%)',
			name         : 'tds_deduction_rate',
			placeholder  : 'Enter New Tds Rate',
			type         : 'text',
			span         : 3,
			show         : true,
			theme        : 'admin',
			size         : 'md',
			style        : { width: '100%', margin: '6px 0px 10px 0px' },
			showOptional : false,
		},
		{
			label       : 'TDS Certificate Start Date ',
			name        : 'tds_certificate_start_date',
			type        : 'datepicker',
			placeholder : 'Date',

			theme : 'admin',
			size  : 'md',
			show  : true,
			style : { width: '100%', margin: '6px 0px 10px 0px' },
			// showOptional : false,
		},
		{
			label       : 'TDS Certificate End Date',
			name        : 'tds_certificate_end_date',
			type        : 'datepicker',
			placeholder : 'Date',

			theme : 'admin',
			size  : 'md',
			show  : true,
			style : { width: '100%', margin: '6px 0px 10px 0px' },
			// showOptional : false,
		},

	]
	);
};
export default tdsPayableFilters;
