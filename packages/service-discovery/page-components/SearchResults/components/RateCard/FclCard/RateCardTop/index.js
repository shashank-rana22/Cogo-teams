import { Checkbox } from '@cogoport/components';
import { IcMShare } from '@cogoport/icons-react';
import React, { useState, useEffect } from 'react';

import ShareToUsers from '../../../../common/ShareToUsers';
import LikeDislike from '../LikeDislike';

import styles from './styles.module.css';

const SHOW_TAG_IN_SERVICES = ['fcl_freight', 'fcl_freight_local'];

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

function RateCardTop({ rateCardData = {}, detail = {}, setComparisonCheckbox = () => {}, isSelectedCard }) {
	const { shipping_line = {}, card } = rateCardData;

	const [isChecked, setIsChecked] = useState(false);
	const [showShareModal, setShowShareModal] = useState(false);

	useEffect(() => {
		if (isChecked) {
			setComparisonCheckbox((pv) => ({
				...pv,
				[card]: shipping_line?.id,
			}));
		} else {
			setComparisonCheckbox((pv) => {
				const temp = { ...pv };
				delete temp[card];
				return temp;
			});
		}
	}, [card, isChecked, setComparisonCheckbox, shipping_line.id]);

	return (
		<div className={styles.container}>
			<div className={styles.container}>

				{isSelectedCard ? null : (
					<Checkbox
						checked={isChecked}
						onChange={() => {
							setIsChecked(!isChecked);
						}}
					/>
				)}

				<img
					src={shipping_line?.logo_url}
					alt={rateCardData?.shipping_line?.short_name || rateCardData?.airline?.short_name}
					style={{ height: 24, objectFit: 'cover' }}
				/>

			</div>

			<div style={{ display: 'flex', marginRight: 20, alignItems: 'center' }}>

				{LIKE_DISLIKE_ALLOWED.includes(detail?.search_type) ? (
					<LikeDislike
						rateCardData={rateCardData}
						detail={detail}
					/>
				) : null}

				<IcMShare
					className={styles.share_icon}
					width="20px"
					height="16px"
					onClick={() => setShowShareModal(!showShareModal)}
				/>
			</div>

			{showShareModal ? (
				<ShareToUsers
					rate={rateCardData}
					show={showShareModal}
					onClose={() => setShowShareModal(false)}
					source="spot_search"
					org_id={detail?.importer_exporter_id}
				/>
			) : null}

		</div>
	);
}

export default RateCardTop;
