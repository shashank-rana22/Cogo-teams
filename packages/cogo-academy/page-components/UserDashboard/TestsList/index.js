import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';

import Header from './Header';
import styles from './styles.module.css';
import TestCard from './TestCard';

function TestsList() {
	const { debounceQuery, query: searchQuery } = useDebounceQuery();

	const [{ data, loading }, trigger] = useRequest({
		method : 'GET',
		url    : '/list_tests',
		params : {
			page_limit: 5,
		},
	}, { manual: false });

	console.log(data?.list?.[0], 'data');

	if (loading) {
		return 'loading';
	}

	return (
		<div className={styles.container}>
			<Header debounceQuery={debounceQuery} />

			{data.list.map((test_card) => (
				<TestCard test_card={test_card} />
			))}
		</div>
	);
}

export default TestsList;
