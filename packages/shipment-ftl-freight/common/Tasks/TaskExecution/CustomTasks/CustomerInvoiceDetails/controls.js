const customTaskControls = {
	itc_limited: [
		{
			name        : 'unloaded_weight',
			label       : 'Unloaded Weight',
			placeholder : 'Enter the Unloaded Weight',
			type        : 'number',
			span        : 4,
			rules       : {
				required : true,
				min      : 0,
			},
		},
		{
			name           : 'in_date',
			label          : 'In Time',
			placeholder    : 'Enter the in time of truck',
			type           : 'datepicker',
			withTimePicker : true,
			span           : 4,
			rules          : {
				required: true,
			},
		},
		{
			name        : 'unloading_date',
			label       : 'Unloading Date',
			placeholder : 'Enter the unloading date',
			type        : 'datepicker',
			span        : 4,
			rules       : {
				required: true,
			},
		},
		{
			name           : 'out_date',
			label          : 'Out Time',
			placeholder    : 'Enter the out time of truck',
			type           : 'datepicker',
			withTimePicker : true,
			span           : 4,
			rules          : {
				required: true,
			},
		},
		{
			name        : 'detention_days',
			label       : 'Detention Days',
			placeholder : 'Enter the detention days',
			type        : 'number',
			span        : 4,
			rules       : {
				required : true,
				min      : 0,
			},
		},
	],
	adani_wilmar_limited: [
		{
			name        : 'grashof_number',
			label       : 'GR No.',
			placeholder : 'Enter the GR No.',
			type        : 'text',
			span        : 3,
			rules       : {
				required: true,
			},
		},
	],
	gujarat_milk_marketing: [
		{
			name        : 'grn_number',
			label       : 'GCN No.',
			placeholder : 'Enter the GR No.',
			type        : 'text',
			span        : 3,
			rules       : {
				required: true,
			},
		},
		{
			name  : 'grn_date',
			label : 'GCN Date',
			type  : 'datepicker',
			span  : 3,
			rules : {
				required: true,
			},
		},
	],
	ivl_dhunseri_petrochem: [
		{
			name        : 'gc_note',
			label       : 'G. C. Note',
			placeholder : 'Enter the G. C. Note',
			type        : 'text',
			span        : 3,
			rules       : {
				required: true,
			},
		},
		{
			name        : 'grade',
			label       : 'Grade',
			type        : 'text',
			placeholder : 'Enter the Grade',
			span        : 3,
			rules       : {
				required: true,
			},
		},
	],
	orissa_metaliks: [
		{
			name        : 'permit_number',
			label       : 'Permit Number',
			placeholder : 'Enter the Permit Number',
			type        : 'text',
			span        : 3,
			rules       : {
				required: true,
			},
		},
		{
			name        : 'trip_count',
			label       : 'Trip Count',
			type        : 'number',
			placeholder : 'Enter the Trip Count',
			span        : 3,
			rules       : {
				required : true,
				min      : 0,
			},
		},
		{
			name        : 'gcn_number',
			label       : 'GCN No.',
			type        : 'text',
			placeholder : 'Enter the GCN No.',
			span        : 3,
			rules       : {
				required: true,
			},
		},
	],
	kansai_nerolac_paints: [
		{
			name        : 'grashof_number',
			label       : 'GR No.',
			placeholder : 'Enter the GR No.',
			type        : 'text',
			span        : 3,
			rules       : {
				required: true,
			},
		},
		{
			name  : 'grashof_date',
			label : 'GR Date',
			type  : 'datepicker',
			span  : 3,
			rules : {
				required: true,
			},
		},
		{
			name        : 'supply_chain_number',
			label       : 'S. C. No',
			placeholder : 'Enter the S. C. No',
			type        : 'text',
			span        : 3,
			rules       : {
				required: true,
			},
		},
	],
	varun_beverages_limited: [
		{
			name        : 'grashof_number',
			label       : 'GR No.',
			placeholder : 'Enter the GR No.',
			type        : 'text',
			span        : 3,
			rules       : {
				required: true,
			},
		},
		{
			name  : 'outward_delivery_number',
			label : 'Outward Delivery No.',
			type  : 'text',
			span  : 3,
			rules : {
				required: true,
			},
		},
		{
			name  : 'outward_delivery_date',
			label : 'Outward Delivery Date',
			type  : 'datepicker',
			span  : 3,
			rules : {
				required: true,
			},
		},
		{
			name  : 'inward_delivery_number',
			label : 'Inward Delivery No.',
			type  : 'text',
			span  : 3,
			rules : {
				required: true,
			},
		},
		{
			name  : 'inward_delivery_date',
			label : 'Inward Delivery Date',
			type  : 'datepicker',
			span  : 3,
			rules : {
				required: true,
			},
		},
		{
			name        : 'converted_case',
			label       : 'Converted Case',
			type        : 'text',
			placeholder : 'Enter the Converted Case',
			span        : 3,
			rules       : {
				required: true,
			},
		},
		{
			name        : 'empty_quantity',
			label       : 'Empty Quantity',
			type        : 'number',
			placeholder : 'Enter the Empty Quantity',
			span        : 3,
			rules       : {
				required : true,
				min      : 0,
			},
		},
	],
};

export default customTaskControls;
