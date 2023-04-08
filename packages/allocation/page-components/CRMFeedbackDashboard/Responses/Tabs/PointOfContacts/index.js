import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../common/EmptyState';
import ResponseCard from '../../components/ResponseCard';
import LoadingState from '../../components/ResponseCard/LoadingState';
import useResponsesList from '../../hooks/useResponsesList';

import styles from './styles.module.css';

function PointOfContacts({ activeTab = '', feedback_request_id = '' }) {
	const {
		data = [],
		loading = false,
		getNextPage = () => {},
		paginationData = {},
	} = useResponsesList({ activeTab, feedback_request_id });

	const { page, page_limit, total_count } = paginationData;

	if (loading) { return <LoadingState />; }

	if (isEmpty(data)) {
		return (
			<div className={styles.empty}>
				<EmptyState height="280px" width="auto" flexDirection="column" textSize="20px" />
			</div>
		);
	}

	return (
		<>
			<div className={styles.container}>
				{(data).map((user, index) => (
					<ResponseCard
						key={user?.id}
						user={user}
						index={index}
						activeTab={activeTab}
					/>
				))}
			</div>

			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={(val) => getNextPage({ page: val })}
				/>
			</div>
		</>
	);
}

export default PointOfContacts;
