import { Button } from '@cogoport/components';
import { useState } from 'react';

import EmptyState from '../../../../EmptyState';
import { VALUE_ZERO } from '../../../constants';

import Card from './Card';
import LoadingCard from './Card/LoadingCard';
import styles from './styles.module.css';

const INITIAL_CARD_COUNT = 2;

function RatesCard({
	ratesData = [], setPrefrences, prefrences, type, singleServiceData, setSellRates,
	sellRates, loading, shipmentData,
}) {
	const [showFullList, setShowFullList] = useState(false);
	const toggleList = () => {
		setShowFullList(!showFullList);
	};
	const renderedCards = showFullList ? ratesData : ratesData?.slice(VALUE_ZERO, INITIAL_CARD_COUNT);
	const expandable = ratesData?.length > INITIAL_CARD_COUNT;
	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				{type}
			</div>
			<div>
				{!loading && !ratesData?.length && <EmptyState isSmall heading={`No ${type}`} /> }
				{loading ? <LoadingCard /> : (
					<div>
						{(renderedCards || [])?.map((item) => (
							<Card
								data={item}
								key={item}
								prefrences={prefrences}
								setPrefrences={setPrefrences}
								singleServiceData={singleServiceData}
								setSellRates={setSellRates}
								sellRates={sellRates}
								prefrence_key={type}
								shipmentData={shipmentData}
							/>
						))}
					</div>
				)}
			</div>
			<div style={{ display: 'flex', justifyContent: 'end' }}>
				{!showFullList && expandable && ratesData?.length > INITIAL_CARD_COUNT && (
					<Button size="md" themeType="link" onClick={toggleList}>See More</Button>
				)}

				{showFullList && (
					<Button size="md" themeType="link" onClick={toggleList}>See Less</Button>
				)}
			</div>
		</div>
	);
}
export default RatesCard;
