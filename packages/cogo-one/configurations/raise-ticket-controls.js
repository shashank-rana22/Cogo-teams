import { asyncFieldsTicketTypes } from '@cogoport/forms';

import useGetAsyncTicketOptions from '../helpers/useGetAsyncTicketOptions';

const TICKET_DATA_KEYWORDS_MAPPING = [
	{ keyword: 'shipment', datakey: 'ShipmentId', validation: 'number' },
	{ keyword: 'invoice', datakey: 'InvoiceNumber', validation: 'number' },
];

const MINIMUM_VALUE = 0;

const useRaiseTicketControls = ({ watchTicketType = '', source = '' }) => {
	const loadOptions = useGetAsyncTicketOptions({ ...asyncFieldsTicketTypes() });

	const { keyword = '', datakey = '', validation = '' } = TICKET_DATA_KEYWORDS_MAPPING
		.find(({ keyword:matchKeyword }) => watchTicketType?.toLowerCase()?.includes(matchKeyword)) || {};
	const ticketDataLabel = keyword ? `Add ${keyword} ID` : 'Additional Data';

	const controls = [
		{
			label       : 'Reason for raising a ticket',
			name        : 'ticket_type',
			controlType : 'select',
			rules       : {
				required: 'This is Required',
			},
			...(loadOptions || {}),
		},
		{
			label       : ticketDataLabel,
			name        : 'ticket_data',
			controlType : 'input',
			placeholder : 'Type here...',
			size        : 'md',
			type        : validation === 'number' ? 'number' : 'text',
			rules       : {
				validate: (value) => ((validation === 'number' && value < MINIMUM_VALUE) ? 'Cannot be Negative' : true),
			},
		},
		{
			label       : 'Describe ticket issue',
			name        : 'description',
			controlType : 'textarea',
			placeholder : 'Type here...',
			rows        : 5,
			rules       : {
				required: source !== 'message' && 'This is Required',
			},
		},
		{
			label       : 'Notify customer',
			name        : 'notify_customer',
			controlType : 'checkbox',
		},
	];
	return { controls, ticketDataKey: datakey };
};
export default useRaiseTicketControls;
