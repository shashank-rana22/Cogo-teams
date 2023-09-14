import { Button } from '@cogoport/components';
import React, { useState } from 'react';

import meetingColumns from '../../../../../../configs/meetingConfig';
import useGetOrganizationComLogs from '../../../../../../hooks/useGetOrganizationComLogs';
import LogModal from '../../../../LogModal';
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
				<Button
					themeType="primary"
					className={styles.feedback}
					onClick={() => setShowLog(true)}
				>
					Add Meeting
				</Button>
			</div>
			<LogModal
				showLog={showLog}
				setShowLog={setShowLog}
				organizationId={orgData?.selfOrganizationId}
				type="meeting"
				refetch={refetch}
			/>
			<Table
				loading={loading}
				data={data}
				refetch={refetch}
				setFilters={setFilters}
				filters={filters}
				config={meetingColumns}
			/>
		</div>
	);
}

export default Meeting;
