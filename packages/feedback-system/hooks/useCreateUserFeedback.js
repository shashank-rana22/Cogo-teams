import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

const useCreateUserFeedback = ({
	rating,
	comment,
	userId,
	newFeedbackId,
	setNewFeedbackId = () => {},
	setShowForm = () => {},
}) => {
	const isFeedbackIdEmpty = isEmpty(newFeedbackId);

	const apiMaipping = {
		true  : 'create_user_feedback',
		false : 'update_user_feedbacks',
	};

	const [{ data = {}, loading = false }, trigger] = useRequest({
		url    : `/${apiMaipping[isFeedbackIdEmpty]}`,
		method : 'post',
	}, { manual: true });

	const onSubmitData = async () => {
		try {
			const response = await trigger({
				params: {
					...(isFeedbackIdEmpty ? { user_id: userId } : { id: newFeedbackId }),
					performance_item : rating,
					feedback         : comment,
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
