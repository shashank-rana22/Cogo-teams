import { asyncFieldsTicketTypes } from '@cogoport/forms';

import useGetAsyncTicketOptions from '../helpers/useGetAsyncTicketOptions';

const useRaiseTicketControls = () => {
	const loadOptions = useGetAsyncTicketOptions({ ...asyncFieldsTicketTypes() });
	const controls = [
		{
			label : 'Reason for raising a ticket',
			name  : 'ticket_type',
			type  : 'select',
			rules : {
				required: 'This is Required',
			},
			...(loadOptions || {}),
		},
		{
			label       : 'Add Invoice ID',
			name        : 'invoice_id',
			type        : 'input',
			placeholder : 'Type here...',
			size        : 'md',
		},
		{
			label       : 'Describe ticket issue',
			name        : 'description',
			type        : 'textarea',
			placeholder : 'Type here...',
			rows        : 5,
		},
	];
	return controls;
};
export default useRaiseTicketControls;
