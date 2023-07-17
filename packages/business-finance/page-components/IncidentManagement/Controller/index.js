import React from 'react';

import CreateLevelModal from '../common/CreateForm';
import useGetLevels from '../common/hooks/useGetLevels';

import CustomTable from './CustomTable';
import styles from './styles.module.css';

function Controller() {
	const { incidentData, incidentLoading, getIncidentLevels } = useGetLevels();
	return (
		<div className={styles.table}>
			<div className={styles.create}>
				<CreateLevelModal refetch={getIncidentLevels} />
			</div>
			<CustomTable
				incidentData={incidentData}
				incidentLoading={incidentLoading}
				getIncidentLevels={getIncidentLevels}
			/>
		</div>
	);
}

export default Controller;
