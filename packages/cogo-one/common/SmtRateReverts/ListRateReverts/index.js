import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import AssignModal from './AssignModal';
import RateModal from './RateModal';
import RateRevertCard from './RateRevertCard';
import styles from './styles.module.css';

function ListRateReverts({
	list = [],
	mailProps = {},
	setActiveTab = () => {},
	fetchRateJobs = () => {},
	params = {},
	triggeredFrom = '',
}) {
	const [shipmentPopover, setShipmentPopover] = useState({});
	const [showAddRateModal, setShowAddRateModal] = useState({});
	const [assignData, setAssignData] = useState({
		showModal     : false,
		showPopover   : false,
		revertDetails : {},
		assignUser    : '',
	});

	const isTriggeredFromSideBar = triggeredFrom === 'sideBar';

	if (isEmpty(list)) {
		return (
			<div className={styles.loader}>
				<Image
					src={GLOBAL_CONSTANTS.image_url.empty_state}
					alt="empty"
					width={310}
					height={200}
				/>
			</div>
		);
	}

	return (
		<div
			className={styles.container}
			style={{ height: isTriggeredFromSideBar ? '100%' : 'calc(100% - 64px)' }}
		>
			{(list || []).map(
				(itm) => (
					<RateRevertCard
						key={itm?.id}
						cardData={itm}
						mailProps={mailProps}
						setShipmentPopover={setShipmentPopover}
						shipmentPopover={shipmentPopover}
						setAssignData={setAssignData}
						assignData={assignData}
						setActiveTab={setActiveTab}
						setShowAddRateModal={setShowAddRateModal}
						isTriggeredFromSideBar={isTriggeredFromSideBar}
					/>
				),
			)}

			{assignData?.showModal
				? (
					<AssignModal
						assignData={assignData}
						setAssignData={setAssignData}
						fetchRateJobs={fetchRateJobs}
					/>
				)
				: null}

			{showAddRateModal?.showModal ? (
				<RateModal
					params={params}
					fetchRateJobs={fetchRateJobs}
					showAddRateModal={showAddRateModal}
					setShowAddRateModal={setShowAddRateModal}
				/>
			) : null}
		</div>
	);
}

export default ListRateReverts;
