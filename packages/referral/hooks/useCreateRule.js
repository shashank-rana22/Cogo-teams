import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useCreateRule = (apiState, setApiState, setIsEdit) => {
	const { profile = {} } = useSelector((state) => state);

	const { user = {} } = profile;

	const { id:user_id, session_type: userType = '' } = user;

	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : 'create_referral_configuration',
	}, { manual: true });

	const createRule = (payload) => {
		try {
			trigger({
				data: {
					...payload,
					performed_by_id   : user_id,
					performed_by_type : userType === 'partner' ? 'user' : 'agent',
					status            : 'active',
				},
			});
			setApiState('Updated');
			setIsEdit(true);
			Toast.success(`Rule ${apiState} successfully`);
		} catch (error) {
			console.log(error);
		}
	};

	return { createRule, loading };
};

export default useCreateRule;
