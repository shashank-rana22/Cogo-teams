import { Pagination } from '@cogoport/components';
import { useState } from 'react';

import CreateModal from '../CreateServiceLane';
import useListServiceLanes from '../hooks/useListServiceLanes';

import Cards from './Cards';
import Filters from './Filters';

const SIX = 6;
function ServiceLanesList({ showModal, setShowModal }) {
	const [filters, setFilters] = useState({
		page: 1,
	});

	const { data, loading, totalItems, currentPage, setPage, listServiceLanes } = useListServiceLanes({
		filters,
	});

	return (
		<>
			<Filters filters={filters} setFilters={setFilters} />
			{
				(data || [...Array(SIX)])?.map((item) => (
					<Cards item={item} key={item?.id} loading={loading} />
				))
			}
			<div>
				<Pagination
					className="md"
					type="table"
					currentPage={currentPage}
					totalItems={totalItems}
					pageSize={10}
					onPageChange={setPage}
				/>
			</div>
			{ showModal
				? <CreateModal showModal={showModal} setShowModal={setShowModal} refetch={listServiceLanes} /> : null }
		</>
	);
}
export default ServiceLanesList;
