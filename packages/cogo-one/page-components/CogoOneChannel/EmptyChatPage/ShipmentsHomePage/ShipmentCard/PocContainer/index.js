import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowBack } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import React, { useState } from 'react';

import CommunicationModal from '../../../../../../common/CommunicationModal';
import useListShipmentStakeholders from '../../../../../../hooks/useListShipmentStakeholders';
import useListShipmentTradePartners from '../../../../../../hooks/useListShipmentTradePartners';

import PocUser from './PocUser';
import styles from './styles.module.css';

function PocContainer({
	setShowPocDetails = () => {},
	showPocDetails = {},
	setActiveTab = () => {},
}) {
	const [modalData, setModalData] = useState({});
	const { id = '' } = showPocDetails;
	const { stakeHoldersData = [], loading } = useListShipmentStakeholders({ shipmentId: id });

	const { tradePartnersLoading = false, tradePartnersData = [] } = useListShipmentTradePartners({ shipmentId: id });

	const { modalType = '', userData = {} } = modalData || {};

	const closeModal = () => {
		setModalData(null);
	};

	const mergedData = tradePartnersData.concat(stakeHoldersData) || [];

	return (
		<div className={styles.container}>
			<div
				role="presentation"
				className={styles.header}
				onClick={() => setShowPocDetails({})}
			>
				<IcMArrowBack />
				Back
			</div>

			<div className={styles.title}>
				Initiate Conversation
			</div>

			<div className={styles.poc_users_container}>
				{(loading || tradePartnersLoading)
					? (
						<Image
							src={GLOBAL_CONSTANTS.image_url.spinner_loader}
							height={50}
							width={50}
							alt="spinner"
						/>
					)
					: (
						<PocUser
							stakeHoldersData={mergedData}
							setActiveTab={setActiveTab}
							setModalData={setModalData}
						/>
					)}
			</div>

			{modalType && (
				<CommunicationModal
					modalType={modalType}
					closeModal={closeModal}
					activeCardData={{ userId: userData?.id }}
					userData={{
						email: userData?.email,
					}}
				/>
			)}
		</div>
	);
}

export default PocContainer;
