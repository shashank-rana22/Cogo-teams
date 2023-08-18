import React, { useEffect } from 'react';

import useGetCcsConfigurations from '../../hooks/useGetCcsConfigurations';

import Header from './Header';
import OrgConfigPoolList from './OrgConfigPoolList';

function OrganizationConfigurationPool() {
	const {
		list = [], loading, pageData = {}, page, setPage = () => {},
		filters = {}, setFilters = () => {}, fetchList = () => {},
	} = useGetCcsConfigurations();

	useEffect(() => {
		fetchList();
	}, [fetchList]);

	return (
		<>
			<Header filters={filters} setFilters={setFilters} setPage={setPage} />
			<OrgConfigPoolList
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

export default OrganizationConfigurationPool;
