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

	const ActiveComp = getUserActivityComponent(activityTab, activeSubTab) || null;

	return (
		emptyCheck ? (
			<div className={styles.empty}>
				<EmptyState type="activities" />
			</div>
		) : (
			<div
				className={styles.list_container}
			>
				{ActiveComp && (
					<ActiveComp
						communication={communication}
						platform={platform}
						transactional={transactional}
						timeLineList={timeLineList}
						chatDataList={chatDataList}
						setRaiseTicketModal={setRaiseTicketModal}
					/>
				)}
			</div>
		)
	);
}

export default ActiveComponent;
