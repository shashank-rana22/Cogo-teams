import { Pagination } from '@cogoport/components';
import { useState } from 'react';

import EmptyState from '../../common/EmptyState';
import CreateModal from '../CreateServiceLane';
import useListServiceLanes from '../hooks/useListServiceLanes';

import Cards from './Cards';
import Filters from './Filters';
import styles from './styles.module.css';

const SIX = 6;
function ServiceLanesList({ showModal, setShowModal }) {
	const [filters, setFilters] = useState({
		page: 1,
	});

	const { data, loading, totalItems, currentPage, listServiceLanes } = useListServiceLanes({
		filters,
	});
	let content = (data || [...Array(SIX)])?.map((item) => (
		<Cards item={item} key={item?.id} loading={loading} />
	));

	if (!(data || []).length && !loading) {
		content = <EmptyState />;
	}

	return (
		<>
			<Filters filters={filters} setFilters={setFilters} />
			{content}
			<div className={styles.pagination}>
				<Pagination
					className="md"
					type="table"
					currentPage={currentPage}
					totalItems={totalItems}
					pageSize={10}
					onPageChange={(val) => { setFilters((prev) => ({ ...prev, page: val })); }}
				/>
			</div>
			{ showModal
				? <CreateModal showModal={showModal} setShowModal={setShowModal} refetch={listServiceLanes} /> : null }
		</>
	);
}
export default ServiceLanesList;
