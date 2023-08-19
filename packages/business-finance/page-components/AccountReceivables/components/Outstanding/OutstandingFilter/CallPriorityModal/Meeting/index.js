import { Button } from '@cogoport/components';
import React, { useState } from 'react';

import useGetOrganizationComLogs from '../../../../../hooks/useGetOrganizationComLogs';
import LogModal from '../../../LogModal';
import Table from '../Table';

import styles from './styles.module.css';

function Meeting({ orgData = {} }) {
	const [showLog, setShowLog] = useState(false);
	const {
		loading,
		data,
		refetch,
		setFilters,
		filters,
	} = useGetOrganizationComLogs({ orgData, communication_type: 'meeting' });
	return (
		<div className={styles.container}>
			<div className={styles.buttons}>
				<Button themeType="secondary">Show Logs</Button>
				<Button
					themeType="primary"
					className={styles.feedback}
					onClick={() => setShowLog(true)}
				>
					Add Meeting
				</Button>
			</div>
			<LogModal showLog={showLog} setShowLog={setShowLog} />
			<Table
				loading={loading}
				data={data}
				refetch={refetch}
				setFilters={setFilters}
				filters={filters}
			/>
		</div>
	);
}

export default Meeting;
