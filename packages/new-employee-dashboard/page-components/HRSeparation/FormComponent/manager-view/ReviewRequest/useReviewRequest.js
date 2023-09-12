import { useForm } from '@cogoport/forms';

import useUpdateAppliationProcessDetails from '../../hooks/useUpdateAppliationProcessDetails';

const useReviewRequest = ({ data, refetch }) => {
	const { control, handleSubmit, formState: { errors } } = useForm();

	const { manager_clearance } = data || {};
	const { review_request } = manager_clearance || {};
	const { sub_process_detail_id, sub_process_data, is_complete } = review_request || {};
	const { notes_shared_with_you = [], outstanding_amount_details = [] } = sub_process_data || {};

	const { updateApplication } = useUpdateAppliationProcessDetails({ refetch });

	const onSubmit = (values) => {
		const payload = { sub_process_detail_id, sub_process_data: values };

		updateApplication({ payload });
	};

	return {
		handleSubmit,
		onSubmit,
		control,
		errors,
		notes_shared_with_you,
		outstanding_amount_details,
		is_complete,
	};
};

export default useReviewRequest;
