import { Button } from '@cogoport/components';
import { useState } from 'react';

import Card from '../../RatesCard/Card';
import LoadingCard from '../../RatesCard/Card/LoadingCard';

import styles from './styles.module.css';

function RatesCards({ data, singleServiceData, rate_key, loading }) {
	const [showFullList, setShowFullList] = useState(false);
	const initialCardCount = 2;
	const toggleList = () => {
		setShowFullList(!showFullList);
	};
	const renderedCards = showFullList ? data?.rows : data?.rows?.slice(0, initialCardCount);
	const expandable = data?.rows?.length > initialCardCount;

	return (
		<div>
			{loading ? <LoadingCard rate_key={rate_key} /> : (
				<div>
					{(renderedCards || [])?.map((item) => (
						<div className={styles.prefernce_set_card_container} key={item?.id}>
							<Card
								data={item}
								rate_key={rate_key}
								serviceData={singleServiceData}
							/>
						</div>
					))}
					<div style={{ display: 'flex', justifyContent: 'end' }}>
						{!showFullList && expandable && data?.rows?.length > initialCardCount && (
							<Button size="md" themeType="link" onClick={toggleList}>See More</Button>
						)}

						{showFullList && (
							<Button size="md" themeType="link" onClick={toggleList}>See Less</Button>
						)}
					</div>
				</div>
			)}
		</div>

	);
}
export default RatesCards;
