import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

const useCreateUserFeedback = ({
	rating,
	comment,
	userId,
	formId,
	newFeedbackId,
	setNewFeedbackId = () => {},
	setShowForm = () => {},
}) => {
	const isFeedbackIdEmpty = isEmpty(newFeedbackId);

	const apiMaipping = {
		true  : 'create-form-responses',
		false : 'update-form-response',
	};

	const [{ data = {}, loading = false }, trigger] = useRequest({
		url    : `/${apiMaipping[isFeedbackIdEmpty]}`,
		method : 'post',
	}, { manual: true });

	const onSubmitData = async () => {
		const form_responses = [];
		Object.keys(rating).forEach((id) => {
			const { feedback, rating: question_rating = '' } = rating[id];

			form_responses.push({ question_id: id, rating: question_rating, feedback });
		});

		try {
			const response = await trigger({
				data: {
					user_id        : userId,
					form_id        : formId,
					form_responses,
					final_feedback : comment,
				},
			});

			setNewFeedbackId(response?.data?.object_id || response?.data?.id);
			setShowForm(false);

			if (isFeedbackIdEmpty) {
				Toast.success('Feedback Created Successfully');
				return;
			}

			Toast.success('Feedback Updated Successfully');
		} catch (e) {
			console.log(e.toString());
		}
	};

	return {
		data,
		loading,
		onSubmitData,
	};
};

export default useCreateUserFeedback;
