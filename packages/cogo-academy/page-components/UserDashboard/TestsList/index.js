import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

import Header from './Header';
import LoadingState from './LoadingState';
import styles from './styles.module.css';
import TestCard from './TestCard';

function TestsList() {
	const { debounceQuery, query: searchQuery } = useDebounceQuery();

	const { profile: { user: { id: user_id } } } = useSelector((state) => state);

	const [{ data = {}, loading }, trigger] = useRequest({
		method : 'GET',
		url    : '/list_tests',
	}, { manual: true });

	const [testCategory, setTestCategory] = useState('active_test');

	useEffect(() => {
		try {
			trigger({
				params: {
					filters: {
						q              : searchQuery,
						user_id,
						status         : 'active',
						current_status : testCategory,
					},
				},
			});
		} catch (err) {
			console.log(err, 'err');
		}
	}, [searchQuery, trigger, user_id, testCategory]);

	return (
		<div className={styles.container}>
			<Header debounceQuery={debounceQuery} testCategory={testCategory} setTestCategory={setTestCategory} />

			{loading ? <LoadingState /> : (data.list || []).map((test_card) => (
				<TestCard key={test_card} test_card={test_card} />
			))}
		</div>
	);
}

export default TestsList;
