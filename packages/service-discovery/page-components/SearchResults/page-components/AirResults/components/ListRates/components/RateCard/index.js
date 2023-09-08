import { cl } from '@cogoport/components';

import Body from './Body';
import Footer from './Footer';
import Header from './Header';
import styles from './styles.module.css';

function RateCard({
	rate = {},
	detail = {},
	comparisonRates = {},
	setComparisonRates = () => {},
	// infoBanner = {},
	// showGuide = false,
	isSelectedCard = false,
}) {
	return (
		<div className={cl`${styles.container} ${isSelectedCard && styles.selected_card}`}>
			<Header
				detail={detail}
				rate={rate}
				comparisonRates={comparisonRates}
				setComparisonRates={setComparisonRates}
				isSelectedCard={isSelectedCard}
			/>

			<Body
				detail={detail}
				rate={rate}
				isSelectedCard={isSelectedCard}
			/>

			<Footer
				detail={detail}
				rate={rate}
				isSelectedCard={isSelectedCard}
			/>
		</div>
	);
}

export default RateCard;
