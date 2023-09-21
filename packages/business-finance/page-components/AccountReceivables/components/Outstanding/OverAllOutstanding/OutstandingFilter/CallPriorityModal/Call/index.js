import React, { useState } from 'react';

import callConfig from '../../../../../../configs/callConfig';
import useGetOrganizationComLogs from '../../../../../../hooks/useGetOrganizationComLogs';
import LogModal from '../../../../LogModal';
import Table from '../Table';

import styles from './styles.module.css';

function Call({ orgData = {} }) {
	const [showLog, setShowLog] = useState(false);
	const {
		loading,
		data,
		refetch,
		setFilters,
		filters,
	} = useGetOrganizationComLogs({ orgData, communication_type: 'call' });
	return (
		<div className={styles.container}>
			<LogModal
				showLog={showLog}
				setShowLog={setShowLog}
				organizationId={orgData?.selfOrganizationId}
				type="call"
				refetch={refetch}
			/>
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
