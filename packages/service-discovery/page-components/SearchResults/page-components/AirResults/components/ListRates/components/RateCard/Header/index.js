import { Checkbox, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import LikeDislike from '../../../../../../../common/LikeDislike';

import styles from './styles.module.css';

const MAX_COMPARABLE_RATE_CARD_INDEX = 3;

const RATE_SOURCE_MAPPING = {
	spot_rates            : 'System Rate',
	spot_negotiation_rate : 'Enquiry Reverted Rate',
	predicted             : 'System Rate',
	promotional           : 'Promotional',
	spot_booking          : 'Spot booking',
};

function Header({
	rate = {},
	detail = {},
	comparisonRates = {},
	cogoAssuredRates = [],
	setComparisonRates = () => {},
	// infoBanner = {},
	// showGuide = false,
	isCogoAssured = false,
	isSelectedCard = false,
}) {
	// const { airline = {}, id: card_id, source = '' } = rate;
	const { airline = {}, card:card_id = '', source = '' } = rate;

	const selectedCardIDs = Object.keys(comparisonRates);
	const selectedCardValues = Object.values(comparisonRates);
	const handleCheckbox = () => {
		if (!selectedCardIDs.includes(card_id)) {
			setComparisonRates((pv) => ({
				...pv,
				[card_id]: rate,
			}));
		} else {
			setComparisonRates((pv) => {
				const temp = { ...pv };
				delete temp[card_id];
				return temp;
			});
		}
	};

	// const { current, buttonProps = {}, totalBanners = 1 } = infoBanner;

	// const showPopover = current === 'comparision_button' && showGuide;

	// const popoverComponentData = buttonProps.comparision_button || {};

	const imageUrl = isCogoAssured ? GLOBAL_CONSTANTS.image_url.cogo_assured_banner : airline?.logo_url;

	useEffect(() => {
		const selectedCogoAssuredRate = selectedCardValues.find(
			(cardValue) => cardValue.source === 'cogo_assured_rate',
		);
		if (selectedCogoAssuredRate || isEmpty(cogoAssuredRates) || isEmpty(selectedCardValues)) return;
		const cogoAssuredRate = cogoAssuredRates?.[GLOBAL_CONSTANTS.zeroth_index];

		setComparisonRates((pv) => ({
			...pv,
			[cogoAssuredRate?.id]: cogoAssuredRate,
		}));
	}, [cogoAssuredRates, selectedCardValues, setComparisonRates]);

	return (
		<div className={styles.container}>
			{isCogoAssured ? null : (
				<div className={cl`${styles.source_tag} ${styles[source]}`}>
					{RATE_SOURCE_MAPPING[source] || 'System Rates'}
				</div>
			)}

			<div className={styles.left_section}>
				<Checkbox
					checked={selectedCardIDs.includes(card_id)}
					onChange={handleCheckbox}
					disabled={
					selectedCardIDs.length >= MAX_COMPARABLE_RATE_CARD_INDEX
					&& !selectedCardIDs.includes(card_id)
				}
				/>

				<div
					className={styles.airline_info}
					style={{ marginLeft: isSelectedCard ? '12px' : '0px' }}
				>
					{imageUrl ? (
						<img
							src={imageUrl}
							alt={rate?.airline?.short_name}
							className={styles.airline__logo}
							height={30}
						/>
					) : null}

					{source !== 'cogo_assured_rate' ? (
						<div className={styles.airline_name}>
							{rate?.airline?.short_name}
						</div>
					) : null}
				</div>
			</div>

			<div className={styles.right_section}>
				<LikeDislike rateCardData={rate} detail={detail} />
			</div>
		</div>
	);
}

export default Header;
