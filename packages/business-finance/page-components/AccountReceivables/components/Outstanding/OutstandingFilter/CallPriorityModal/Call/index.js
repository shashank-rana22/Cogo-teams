import { Button } from '@cogoport/components';
import React, { useState } from 'react';

import callConfig from '../../../../../configs/callConfig';
import useGetOrganizationComLogs from '../../../../../hooks/useGetOrganizationComLogs';
import LogModal from '../../../LogModal';
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
			<div className={styles.buttons}>
				<Button themeType="secondary">Show Logs</Button>
				<Button
					themeType="primary"
					className={styles.feedback}
					onClick={() => setShowLog(true)}
				>
					Add Call Feedback
				</Button>
			</div>
			<LogModal showLog={showLog} setShowLog={setShowLog} />
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
