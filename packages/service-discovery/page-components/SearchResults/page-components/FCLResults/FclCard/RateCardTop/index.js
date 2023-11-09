import { Checkbox, Popover, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import InfoBannerContent from '../../../../../../common/InfoBannerContent';
import LikeDislike from '../../../../common/LikeDislike';

import styles from './styles.module.css';

const RATE_SOURCE_MAPPING = {
	spot_rates   : 'System Rate',
	predicted    : 'System Rate',
	promotional  : 'Promotional',
	spot_booking : 'Spot booking',
};

const MAX_COMPARABLE_RATE_CARD_INDEX = 3;

function RenderCheckbox({
	isSelectedCard = false,
	popoverComponentData = {},
	totalBanners = 1,
	setInfoBanner = () => {},
	index = 0,
	card_id = '',
	setComparisonRates = () => {},
	selectedCardIDs = [],
	rateCardData = {},
	showPopover = false,
}) {
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
				onChange={handleCheckbox}
				disabled={
					selectedCardIDs.length >= MAX_COMPARABLE_RATE_CARD_INDEX
					&& !selectedCardIDs.includes(card_id)
				}
			/>
		</Popover>
	);
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
	cogoAssuredRates = [],
	isMobile = false,
}) {
	const { shipping_line = {}, id: card_id, source = '' } = rateCardData;

	const selectedCardIDs = Object.keys(comparisonRates);
	const selectedCardValues = Object.values(comparisonRates);

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

	const { current, buttonProps = {}, totalBanners = 1 } = infoBanner;

	const showPopover = current === 'comparision_button' && showGuide;

	const popoverComponentData = buttonProps.comparision_button || {};

	const imageUrl = isCogoAssured ? GLOBAL_CONSTANTS.image_url.cogo_assured_banner : shipping_line?.logo_url;
	const defaultShippingLineIcon = GLOBAL_CONSTANTS.image_url.shipping_line_default_icon;

	return (
		<div className={styles.container}>
			{isCogoAssured ? null : (
				<div className={cl`${styles.source_tag} ${styles[source]}`}>
					{RATE_SOURCE_MAPPING[source] || 'System Rates'}
				</div>
			)}

			<div className={cl`${styles.logo_container} ${styles[source]}`}>
				<RenderCheckbox
					isSelectedCard={isSelectedCard}
					popoverComponentData={popoverComponentData}
					totalBanners={totalBanners}
					setInfoBanner={setInfoBanner}
					index={index}
					card_id={card_id}
					setComparisonRates={setComparisonRates}
					selectedCardIDs={selectedCardIDs}
					rateCardData={rateCardData}
					showPopover={showPopover}
				/>

				<div
					className={styles.shipping_line_info}
					style={{ marginLeft: isSelectedCard ? '12px' : '0px' }}
				>
					<img
						src={imageUrl || defaultShippingLineIcon}
						alt={rateCardData?.shipping_line?.short_name || rateCardData?.airline?.short_name}
						className={cl`${styles.shipping_line_logo} ${!imageUrl && styles.default_icon}`}
						height={20}
					/>

					{source !== 'cogo_assured_rate' ? (
						<strong className={styles.shipping_line_name}>
							{rateCardData?.shipping_line?.short_name || rateCardData?.airline?.short_name}
						</strong>
					) : null}
				</div>

				{!isCogoAssured ? (
					<span className={styles.is_nvocc}>
						{shipping_line?.is_nvocc ? 'NVOCC' : 'Main Line'}
					</span>
				) : null}
			</div>

			<div className={styles.right_section}>
				<LikeDislike rateCardData={rateCardData} detail={detail} isMobile={isMobile} />
			</div>
		</div>
	);
}

export default RateCardTop;
