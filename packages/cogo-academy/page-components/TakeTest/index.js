import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import NotEligible from './NotEligible';
import TakeTest from './takeTest';

const ELIGIBILITY_SCREEN_MAPPING = {
	is_invalid_user: {
		heading     : 'Not eligible to attempt this Test',
		sub_heading : `This test is not meant for you. 
        Please go back to your Dashboard and try to attempt tests relevant to your role.`,
	},
	is_inactive: {
		heading     : 'This test is Not Active Yet',
		sub_heading : 'It will show up on your Dashboard as soon as it is Active. You may Attempt the test then.',
	},
	no_attempts_left: {
		heading     : 'No attempts remaining',
		sub_heading : 'You have exhausted all attempts to clear this test. You cannot appear for it anymore.',
	},

};

function CheckEligibility() {
	const {
		general: { query: { test_id } },
		profile: { user: { id: user_id } },
	} = useSelector((state) => state);

	const [{ data }] = useRequest({
		method : 'POST',
		url    : '/check_test_user_eligibility',
		params : {
			user_id, test_id,
		},
	}, { manual: false });

	const { is_valid_user, is_active, attempts_left } = data || {};

	let status = null;

	if (!is_valid_user) {
		status = 'is_invalid_user';
	} else if (!is_active) {
		status = 'is_inactive';
	} else if (!attempts_left) {
		status = 'no_attempts_left';
	}

	if (status) {
		return <NotEligible {...ELIGIBILITY_SCREEN_MAPPING[status]} />;
	}

	return (
		<TakeTest />
	);
}

export default CheckEligibility;
