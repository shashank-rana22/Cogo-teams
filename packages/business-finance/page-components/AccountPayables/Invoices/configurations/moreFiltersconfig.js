import getGeoConstants from '@cogoport/globalization/constants/geo';
import { CountrySpecificData } from '@cogoport/globalization/utils/CountrySpecificDetail';

const geo = getGeoConstants();
export const moreFilters = [
	{
		name    : 'Invoice Type',
		span    : 12,
		groupBy : [
			{
				name      : 'invoiceType',
				type      : 'tags',
				multiple  : true,
				className : 'primary md',
				span      : 12,
				options   : [
					{ label: 'Purchase', value: 'PURCHASE' },
					{ label: 'Proforma', value: 'PROFORMA' },
					{ label: 'Credit Note', value: 'CREDIT_NOTE' },
					{ label: 'Reimbursement', value: 'REIMBURSEMENT' },
				],
			},
		],
	},
	{
		label          : 'Service Type',
		name           : 'serviceType',
		type           : 'multiSelect',
		className      : 'primaryfilter primary md',
		isClearable    : true,
		multiple       : true,
		defaultOptions : false,
		selectWidth    : '178px',
		placeholder    : ' Select Service',
		span           : 3,
		options        : [
			{ value: 'fcl_freight', label: 'FCL' },
			{ value: 'lcl_freight', label: 'LCL' },
			{ value: 'air_freight', label: 'AIR' },
			{ value: 'trailer_freight', label: 'Container Transportation' },
			{ value: 'rail_domestic_freight', label: 'Rail Domestic Freight' },
			{ value: 'ftl_freight', label: 'FTL' },
			{ value: 'ltl_freight', label: 'LTL' },
			{ value: 'haulage_freight', label: 'Rail Haulage' },
			{ value: 'fcl_customs', label: 'FCL Customs' },
			{ value: 'lcl_customs', label: 'LCL Customs' },
			{ value: 'air_customs', label: 'AIR Customs' },
			{ value: 'fcl_freight_local', label: 'FCL Freight Local' },
		],
	},
	{
		label          : 'Urgency Tag',
		name           : 'urgencyTag',
		type           : 'multiSelect',
		selectWidth    : '174px',
		isClearable    : true,
		multiple       : true,
		defaultOptions : false,
		placeholder    : 'Urgency',
		span           : 3,
		options        : [
			{ label: 'Surrender (Telex) BL Payments', value: 'telex' },
			{ label: 'Airlines DO Payments', value: 'air_do' },
			{ label: 'BL Amendment Payments', value: 'bl_amnd' },
			{ label: 'LDC/LBC Payments', value: 'ldc_lbc' },
			{ label: 'Cancel Charges', value: 'cxl' },
			{ label: 'Detention Payments', value: 'dtn' },
			{ label: 'Urgent', value: 'urgent' },
			{ label: 'Advanced PDA Accounts', value: 'pda' },
			{ label: 'Advanced CFS security deposit', value: 'cfs' },
			{ label: 'Direct Port Delivery (DPD)', value: 'dpd' },
			{ label: 'Short Payment', value: 'short_payment' },
			{ label: 'ODEX', value: 'odex' },
			{ label: 'Short Transit Shipment', value: 'short_transit_shipment' },
			{ label: 'Co-ordination Charges', value: 'coordination_charges' },
			{
				label: (
					<>
						<CountrySpecificData
							country_id={geo?.country?.id}
							accessorType="economic_zone"
							accessor="label"
						/>
						Shipment
					</>
				),
				value: 'sez_shipment',
			},
		],
	},
	{
		label          : 'Entity',
		name           : 'entity',
		type           : 'asyncSelect',
		placeholder    : 'Entity',
		isClearable    : true,
		span           : 3,
		asyncKey       : 'list_cogo_entity',
		defaultOptions : true,
		valueKey       : 'entity_code',
		renderLabel    : (item) => (`${item?.entity_code} - ${item?.business_name}`),
		initialCall    : true,
		style          : { width: '170px' },
		labelKey       : 'entity_code',
	},
	{
		label                 : 'Invoice Date',
		name                  : 'invoiceDate',
		type                  : 'singleDateRange',
		placeholder           : 'Invoice Date',
		isPreviousDaysAllowed : true,
		span                  : 4,
	},
	{
		label       : 'Payment Due Date',
		name        : 'dueDate',
		type        : 'singleDateRange',
		placeholder : 'Payment Due Date',
		span        : 3.8,
	},
	{
		label                 : 'Last Modified Date',
		name                  : 'updatedDate',
		type                  : 'singleDateRange',
		placeholder           : 'Last Modified Date',
		isPreviousDaysAllowed : true,
		span                  : 3.8,
	},

];
