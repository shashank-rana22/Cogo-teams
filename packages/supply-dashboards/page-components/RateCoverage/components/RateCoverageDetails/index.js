import { Placeholder } from '@cogoport/components';
import { useState } from 'react';

import Card from './Card';
import Details from './Details';
import styles from './styles.module.css';

function RateCoverageDetails({ data, loading, filter }) {
	const [currentRateCoverageCardIndex, setCurrentRateCoverageCardIndex] = useState(-1);

	if (loading) {
		return (
			<Placeholder className={styles.loader} />
		);
	}

	if (currentRateCoverageCardIndex === -1) {
		return (
			<div className={styles.parent}>
				<Card
					type={0}
					value={Intl.NumberFormat().format(data?.rate_density)}
					setIndex={setCurrentRateCoverageCardIndex}
				/>
				<Card
					type={1}
					value={Intl.NumberFormat().format(data?.missing_rates_count)}
					setIndex={setCurrentRateCoverageCardIndex}
				/>
				<Card
					type={2}
					value={Intl.NumberFormat().format(data?.expiring_rates_count)}
					setIndex={setCurrentRateCoverageCardIndex}
				/>
				<Card
					type={3}
					value={Intl.NumberFormat().format(data?.dislike_rates_count)}
					setIndex={setCurrentRateCoverageCardIndex}
				/>
			</div>
		);
	}

	return (
		<Details
			index={currentRateCoverageCardIndex}
			setIndex={setCurrentRateCoverageCardIndex}
			value={data}
			filter={filter}
		/>
	);
}

export default RateCoverageDetails;
