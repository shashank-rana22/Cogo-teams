import React from 'react';

import useListHandlingFees from '../../../hooks/useListHandlingFees';

import Details from './Details';
import ListHeader from './ListHeader';

function ListHandlingFees({
	activeService = '',
	listType = '',
	setListType = () => { },
}) {
	const defaultFilters = { listType, activeService };

	const { data, loading, filters, setFilters } = useListHandlingFees({
		defaultFilters,
	});

	return (
		<>
			<ListHeader
				filters={filters}
				setFilters={setFilters}
				activeService={activeService}
				listType={listType}
				setListType={setListType}
			/>
			<Details
				data={data}
				loading={loading}
				filters={filters}
				setFilters={setFilters}
				activeService={activeService}
			/>
		</>
	);
}

export default ListHandlingFees;
