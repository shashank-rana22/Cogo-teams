import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowBack } from '@cogoport/icons-react';
import { Image } from '@cogoport/next';

import getAllPocMergedData from '../../helpers/getAllPocMergedData';
import useListShipmentStakeholders from '../../hooks/useListShipmentStakeholders';
import useListShipmentTradePartners from '../../hooks/useListShipmentTradePartners';

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
	mailProps = {},
}) {
	const { id = '' } = showPocDetails;

	const { stakeHoldersData = [], loading } = useListShipmentStakeholders({ shipmentId: id });

	const { tradePartnersLoading = false, tradePartnersData = [] } = useListShipmentTradePartners({ shipmentId: id });

	const allPocMergedData = getAllPocMergedData({ tradePartnersData, stakeHoldersData, showPocDetails });

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
							stakeHoldersData={allPocMergedData}
							setActiveTab={setActiveTab}
							handleShipmentChat={handleShipmentChat}
							showPocDetails={showPocDetails}
							mailProps={mailProps}
						/>
					)}
			</div>
		</div>
	);
}

export default PocContainer;
