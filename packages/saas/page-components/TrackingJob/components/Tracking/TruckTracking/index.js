import { Table } from '@cogoport/components';
import { dynamic } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useMemo } from 'react';

import ListPagination from '../../../common/ListPagination';
import getColumns from '../../../config/truck-tracking-columns';
import useListSaasSurfaceShipmentDetails from '../../../hooks/useListSaasSurfaceShipmentDetails';
import SearchFilters from '../../Filter/Search/search';

import styles from './styles.module.css';

const ViewTracking = dynamic(() => import('./ViewTracking'), { ssr: false });
const EmptyState = dynamic(() => import('../../../common/EmptyState'), { ssr: false });

function TruckTracking() {
	const {
		data,
		loading,
		filters,
		setFilters,
		searchString,
		serialId,
		setSearchString,
		setSerialId,
	} = useListSaasSurfaceShipmentDetails();

	const [showUpdate, setShowUpdate] = useState({ show: false, data: {} });

	const handleShowModal = (item) => {
		setShowUpdate({ show: true, data: item });
	};

	const columns = useMemo(() => getColumns({
		handleShowModal,
		filters,
		setFilters,
	}), [filters, setFilters]);

	return (
		<div>
			<SearchFilters
				searchString={searchString}
				serialId={serialId}
				setSearchString={setSearchString}
				activeTab="truck_tracking"
				filters={filters}
				setFilters={setFilters}
				setSerialId={setSerialId}
			/>

			<ListPagination filters={filters} setFilters={setFilters} data={data} />

			<Table columns={columns} data={data?.list || []} loading={loading} className={styles.table} />

			{!loading && isEmpty(data?.list) ? <EmptyState /> : null}

			<ListPagination filters={filters} setFilters={setFilters} data={data} />

			{showUpdate.show ? <ViewTracking showUpdate={showUpdate} setShowUpdate={setShowUpdate} /> : null}
		</div>
	);
}

export default TruckTracking;
