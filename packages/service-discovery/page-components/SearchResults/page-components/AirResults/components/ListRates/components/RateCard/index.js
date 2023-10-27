import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import PromoCode from '../../../../../../common/Promocode';
import getPromotion from '../../../../../../utils/getPromotion';

import Body from './Body';
import Footer from './Footer';
import Header from './Header';
import styles from './styles.module.css';

function RateCard({
	rate = {},
	detail = {},
	comparisonRates = {},
	setComparisonRates = () => {},
	isSelectedCard = false,
	index = 0,
	setRouterLoading = () => {},
	infoBanner = {},
	showGuide = false,
	setInfoBanner = () => {},
	isMobile = false,
}) {
	const selectedCardIDs = Object.keys(comparisonRates);

	const selectedForComparison = selectedCardIDs.includes(rate?.id);

	return (
		<div
			className={cl`
				${styles.container} 
				${isSelectedCard && styles.selected_card} 
				${selectedForComparison && styles.compared_rate}`}
			style={{
				marginTop: index === GLOBAL_CONSTANTS.zeroth_index ? '0px' : '40px',
			}}
		>
			<Header
				detail={detail}
				rate={rate}
				selectedCardIDs={selectedCardIDs}
				setComparisonRates={setComparisonRates}
				isSelectedCard={isSelectedCard}
				infoBanner={infoBanner}
				showGuide={showGuide}
				setInfoBanner={setInfoBanner}
				isMobile={isMobile}
			/>

			<Body
				detail={detail}
				rate={rate}
				isSelectedCard={isSelectedCard}
				setRouterLoading={setRouterLoading}
			/>

			<div className={styles.promo_codes}>
				<PromoCode promotion={getPromotion({ promocodes: rate?.promocode })} />
			</div>

			<Footer
				detail={detail}
				rate={rate}
				isSelectedCard={isSelectedCard}
			/>
		</div>
	);
}

export default RateCard;
