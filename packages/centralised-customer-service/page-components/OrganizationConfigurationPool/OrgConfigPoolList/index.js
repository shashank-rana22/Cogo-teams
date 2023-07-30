import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import EmptyState from '../../EmptyState';
import LoadingState from '../../LoadingState';
import OrgConfigListItem from '../OrgConfigPoolListItem';

import styles from './styles.module.css';

const PAGE_LIMIT = 10;
const DEFAULT_PAGE = 1;
const DEFAULT_TOTAL_COUNT = 0;

function OrgConfigPoolList({
	list = [], loading = false, pageData = {}, page = 1,
	setPage = () => {}, fetchList = () => {},
}) {
	const [showModal, setShowModal] = useState(false);

	if (loading) {
		return <LoadingState />;
	}

	if (isEmpty(list)) {
		return <EmptyState />;
	}

	return (
		<>
			{list.map((item) => (
				<OrgConfigListItem
					key={item.id}
					data={item}
					showModal={showModal}
					setShowModal={setShowModal}
					fetchList={fetchList}
				/>
			))}

			{(pageData?.total_count || DEFAULT_TOTAL_COUNT) > PAGE_LIMIT ? (
				<div className={styles.pagination_container}>
					<Pagination
						className="md"
						totalItems={pageData?.total_count || DEFAULT_TOTAL_COUNT}
						currentPage={page || DEFAULT_PAGE}
						pageSize={pageData?.page_limit}
						onPageChange={(val) => setPage(val)}
					/>
				</div>
			) : null}

		</>

	);
}

export default OrgConfigPoolList;
