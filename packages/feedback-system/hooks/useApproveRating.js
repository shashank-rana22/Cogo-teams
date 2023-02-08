import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';

import { controls } from '../utils/approveRatingControls';

const useApproveRating = ({
	manager_id,
	setShow = () => {},
	getUserFeedbackList = () => {},
}) => {
	const formProps = useForm();

	const [{ loading = false }, trigger] = useRequest({ url: 'approve_rating', method: 'post' }, { manual: false });

	const onSubmit = async (values) => {
		try {
			const response = await trigger({
				params: {
					function: values?.approx,
					manager_id,
				},
			});
			getUserFeedbackList();
			if (!response.hasError) setShow(false);
			Toast.success('Ratings Approved');
		} catch (e) {
			console.log(e.toString());
		}
	};

	return {
		loading,
		formProps,
		controls,
		onSubmit,
	};
};

export default useApproveRating;
