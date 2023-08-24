import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowBack } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import React, { useState } from 'react';

import CommunicationModal from '../../../../../../common/CommunicationModal';
import useListShipmentStakeholders from '../../../../../../hooks/useListShipmentStakeholders';
import useListShipmentTradePartners from '../../../../../../hooks/useListShipmentTradePartners';

import PocUser from './PocUser';
import styles from './styles.module.css';

const RECOGNIZATIONS = [
	{
		colorCode : '#d6b200',
		title     : 'Customers',
	},
	{
		colorCode : '#c26d1a',
		title     : 'Trade Partners',
	},
	{
		colorCode : '#6fa5ab',
		title     : 'Stakeholders',
	},
];

function PocContainer({
	setShowPocDetails = () => {},
	showPocDetails = {},
	setActiveTab = () => {},
	handleShipmentChat = () => {},
}) {
	const [modalData, setModalData] = useState({});
	const { id = '', primary_poc_details = {}, importer_exporter_poc = {} } = showPocDetails;

	const { stakeHoldersData = [], loading } = useListShipmentStakeholders({ shipmentId: id });

	const { tradePartnersLoading = false, tradePartnersData = [] } = useListShipmentTradePartners({ shipmentId: id });

	const PocDetails = [importer_exporter_poc];

	if (primary_poc_details && primary_poc_details?.id !== importer_exporter_poc?.id) {
		const updatedPocData = { ...primary_poc_details, is_primary_poc: true };
		PocDetails.unshift(updatedPocData);
	}

	const updatedPocDetails = PocDetails?.reduce((accumulator, item) => {
		const updatedItem = item?.is_primary_poc ? { ...item, chat_option: true, is_customer: true }
			: { ...item, chat_option: true, is_primary_poc: false, is_customer: true };
		accumulator.push(updatedItem);
		return accumulator;
	}, []);

	const updatedTradePartnersData = tradePartnersData?.reduce((accumulator, item) => {
		const updatedItem = { ...item, chat_option: true, is_trade_partner: true };
		accumulator.push(updatedItem);
		return accumulator;
	}, []);

	const { modalType = '', userData = {} } = modalData || {};

	const closeModal = () => {
		setModalData(null);
	};

	const mergedData = [...updatedPocDetails, ...updatedTradePartnersData, ...stakeHoldersData];

	return (
		<div className={styles.container}>
			<div
				role="presentation"
				className={styles.header}
				onClick={() => setShowPocDetails({})}
			>
				<IcMArrowBack />
			</div>
			<div className={styles.recognizations}>
				{(RECOGNIZATIONS || []).map((item) => (
					<div className={styles.single_container} key={item}>
						<div className={styles.circle} style={{ background: `${item?.colorCode}` }} />
						<div className={styles.color_title}>
							{item.title}
						</div>
					</div>
				))}

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
							handleShipmentChat={handleShipmentChat}
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
