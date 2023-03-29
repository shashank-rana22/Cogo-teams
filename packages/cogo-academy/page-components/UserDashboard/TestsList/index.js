import { Toast, Pagination } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

import Header from './Header';
import LoadingState from './LoadingState';
import styles from './styles.module.css';
import TestCard from './TestCard';

function TestsList() {
	const {
		user: { id: user_id },
	} = useSelector(({ profile }) => ({
		user: profile.user,
	}));

	const [testCategory, setTestCategory] = useState('active_test');
	const [page, setPage] = useState(1);

	const { debounceQuery, query: searchQuery } = useDebounceQuery();

	const [{ data = {}, loading }, trigger] = useRequest({
		method : 'GET',
		url    : '/list_tests',
	}, { manual: true });

	const { total_count } = data || {};

	useEffect(() => {
		try {
			trigger({
				params: {
					page_limit : 4,
					page,
					filters    : {
						q              : searchQuery,
						user_id,
						current_status : testCategory,
					},
				},
			});
		} catch (err) {
			Toast.error(getApiErrorString(err.message?.data));
		}
	}, [searchQuery, trigger, user_id, testCategory, page]);

	return (
		<div className={styles.container}>
			<Header debounceQuery={debounceQuery} testCategory={testCategory} setTestCategory={setTestCategory} />

			{loading ? <LoadingState /> : (data.list || []).map((test_card) => (
				<TestCard key={test_card} test_card={test_card} />
			))}

			{total_count > 4 ? (
				<div className={styles.pagination_container}>
					<Pagination
						type="table"
						currentPage={page}
						totalItems={total_count}
						pageSize={4}
						onPageChange={setPage}
					/>
				</div>
			) : null}
		</div>
	);
}

export default TestsList;
