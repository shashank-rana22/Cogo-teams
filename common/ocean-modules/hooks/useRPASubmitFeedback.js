import { Toast } from '@cogoport/components';
import { useLensRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import toastApiError from '../utils/toastApiError';

const useSubmitRPAFeedback = ({ onSubmit }) => {
	const user_profile = useSelector(({ profile }) => profile);
	const [feedBackApi, triggerFeedback] = useLensRequest({
		url    : 'submit_user_feedback',
		method : 'POST',
	}, { manual: true });

	const submitRPAFeeback = async (remark, isChecked) => {
		try {
			await triggerFeedback({
				data: {
					email                     : user_profile.email,
					name                      : user_profile.name,
					country_code              : user_profile.mobile_country_code,
					remark,
					mobile_number             : user_profile.mobile_number,
					require_email_integration : isChecked,
				},
			});
			Toast.success('Feedback taken');
			if (onSubmit) {
				onSubmit();
			}
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		feedBackApi,
		submitRPAFeeback,
	};
};

export default useSubmitRPAFeedback;
