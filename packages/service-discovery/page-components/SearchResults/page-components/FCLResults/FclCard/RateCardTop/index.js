import { Checkbox } from '@cogoport/components';
import { IcMShare } from '@cogoport/icons-react';
import React, { useState, useEffect } from 'react';

import ShareToUsers from '../../../../common/ShareToUsers';
import LikeDislike from '../LikeDislike';

import styles from './styles.module.css';

const LIKE_DISLIKE_ALLOWED = [
	'fcl_freight',
	'air_freight',
	'ftl_freight',
	'ltl_freight',
	'lcl_freight',
	'fcl_customs',
	'lcl_customs',
	'air_customs',
	'haulage_freight',
	'trailer_freight',
];

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

function RateCardTop({ rateCardData = {}, detail = {}, setComparisonCheckbox = () => {}, isSelectedCard = false }) {
	const { shipping_line = {}, card } = rateCardData;
	const [isChecked, setIsChecked] = useState(false);
	const [showShareModal, setShowShareModal] = useState(false);

	useEffect(() => {
		if (isChecked) {
			setComparisonCheckbox((prevValue) => ({
				...prevValue,
				[card]: shipping_line?.id,
			}));
		} else {
			setComparisonCheckbox((prevValue) => {
				const temp = { ...prevValue };
				delete temp[card];
				return temp;
			});
		}
	}, [card, isChecked, setComparisonCheckbox, shipping_line.id]);

	const handleCheckboxChange = () => {
		setIsChecked(!isChecked);
	};

	const renderCheckbox = () => {
		if (isSelectedCard) return null;
		return <Checkbox checked={isChecked} onChange={handleCheckboxChange} />;
	};

	const renderLikeDislike = () => {
		if (!LIKE_DISLIKE_ALLOWED.includes(detail?.search_type)) return null;
		return <LikeDislike rateCardData={rateCardData} detail={detail} />;
	};

	const handleShareIconClick = () => {
		setShowShareModal(!showShareModal);
	};

	return (
		<div className={styles.container}>
			<div className={styles.logoContainer}>
				{renderCheckbox()}

				<img
					src={shipping_line?.logo_url}
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
