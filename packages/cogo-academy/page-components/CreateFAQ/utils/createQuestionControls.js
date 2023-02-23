/* eslint-disable no-mixed-spaces-and-tabs */
const functionSubFunctionMapping = {
	sales: [
		{
			label : 'Customer Success',
			value : 'customer_success',
	  },
	  {
			label : 'Field Sales',
			value : 'field_sales',
	  },
	  {
			label : 'Strategic Sales',
			value : 'strategic_sales',
	  },
	  {
			label : 'CP Sales',
			value : 'cp_sales',
	  },
	  {
			label : 'Acquisition',
			value : 'acquisition',
	  },
	  {
			label : 'CP Portfolio',
			value : 'cp_portfolio',
	  },

	],
	supply: [
		{
			label : 'Shipping Line',
			value : 'shipping_line',
	  },
	  {
			label : 'Freight Forwarder',
			value : 'freight_forwarder',
	  },
	  {
			label : 'Transportation',
			value : 'transportation',
	  },
	  {
			label : 'CFS',
			value : 'cfs',
	  },
	  {
			label : 'Customs',
			value : 'customs',
	  },
	  {
			label : 'NVOCC',
			value : 'nvocc',
	  },
	  {
			label : 'Overseas',
			value : 'overseas',
	  },
	  {
			label : 'IATA Agents',
			value : 'iata_agents',
	  },

	],
	operations: [
	  {
			label : 'Booking Desk',
			value : 'booking_desk',
	  },
	  {
			label : 'Post Shipment',
			value : 'post_shipment',
	  },
	  {
			label : 'FinOps',
			value : 'finops',
	  },

	],
	finance: [

	],

};

const createQuestionControls = () => [{
	type        : 'fieldArray',
	name        : 'fieldArray',
	showButtons : true,
	heading     : '',
	value       : [
		{
			cogo_entity   : '',
			country_id    : '',
			platform      : '',
			work_scopes   : '',
			functions     : '',
			sub_functions : '',
		},
	],
	buttonText         : 'Add More',
	noDeleteButtonTill : 1,
	controls           : [
		{
			name        : 'cogo_entity',
			type        : 'select',
			span        : 2,
			label       : 'Cogo Entity',
			placeholder : 'Select Cogo Entity',
		},
		{
			name        : 'country_id',
			label       : 'Country Id',
			type        : 'select',
			span        : 2,
			placeholder : 'Select unit',
		},
		{
			name    : 'platform',
			label   : 'Platform',
			type    : 'select',
			span    : 2,
			options : [{ label: 'Admin', value: 'admin' },
				{ label: 'App', value: 'app' },
				{ label: 'Partner', value: 'partner' },
				{ label: 'All', value: 'all' }],
			placeholder : 'Select Platform',
			rules       : { required: 'This is required' },
		},
		{
			name        : 'work_scopes',
			label       : 'Work Scopes',
			type        : 'select',
			span        : 2,
			placeholder : 'Select Work Scopes',
			rules       : { required: 'This is required' },
		},
		{
			name    : 'functions',
			label   : 'Functions',
			type    : 'select',
			span    : 2,
			options : [{ label: 'Sales', value: 'sales' },
				{ label: 'Supply', value: 'supply' },
				{ label: 'Operations', value: 'operations' },
				{ label: 'Finance', value: 'finance' }],
			placeholder : 'Select Functions',
			rules       : { required: 'This is required' },
		},
		{
			name        : 'sub_functions',
			label       : 'Sub Functions',
			type        : 'select',
			span        : 1,
			options     : functionSubFunctionMapping.sales,
			placeholder : 'Select Sub Functions',
		},
	],
}];

export default createQuestionControls;
