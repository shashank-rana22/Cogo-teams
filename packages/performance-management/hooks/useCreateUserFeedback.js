import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

import monthOptions from '../constants/month-options';

const useCreateUserFeedback = ({
	rating,
	comment,
	userId,
	formId,
	setShowForm = () => {},
	setRefetchReportees = () => {},
	feedback_id = '',
	feedbackMonth,
	feedbackYear,
}) => {
	const { profile:{ user:{ id: manager_id = '' } } } = useSelector((state) => state);
	const url = isEmpty(feedback_id) ? 'create_form_responses' : 'update_form_responses';

	const [{ data = {}, loading = false }, trigger] = useRequest({
		url,
		method: 'post',
	}, { manual: true });

	const onSubmitData = async () => {
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
					Year              : feedbackYear,
					Month             : monthOptions[feedbackMonth].value,
				},
			});

			setShowForm(false);

			Toast.success('Feedback Created Successfully');
			setRefetchReportees(true);
		} catch (e) {
			Toast.error(e.response.data.error?.toString());
		}
	};

	const onSubmit = ({ questionsToShow, showForm }) => {
		const isRatingGiven = Object.keys(rating)?.length === questionsToShow.length
		&& isEmpty(Object.values(rating).filter((feed) => !feed.rating));

		if (!isRatingGiven) {
			Toast.error('Please provide rating for all the questions');
			return;
		}

		if (isEmpty(comment) && showForm !== 'resigned') {
			Toast.error('Please provide final feedback');
			return;
		}

		onSubmitData();
	};

	return {
		data,
		loading,
		onSubmit,
	};
};

export default useCreateUserFeedback;
