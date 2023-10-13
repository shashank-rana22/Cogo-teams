import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import RateRevertCard from './RateRevertCard';
import styles from './styles.module.css';

function ListRateReverts({ list = [], mailProps = {}, setActiveTab = () => {} }) {
	const [shipmentPopover, setShipmentPopover] = useState({});
	const [assignData, setAssignData] = useState({
		show          : false,
		revertDetails : {},
		assignUser    : '',
	});

	return (
		<div className={styles.container}>
			{!isEmpty(list) ? (
				(list || []).map((itm) => (
					<RateRevertCard
						key={itm?.id}
						cardData={itm}
						mailProps={mailProps}
						setShipmentPopover={setShipmentPopover}
						shipmentPopover={shipmentPopover}
						setAssignData={setAssignData}
						assignData={assignData}
						setActiveTab={setActiveTab}
					/>
				))
			) : (
				<div className={styles.loader}>
					<Image
						src={GLOBAL_CONSTANTS.image_url.empty_state}
						alt="empty"
						width={250}
						height={200}
					/>
				</div>
			)}
		</div>
	);
}

export default ListRateReverts;
