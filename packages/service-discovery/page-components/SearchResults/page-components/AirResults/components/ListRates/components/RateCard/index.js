import Body from './Body';
import Footer from './Footer';
import Header from './Header';
import styles from './styles.module.css';

function RateCard({
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
	return (
		<div className={styles.container}>
			<Header
				detail={detail}
				rate={rate}
				cogoAssuredRates={cogoAssuredRates}
				comparisonRates={comparisonRates}
				setComparisonRates={setComparisonRates}
				isCogoAssured={isCogoAssured}
				isSelectedCard={isSelectedCard}
			/>

			<Body
				detail={detail}
				rate={rate}
				isCogoAssured={isCogoAssured}
				isSelectedCard={isSelectedCard}
			/>

			<Footer
				detail={detail}
				rate={rate}
				isCogoAssured={isCogoAssured}
				isSelectedCard={isSelectedCard}
			/>
		</div>
	);
}

export default RateCard;
