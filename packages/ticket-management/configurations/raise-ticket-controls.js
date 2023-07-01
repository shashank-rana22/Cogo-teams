import { asyncFieldsTicketTypes } from '@cogoport/forms';

import useGetAsyncTicketOptions from '../utils/useGetAsyncTicketOptions';

const useRaiseTicketControls = () => {
	const loadOptions = useGetAsyncTicketOptions({ ...asyncFieldsTicketTypes() });

	return (
		{
			label       : 'Reason for raising a ticket',
			name        : 'ticket_type',
			controlType : 'select',
			rules       : {
				required: 'This is Required',
			},
			...(loadOptions || {}),
		}
	);
};
export default useRaiseTicketControls;
