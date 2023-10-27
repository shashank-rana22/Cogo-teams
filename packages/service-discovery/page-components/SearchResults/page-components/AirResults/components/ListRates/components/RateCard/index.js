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
	return (
		<div
			className={cl`${styles.container} ${isSelectedCard && styles.selected_card}`}
			style={{
				marginTop: index === GLOBAL_CONSTANTS.zeroth_index ? '0px' : '40px',
			}}
		>
			<Header
				detail={detail}
				rate={rate}
				comparisonRates={comparisonRates}
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
