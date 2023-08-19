import React from 'react';

import callConfig from '../../../../../configs/callConfig';
import useGetOrganizationComLogs from '../../../../../hooks/useGetOrganizationComLogs';
import Table from '../Table';

import styles from './styles.module.css';

function Call({ orgData = {} }) {
	const {
		loading,
		data,
		refetch,
		setFilters,
		filters,
	} = useGetOrganizationComLogs({ orgData, communication_type: 'call' });
	return (
		<div className={styles.container}>
			<Table
				loading={loading}
				data={data}
				refetch={refetch}
				setFilters={setFilters}
				filters={filters}
				config={callConfig}
			/>
		</div>
	);
}

export default Call;
