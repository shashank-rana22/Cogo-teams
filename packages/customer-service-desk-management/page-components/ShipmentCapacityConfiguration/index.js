import React from 'react';

import useGetCsdConfigurations from '../../hooks/useGetCsdConfigurations';

import ConfigList from './ConfigList';
import Header from './Header';

function ShipmentCapacityCofiguration() {
	const {
		list = [], loading, pageData = {}, page, setPage = () => {},
		filters = {}, setFilters = () => {},
	} = useGetCsdConfigurations('list');

	return (
		<>
			<Header filters={filters} setFilters={setFilters} />
			<ConfigList list={list} loading={loading} pageData={pageData} page={page} setPage={setPage} />
		</>

	);
}

export default ShipmentCapacityCofiguration;
