import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import Header from './Header';
import styles from './styles.module.css';
import TestCard from './TestCard';

function TestsList() {
	const { debounceQuery, query: searchQuery } = useDebounceQuery();

	const { profile: { user: { id: user_id } } } = useSelector((state) => state);

	const [{ data = {}, loading }, trigger] = useRequest({
		method : 'GET',
		url    : '/list_tests',
		params : {
			// page_limit : 5,
			filters: {
				user_id,
				status: 'active',
			},
		},
	}, { manual: false });

	if (loading) {
		return 'loading';
	}

	return (
		<div className={styles.container}>
			<Header debounceQuery={debounceQuery} />

			{(data.list || []).map((test_card) => (
				<TestCard key={test_card} test_card={test_card} />
			))}
		</div>
	);
}

export default TestsList;
