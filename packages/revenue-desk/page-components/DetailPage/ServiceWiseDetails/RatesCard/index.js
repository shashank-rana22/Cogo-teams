import { Button } from '@cogoport/components';
import { useState } from 'react';

import EmptyState from '../../../../EmptyState';

import Card from './Card';
import styles from './styles.module.css';

function RatesCard({ ratesData = [], setPrefrences, prefrences, prefrence_key }) {
	const [showFullList, setShowFullList] = useState(false);
	const initialCardCount = 2;
	const toggleList = () => {
		setShowFullList(!showFullList);
	};
	const renderedCards = showFullList ? ratesData?.data : ratesData?.data?.slice(0, initialCardCount);
	const expandable = ratesData?.data?.length > initialCardCount;
	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				{ratesData.type}
			</div>
			<div>
				{!ratesData?.data?.length && <EmptyState isSmall heading={ratesData.type} /> }
				{renderedCards?.map((item) => (
					<Card
						data={item}
						key={item}
						prefrences={prefrences}
						setPrefrences={setPrefrences}
						prefrence_key={prefrence_key}
					/>
				))}
			</div>
			<div style={{ display: 'flex', justifyContent: 'end' }}>
				{!showFullList && expandable && ratesData?.data.length > initialCardCount && (
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
