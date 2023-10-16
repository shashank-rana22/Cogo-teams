import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
// eslint-disable-next-line max-len
import AddRateModal from '@cogoport/supply-dashboards/page-components/RateCoverage/components/ListData/ListCard/AddRateModal';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import AssignModal from './AssignModal';
import RateRevertCard from './RateRevertCard';
import styles from './styles.module.css';

function ListRateReverts({
	list = [],
	mailProps = {},
	setActiveTab = () => {},
	fetchRateJobs = () => {},
}) {
	const [shipmentPopover, setShipmentPopover] = useState({});
	const [showAddRateModal, setShowAddRateModal] = useState(false);
	const [assignData, setAssignData] = useState({
		showModal     : false,
		showPopover   : false,
		revertDetails : {},
		assignUser    : '',
	});

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
		<div className={styles.container}>
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

			{showAddRateModal ? (
				<AddRateModal
					showModal={showAddRateModal}
					setShowModal={setShowAddRateModal}
					filter={{}}
					data={{}}
					getListCoverage={fetchRateJobs}
				/>
			) : null}
		</div>
	);
}

export default ListRateReverts;
