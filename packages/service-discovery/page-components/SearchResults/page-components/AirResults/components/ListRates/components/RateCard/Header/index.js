import { Checkbox, cl, Popover, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';

import InfoBannerContent from '../../../../../../../../../common/InfoBannerContent';
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
	selectedCardIDs = [],
	setComparisonRates = () => {},
	isSelectedCard = false,
	infoBanner = {},
	showGuide = false,
	setInfoBanner = () => {},
	isMobile = false,
}) {
	const {
		airline = {},
		id: card_id,
		source = '',
		rate_type = '',
		is_minimum_threshold_rate = false,
		price_type = '',
	} = rate;

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

	const imageUrl = airline?.logo_url || GLOBAL_CONSTANTS.image_url.airline_default_icon;

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<span className={cl`${styles.tag} ${styles[source]}`}>
					{RATE_SOURCE_MAPPING[source] || 'System Rates'}
				</span>

				{rate_type && rate_type !== 'general' ? (
					<span className={cl`${styles.tag} ${styles.rate_type}`}>{startCase(rate_type)}</span>
				) : null}

				{is_minimum_threshold_rate ? (
					<span className={cl`${styles.tag} ${styles.min_price}`}>Min. Price</span>
				) : null}
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

				<div className={styles.airline_info}>
					<img
						src={imageUrl}
						alt={rate?.airline?.short_name}
						className={styles.airline__logo}
						height={30}
					/>

					<div className={styles.airline_name}>{rate?.airline?.short_name}</div>

					<div className={styles.tooltip}>
						<Tooltip
							placement="top"
							content={`Basic freight is ${
								price_type === 'all_in' ? 'inclusive' : 'exclusive'
							} of surcharges`}
						>
							{price_type === 'all_in' ? (
								<span className={styles.pill}>All Inclusive</span>
							) : (
								<span className={styles.pill}>Net - Net</span>
							)}
						</Tooltip>
					</div>
				</div>
			</div>

			<div className={styles.right_section}>
				<LikeDislike rateCardData={rate} detail={detail} isMobile={isMobile} />
			</div>
		</div>
	);
}

export default Header;
