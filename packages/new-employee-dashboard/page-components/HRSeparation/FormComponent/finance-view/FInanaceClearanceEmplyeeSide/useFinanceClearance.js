import { useForm } from '@cogoport/forms';
import { useEffect } from 'react';

import useUpdateAppliationProcessDetails from '../../hooks/useUpdateAppliationProcessDetails';

import useGetFinanceClearanceProcessDetails from './useGetFinanceClearanceDetails';

const useFinanceClearance = ({ refetch }) => {
	const { control, handleSubmit, formState: { errors }, setValue } = useForm();
	const { data } = useGetFinanceClearanceProcessDetails();

	const { manager_clearance } = data || {};
	const { review_request } = manager_clearance || {};
	const { sub_process_detail_id, sub_process_data, is_complete } = review_request || {};
	const { notes_shared_with_you = [], outstanding_amount_details = [] } = sub_process_data || {};

	const { updateApplication } = useUpdateAppliationProcessDetails({ refetch });
	const onSubmit = (values) => {
		const payload = {
			process_name     : 'finance_clearance',
			sub_process_detail_id,
			sub_process_data : values,
		};

		updateApplication({ payload });
	};

	useEffect(() => {
		setValue('feedback_rating', sub_process_data?.feedback_rating);
	}, [setValue, sub_process_data?.feedback_rating]);

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

export default useFinanceClearance;
