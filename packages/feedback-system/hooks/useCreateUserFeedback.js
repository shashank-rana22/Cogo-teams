import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useCreateUserFeedback = ({
	rating,
	comment,
	userId,
	formId,
	setShowForm = () => {},
	setRefetchReportees = () => {},
}) => {
	const { profile:{ user:{ id: manager_id = '' } } } = useSelector((state) => state);

	const [{ data = {}, loading = false }, trigger] = useRequest({
		url    : 'create_form_responses',
		method : 'post',
	}, { manual: true });

	const onSubmitData = async ({ setOpenConfirmationModal = () => {} }) => {
		const form_responses = [];
		Object.keys(rating).forEach((id) => {
			const { feedback, rating: question_rating = '' } = rating[id];

			form_responses.push({ question_id: id, rating: Number(question_rating), feedback });
		});

		try {
			await trigger({
				data: {
					user_id           : userId,
					form_id           : formId,
					form_responses,
					final_feedback    : comment,
					performed_by_id   : manager_id,
					performed_by_type : 'agent',
				},
			});

			setShowForm(false);

			Toast.success('Feedback Created Successfully');
			setRefetchReportees(true);
			setOpenConfirmationModal(false);
			return;
		} catch (e) {
			Toast.error(getApiErrorString(e.data));
		}
	};

	return {
		data,
		loading,
		onSubmitData,
	};
};

export default useCreateUserFeedback;
