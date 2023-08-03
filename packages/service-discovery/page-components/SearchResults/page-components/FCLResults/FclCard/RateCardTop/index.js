import { Checkbox, Popover, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
// import { IcMShare } from '@cogoport/icons-react';
import React, { useState } from 'react';

import InfoBannerContent from '../../../../../../common/InfoBannerContent';
import ShareToUsers from '../../../../common/ShareToUsers';
import LikeDislike from '../LikeDislike';

import styles from './styles.module.css';

const RATE_SOURCE_MAPPING = {
	spot_rates            : 'System Rate',
	spot_negotiation_rate : 'Enquiry Reverted Rate',
	predicted             : 'System Rate',
	promotional           : 'Promotional',
	spot_booking          : 'Spot booking',
};

const MAX_COMPARABLE_RATE_CARD_INDEX = 3;

function ShareRate({ showShareModal, rateCardData, detail, setShowShareModal }) {
	if (showShareModal) {
		return (
			<ShareToUsers
				rate={rateCardData}
				show={showShareModal}
				onClose={() => setShowShareModal(false)}
				source="spot_search"
				org_id={detail?.importer_exporter_id}
			/>
		);
	}
	return null;
}

function RateCardTop({
	rateCardData = {},
	detail = {},
	setComparisonRates = () => {},
	comparisonRates = {},
	isSelectedCard = false,
	isCogoAssured = false,
	infoBanner = {},
	index = 0,
	setInfoBanner = () => {},
	showGuide = false,
}) {
	const { shipping_line = {}, id: card_id, source = '' } = rateCardData;
	const [showShareModal, setShowShareModal] = useState(false);

	const selectedCardIDs = Object.keys(comparisonRates);

	const handleCheckbox = () => {
		if (!selectedCardIDs.includes(card_id)) {
			setComparisonRates((pv) => ({
				...pv,
				[card_id]: rateCardData,
			}));
		} else {
			setComparisonRates((pv) => {
				const temp = { ...pv };
				delete temp[card_id];
				return temp;
			});
		}
	};

	const { current, buttonProps = {}, totalBanners = 1 } = infoBanner;

	const showPopover = current === 'comparision_button' && showGuide;

	const popoverComponentData = buttonProps.comparision_button || {};

	const renderCheckbox = () => {
		if (isSelectedCard) return null;

		return (
			<Popover
				placement="bottom"
				caret
				render={(
					<InfoBannerContent
						popoverComponentData={popoverComponentData}
						totalBanners={totalBanners}
						setInfoBanner={setInfoBanner}
					/>
				)}
				visible={showPopover && !index}
			>
				<Checkbox
					checked={selectedCardIDs.includes(card_id)}
					onChange={() => {
						handleCheckbox();
					}}
					disabled={
					selectedCardIDs.length > MAX_COMPARABLE_RATE_CARD_INDEX
					&& !selectedCardIDs.includes(card_id)
				}
				/>
			</Popover>
		);
	};

	const renderLikeDislike = () => <LikeDislike rateCardData={rateCardData} detail={detail} />;

	// const handleShareIconClick = () => {
	// 	setShowShareModal(!showShareModal);
	// };

	const imageUrl = isCogoAssured ? GLOBAL_CONSTANTS.image_url.cogo_assured_banner : shipping_line?.logo_url;

	return (
		<div className={styles.container}>
			{isCogoAssured ? null : (
				<div className={cl`${styles.source_tag} ${styles[source]}`}>
					{RATE_SOURCE_MAPPING[source] || 'System Rates'}
				</div>
			)}

			<div className={cl`${styles.logo_container} ${styles[source]}`}>
				{renderCheckbox()}

				{imageUrl ? (
					<img
						src={imageUrl}
						alt={rateCardData?.shipping_line?.short_name || rateCardData?.airline?.short_name}
						style={{ height: 24, objectFit: 'cover' }}
					/>
				) : <strong>{rateCardData?.shipping_line?.short_name || rateCardData?.airline?.short_name}</strong>}
			</div>

			<div style={{ display: 'flex', marginRight: 20, alignItems: 'center' }}>
				{renderLikeDislike()}

				{/* <IcMShare
					className={styles.share_icon}
					width="20px"
					height="16px"
					onClick={handleShareIconClick}
				/> */}
			</div>

			<ShareRate
				showShareModal={showShareModal}
				rateCardData={rateCardData}
				detail={detail}
				setShowShareModal={setShowShareModal}
			/>
		</div>
	);
}

export default RateCardTop;
