import { asyncFieldsTicketTypes } from '@cogoport/forms';

import useGetAsyncTicketOptions from '../utils/useGetAsyncTicketOptions';

const useRaiseTicketControls = ({ searchParams }) => {
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
			params: {
				filters: {
					QFilter: searchParams,
				},
			},
		}
	);
};
export default useRaiseTicketControls;
