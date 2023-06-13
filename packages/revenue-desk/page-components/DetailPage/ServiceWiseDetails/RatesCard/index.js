import { Button } from '@cogoport/components';
import { useState } from 'react';

import EmptyState from '../../../../EmptyState';

import Card from './Card';
import styles from './styles.module.css';

function RatesCard({
	ratesData = [], setPrefrences, prefrences, serviceId, type, shipmentType, setSellRates,
	sellRates, price,
}) {
	const [showFullList, setShowFullList] = useState(false);
	const initialCardCount = 2;
	const toggleList = () => {
		setShowFullList(!showFullList);
	};
	const renderedCards = showFullList ? ratesData : ratesData?.slice(0, initialCardCount);
	const expandable = ratesData?.length > initialCardCount;
	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				{type}
			</div>
			<div>
				{!ratesData?.length && <EmptyState isSmall heading={`No ${type}`} /> }
				{(renderedCards || [])?.map((item) => (
					<Card
						data={item}
						key={item}
						prefrences={prefrences}
						setPrefrences={setPrefrences}
						serviceId={serviceId}
						shipmentType={shipmentType}
						setSellRates={setSellRates}
						sellRates={sellRates}
						price={price}
					/>
				))}
			</div>
			<div style={{ display: 'flex', justifyContent: 'end' }}>
				{!showFullList && expandable && ratesData?.length > initialCardCount && (
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
