import React from 'react';

import EmptyState from '../../../../../common/EmptyState';
import getUserActivityComponent from '../../../../../utils/getUserActivityComponent';

import styles from './styles.module.css';

function ActiveComponent(props) {
	const {
		emptyCheck = false, activityTab = '', activeSubTab = '', data = {},
		timeLineList = [], chatDataList = [], setRaiseTicketModal = () => {},
	} = props || {};

	const { communication = {}, platform = {}, transactional = {} } = data || {};

	if (emptyCheck) {
		return (
			<div className={styles.empty}>
				<EmptyState type="activities" />
			</div>
		);
	}

	const ActiveComp = getUserActivityComponent({ activityTab, activeSubTab }) || null;

	if (!ActiveComp) {
		return null;
	}

	return (
		<div className={styles.list_container}>
			<ActiveComp
				communication={communication}
				platform={platform}
				transactional={transactional}
				timeLineList={timeLineList}
				chatDataList={chatDataList}
				setRaiseTicketModal={setRaiseTicketModal}
			/>
		</div>
	);
}

export default ActiveComponent;
