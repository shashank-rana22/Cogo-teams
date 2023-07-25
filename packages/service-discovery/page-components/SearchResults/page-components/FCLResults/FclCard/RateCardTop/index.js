import { Checkbox, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMShare } from '@cogoport/icons-react';
import React, { useState } from 'react';

import ShareToUsers from '../../../../common/ShareToUsers';
import LikeDislike from '../LikeDislike';

import styles from './styles.module.css';

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
}) {
	const { shipping_line = {}, id: card_id } = rateCardData;
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

	const getTooltipMessage = () => {
		if (selectedCardIDs.length > 3 && !selectedCardIDs.includes(card_id)) {
			return 'Maximum 4 cards can be compared';
		}
		if (selectedCardIDs.includes(card_id)) {
			return 'Click to remove';
		}

		return 'Select to compare rates';
	};

	const renderCheckbox = () => {
		if (isSelectedCard) return null;
		return (
			<Tooltip content={getTooltipMessage()} placement="top">
				<div>
					<Checkbox
						checked={selectedCardIDs.includes(card_id)}
						onChange={() => {
							handleCheckbox();
						}}
						disabled={
					selectedCardIDs.length > 3
					&& !selectedCardIDs.includes(card_id)
				}
					/>
				</div>
			</Tooltip>
		);
	};

	const renderLikeDislike = () => <LikeDislike rateCardData={rateCardData} detail={detail} />;

	const handleShareIconClick = () => {
		setShowShareModal(!showShareModal);
	};

	const imageUrl = isCogoAssured ? GLOBAL_CONSTANTS.image_url.cogo_assured_banner : shipping_line?.logo_url;

	return (
		<div className={styles.container}>
			<div className={styles.logoContainer}>
				{renderCheckbox()}

				<img
					src={imageUrl}
					alt={rateCardData?.shipping_line?.short_name || rateCardData?.airline?.short_name}
					style={{ height: 24, objectFit: 'cover' }}
				/>
			</div>

			<div style={{ display: 'flex', marginRight: 20, alignItems: 'center' }}>
				{renderLikeDislike()}

				<IcMShare
					className={styles.share_icon}
					width="20px"
					height="16px"
					onClick={handleShareIconClick}
				/>
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
