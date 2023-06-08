import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

const date = new Date();

const getControls = () => {
	const controls = [
		{
			name        : 'search',
			type        : 'text',
			placeholder : 'Search RFQ ID',
		},
		{
			name        : 'profitability',
			label       : 'Profitability (%)',
			type        : 'slider',
			min         : 0,
			max         : 100,
			step        : 1,
			sliderWidth : 300,
		},
		{
			name     : 'organization_size',
			label    : 'Organization Size',
			type     : 'chips',
			multiple : true,
			options  : [
				{
					label : 'Long Tail',
					value : 'long_tail',
				},
				{
					label : 'Enterprise',
					value : 'enterprise',
				},
				{
					label : 'SME',
					value : 'sme',
				},
				{
					label : 'Channel Partner',
					value : 'channel_partner',
				},
				{
					label : 'Mid Size',
					value : 'mid_size',
				},
			],
		},
		{
			name  : 'service_type',
			label : 'Service Type',
			type  : 'chips',

			options: [
				{
					label : 'FCL',
					value : 'fcl_freight',
				},
				{
					label : 'LCL',
					value : 'lcl_freight',
				},
				{
					label : 'AIR',
					value : 'air_freight',
				},
			],
		},
		{
			name        : 'start_date',
			label       : 'Start Date',
			type        : 'datePicker',
			placeholder : formatDate({
				date,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
				formatType : 'date',
			}),
			isPreviousDaysAllowed : true,
			maxDate               : new Date(),
		},
		{
			name        : 'end_date',
			label       : 'End Date',
			type        : 'datePicker',
			placeholder : formatDate({
				date,
				dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
				formatType : 'date',
			}),
			isPreviousDaysAllowed : true,
			maxDate               : new Date(),

		}];
	return controls;
};

export default getControls;
