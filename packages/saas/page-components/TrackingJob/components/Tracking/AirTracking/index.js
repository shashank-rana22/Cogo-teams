import { Table } from '@cogoport/components';
import { dynamic } from '@cogoport/next';
import React, { useState, useMemo } from 'react';

import ListPagination from '../../../common/ListPagination';
import getColumns from '../../../config/air-tracking-columns';
import useGetAirTrackingList from '../../../hooks/useGetAirTrackingList';
import SearchFilters from '../../Filter/Search/search';

import styles from './styles.module.css';

const Update = dynamic(() => import('./Update'), { ssr: false });

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

	const columns = useMemo(() => getColumns({ handleShowModal, setFilters, filters }), [filters, setFilters]);

	function CustomPagination() {
		return <ListPagination filters={filters} setFilters={setFilters} data={data} />;
	}

	return (
		<>
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

			<Table columns={columns} data={data?.list || []} loading={loading} className={styles.table} />

			<CustomPagination />

			{showUpdate.show
				? (
					<Update
						showUpdate={showUpdate}
						setShowUpdate={setShowUpdate}
						triggerListAirTracking={refetch}
					/>
				) : null}

		</>
	);
}

export default AirTracking;
