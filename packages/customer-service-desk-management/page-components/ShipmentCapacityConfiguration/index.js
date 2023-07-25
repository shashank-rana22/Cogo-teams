import React from 'react';

import useGetCsdConfigurations from '../../hooks/useGetCsdConfigurations';

import ConfigList from './ConfigList';
import Header from './Header';

function ShipmentCapacityCofiguration() {
	const { list = [], loading, pageData = {}, page, setPage = () => {} } = useGetCsdConfigurations({});

	return (
		<>
			<Header />
			<ConfigList list={list} loading={loading} pageData={pageData} page={page} setPage={setPage} />
		</>

	);
}

export default ShipmentCapacityCofiguration;
