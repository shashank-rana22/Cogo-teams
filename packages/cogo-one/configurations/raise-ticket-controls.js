import { asyncFieldsTicketTypes } from '@cogoport/forms';
import { merge } from '@cogoport/utils';

import useGetAsyncTicketOptions from '../helpers/useGetAsyncTicketOptions';

const TICKET_DATA_KEYWORDS_MAPPING = [
	{ keyword: 'shipment', datakey: 'ShipmentId', validation: 'number' },
	{ keyword: 'invoice', datakey: 'InvoiceNumber', validation: 'number' },
];

const MIN_ADDITIONAL_DATA_LENGTH = 0;

const useRaiseTicketControls = ({
	watchTicketType = '',
	source = '',
	ticketType = '',
	setAdditionalInfo = () => {},
}) => {
	const loadOptions = useGetAsyncTicketOptions(merge(asyncFieldsTicketTypes(), {
		params: { QFilter: ticketType },
	}));

	const { keyword = '', datakey = '', validation = '' } = TICKET_DATA_KEYWORDS_MAPPING
		.find(({ keyword:matchKeyword }) => watchTicketType?.toLowerCase()?.includes(matchKeyword)) || {};
	const ticketDataLabel = keyword ? `Add ${keyword} ID` : 'Additional Data';

	const controls = [
		{
			label       : 'Reason for raising a ticket',
			name        : 'ticket_type',
			controlType : 'select',
			value       : ticketType,
			rules       : {
				required: 'This is Required',
			},
			...(loadOptions || {}),
			onChange: (_, val) => setAdditionalInfo(val?.AdditionalInfo),
		},
		{
			label       : ticketDataLabel,
			name        : 'ticket_data',
			controlType : 'input',
			placeholder : 'Type here...',
			size        : 'md',
			type        : validation === 'number' ? 'number' : 'text',
			rules       : {
				validate: (value) => ((validation === 'number'
				&& value < MIN_ADDITIONAL_DATA_LENGTH) ? 'Cannot be Negative' : true),
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
	];
	return { controls, ticketDataKey: datakey };
};
export default useRaiseTicketControls;
