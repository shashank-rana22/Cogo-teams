import { Pagination } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import useTestsList from '../hooks/useTestsList';

import Header from './Header';
import LoadingState from './LoadingState';
import styles from './styles.module.css';
import TestCard from './TestCard';

function TestsList() {
	const router = useRouter();

	const {
		loading, PAGE_LIMIT, debounceQuery, testCategory, setTestCategory, page, setPage, total_count, data,
	} = useTestsList();

	return (
		<div className={styles.container}>
			<Header debounceQuery={debounceQuery} testCategory={testCategory} setTestCategory={setTestCategory} />

			{loading ? <LoadingState /> : (data.list || []).map((test_card) => (
				<TestCard key={test_card} test_card={test_card} />
			))}

			{testCategory === 'active_test' && (data?.list?.length === 0) && (
				<div>
					<h4>Currently there are no active tests. Meanwhile, you can learn from the FAQ section</h4>
					<span
						role="presentation"
						className={`${styles.faq_link} ${styles.arrow}`}
						onClick={() => router.push('/learning/faq')}
					>
						Go To FAQ
						<span className={styles.icon}><IcMArrowRight /></span>
					</span>
				</div>
			)}

			{total_count > PAGE_LIMIT ? (
				<div className={styles.pagination_container}>
					<Pagination
						type="table"
						currentPage={page}
						totalItems={total_count}
						pageSize={PAGE_LIMIT}
						onPageChange={setPage}
					/>
				</div>
			) : null}
		</div>
	);
}

export default TestsList;
