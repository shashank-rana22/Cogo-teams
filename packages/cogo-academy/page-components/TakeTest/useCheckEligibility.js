import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

function useCheckEligibility() {
	const {
		query: { test_id },
		user: { id: user_id },
	} = useSelector(({ general, profile }) => ({
		query : general.query,
		user  : profile.user,
	}));

	const [{ data, loading }] = useRequest({
		method : 'POST',
		url    : '/check_test_user_eligibility',
		params : {
			user_id, test_id,
		},
	}, { manual: !test_id });

	return {
		loading,
		data,
	};
}

export default useCheckEligibility;
