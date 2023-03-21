import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState, useEffect } from 'react';

import Completion from './Completion';
import Introduction from './Introduction';
import Ongoing from './Ongoing';

const COMPONENT_MAPPING = {
	introduction: {
		key       : 'introduction',
		component : Introduction,
	},
	ongoing: {
		key       : 'ongoing',
		component : Ongoing,
	},
	completed: {
		key       : 'completed',
		component : Completion,
	},
};

function TakeTest() {
	const {
		profile: {
			user: { id: user_id },
		},
		general: {
			query: { test_id },
		},
	} = useSelector((state) => state);

	const [{ data: testData, loading }] = useRequest({
		method : 'GET',
		url    : '/get_test',
		params : {
			id: test_id, user_id,
		},
	}, { manual: false });

	const { test_user_mapping_state = 'introduction' } = testData || {};

	const [activeState, setActiveState] = useState('');

	useEffect(() => {
		setActiveState(test_user_mapping_state);
	}, [setActiveState, test_user_mapping_state]);

	const Component = COMPONENT_MAPPING[activeState]?.component;

	if (loading) {
		return 'loading';
	}

	return (
		<Component setActiveState={setActiveState} loading={loading} testData={testData} />
	);
}

export default TakeTest;
