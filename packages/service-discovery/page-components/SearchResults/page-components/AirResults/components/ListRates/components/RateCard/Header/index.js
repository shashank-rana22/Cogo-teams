import { Checkbox, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

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
	setComparisonRates = () => {},
	// infoBanner = {},
	// showGuide = false,
	isSelectedCard = false,
}) {
	const { airline = {}, id: card_id, source = '' } = rate;

	const selectedCardIDs = Object.keys(comparisonRates);

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

	const imageUrl = airline?.logo_url || GLOBAL_CONSTANTS.image_url.airline_default_icon;

	return (
		<div className={styles.container}>
			<div className={cl`${styles.source_tag} ${styles[source]}`}>
				{RATE_SOURCE_MAPPING[source] || 'System Rates'}
			</div>

			<div className={styles.left_section}>
				{!isSelectedCard ? (
					<Checkbox
						checked={selectedCardIDs.includes(card_id)}
						onChange={handleCheckbox}
						disabled={selectedCardIDs.length >= MAX_COMPARABLE_RATE_CARD_INDEX
						&& !selectedCardIDs.includes(card_id)}
					/>
				) : null}

				<div className={styles.airline_info}>
					<img
						src={imageUrl}
						alt={rate?.airline?.short_name}
						className={styles.airline__logo}
						height={30}
					/>

					<div className={styles.airline_name}>
						{rate?.airline?.short_name}
					</div>
				</div>
			</div>

			<div className={styles.right_section}>
				<LikeDislike rateCardData={rate} detail={detail} />
			</div>
		</div>
	);
}

export default Header;
