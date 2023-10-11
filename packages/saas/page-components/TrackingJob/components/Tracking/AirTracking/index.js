import { Table } from '@cogoport/components';
import React, { useState } from 'react';

import ListPagination from '../../../common/ListPagination';
import { columns } from '../../../config/air-tracking-columns';
import useGetAirTrackingList from '../../../hooks/useGetAirTrackingList';
import SearchFilters from '../../Filter/Search/search';

import styles from './styles.module.css';
import Update from './Update';

function AirTracking() {
	const {
		data,
		loading,
		filters,
		setFilters,
		searchString,
		serialId,
		setSearchString,
		setSerialId,
		refetch,
	} = useGetAirTrackingList();

	const [showUpdate, setShowUpdate] = useState({ show: false, data: {} });

	const handleShowModal = (item) => {
		setShowUpdate({ show: true, data: item?.data });
	};

	const column = columns({
		handleShowModal,
		setFilters,
		filters,
	});

	function CustomPagination() {
		return <ListPagination filters={filters} setFilters={setFilters} data={data} />;
	}

	return (
		<div>
			<div className={styles.filter_container}>
				<SearchFilters
					searchString={searchString}
					serialId={serialId}
					setSearchString={setSearchString}
					activeTab="air_tracking"
					filters={filters}
					setFilters={setFilters}
					setSerialId={setSerialId}
				/>
			</div>

			<CustomPagination />

			<Table columns={column} data={data?.list || []} loading={loading} className={styles.table} />

			<CustomPagination />

			<Update showUpdate={showUpdate} setShowUpdate={setShowUpdate} triggerListAirTracking={refetch} />

		</div>
	);
}

export default AirTracking;
