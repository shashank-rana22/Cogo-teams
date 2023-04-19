import { asyncFieldsTicketTypes } from '@cogoport/forms';

import useGetAsyncTicketOptions from '../helpers/useGetAsyncTicketOptions';

const useRaiseTicketControls = () => {
	const loadOptions = useGetAsyncTicketOptions({ ...asyncFieldsTicketTypes() });
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
			label       : 'Add Invoice ID',
			name        : 'invoice_id',
			controlType : 'input',
			placeholder : 'Type here...',
			size        : 'md',
			type        : 'number',
			rules       : {
				validate: (value) => (value < 0 ? 'Cannot be Negative' : true),
			},
		},
		{
			label       : 'Describe ticket issue',
			name        : 'description',
			controlType : 'textarea',
			placeholder : 'Type here...',
			rows        : 5,
		},
	];
	return controls;
};
export default useRaiseTicketControls;
