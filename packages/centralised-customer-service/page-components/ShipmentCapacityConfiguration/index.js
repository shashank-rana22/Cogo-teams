import React, { useEffect } from 'react';

import useGetCcsShipmentCapacityDetails from '../../hooks/useGetCcsShipmentCapacityDetails';

import ConfigList from './ConfigList';
import Header from './Header';

function ShipmentCapacityCofiguration() {
	const {
		list = [], loading, pageData = {}, page, setPage = () => {},
		filters = {}, setFilters = () => {}, fetchList = () => {},
	} = useGetCcsShipmentCapacityDetails();

	useEffect(() => {
		fetchList();
	}, [fetchList]);

	return (
		<>
			<Header filters={filters} setFilters={setFilters} />
			<ConfigList
				list={list}
				loading={loading}
				pageData={pageData}
				page={page}
				setPage={setPage}
				fetchList={fetchList}
			/>
		</>
	);
}

export default ShipmentCapacityCofiguration;
