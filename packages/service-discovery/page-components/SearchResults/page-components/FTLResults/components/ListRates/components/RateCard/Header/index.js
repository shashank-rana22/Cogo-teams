import { Checkbox, cl, Popover } from '@cogoport/components';
import { IcMUp } from '@cogoport/icons-react';

import InfoBannerContent from '../../../../../../../../../common/InfoBannerContent';
import LikeDislike from '../../../../../../../common/LikeDislike';

import styles from './styles.module.css';

const MAX_COMPARABLE_RATE_CARD_INDEX = 3;

const IMAGE_MAPPING = {
	one_way : <IcMUp className={styles.one_way_icon} />,
	round   : <IcMUp className={styles.one_way_icon} />,
};

const LABEL_MAPPING = {
	one_way : 'One Way',
	round   : 'Round Trip',
};

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
	isSelectedCard = false,
	infoBanner = {},
	showGuide = false,
	setInfoBanner = () => {},
}) {
	const { id: card_id, source = '' } = rate;

	const { trip_type = '' } = detail;

	const selectedCardIDs = Object.keys(comparisonRates);

	const handleCheckbox = () => {
		if (!selectedCardIDs.includes(card_id)) {
			setComparisonRates((pv) => ({
				...pv,
				[card_id]: rate,
			}));
		} else {
			setComparisonRates((prevRates) => {
				const { [card_id]: _, ...updatedRates } = prevRates;
				return updatedRates;
			});
		}
	};

	const { current, buttonProps = {}, totalBanners = 1 } = infoBanner;

	const showPopover = current === 'comparision_button' && showGuide;

	const popoverComponentData = buttonProps.comparision_button || {};

	const ImageComponent = IMAGE_MAPPING[trip_type] || null;

	return (
		<div className={styles.container}>
			<div className={cl`${styles.source_tag} ${styles[source]}`}>
				{RATE_SOURCE_MAPPING[source] || 'System Rates'}
			</div>

			<div className={styles.left_section}>
				{!isSelectedCard ? (
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
						visible={showPopover}
					>
						<Checkbox
							checked={selectedCardIDs.includes(card_id)}
							onChange={handleCheckbox}
							disabled={selectedCardIDs.length >= MAX_COMPARABLE_RATE_CARD_INDEX
						&& !selectedCardIDs.includes(card_id)}
						/>
					</Popover>
				) : null}

				<div className={styles.trip_type_container}>
					{ImageComponent}

					<span className={styles.trip_type_label}>
						{LABEL_MAPPING[trip_type]}
					</span>
				</div>
			</div>

			<div className={styles.right_section}>
				<LikeDislike rateCardData={rate} detail={detail} />
			</div>
		</div>
	);
}

export default Header;
