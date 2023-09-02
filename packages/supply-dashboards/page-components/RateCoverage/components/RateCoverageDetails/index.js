import { useState } from 'react';

import useGetFclFreightCriticalPortsExpiredRates from '../../hooks/useGetFclFreightCriticalPortsExpiredRates';
import useGetFclFreightExpiredRates from '../../hooks/useGetFclFreightExpiredRates';
import useGetMostPredictedSpotRate from '../../hooks/useGetMostPredicatedSpotRate';

import Card from './Card';
import Details from './Details';
import styles from './styles.module.css';

const CONSTANT_ZERO = 0;
const CONSTANT_ONE = 1;
const CONSTANT_TWO = 2;
const CONSTANT_THREE = 3;
const CONSTANT_FOUR = 4;
const CONSTANT_MINUS_ONE = -1;

function RateCoverageDetails({ filter }) {
	const [currentRateCoverageCardIndex, setCurrentRateCoverageCardIndex] = useState(CONSTANT_ZERO);
	const dataPromise = useGetFclFreightCriticalPortsExpiredRates();
	const expiredRatedataPromise = useGetFclFreightExpiredRates();
	const spotSearchData = useGetMostPredictedSpotRate();
	const DATAMAPPING = {
		0 : dataPromise,
		1 : expiredRatedataPromise,
		2 : spotSearchData,
	};

	if (currentRateCoverageCardIndex !== CONSTANT_MINUS_ONE) {
		return (
			<div style={{ backgroundColor: '#fff' }}>
				<div className={styles.parent}>
					<Card
						type={CONSTANT_ZERO}
						value={dataPromise.count}
						setIndex={setCurrentRateCoverageCardIndex}
						index={currentRateCoverageCardIndex}
						downloadLink={dataPromise.csv_link}
					/>
					<Card
						type={CONSTANT_ONE}
						value={expiredRatedataPromise.count}
						setIndex={setCurrentRateCoverageCardIndex}
						index={currentRateCoverageCardIndex}
						downloadLink={expiredRatedataPromise.csv_link}
					/>
					<Card
						type={CONSTANT_TWO}
						value={spotSearchData.count}
						setIndex={setCurrentRateCoverageCardIndex}
						index={currentRateCoverageCardIndex}
						downloadLink={spotSearchData.csv_link}
					/>
					<Card
						type={CONSTANT_THREE}
						value={1534}
						setIndex={setCurrentRateCoverageCardIndex}
						index={currentRateCoverageCardIndex}
						downloadLink={dataPromise.csv_link}
					/>
					<Card
						type={CONSTANT_FOUR}
						value={477}
						setIndex={setCurrentRateCoverageCardIndex}
						index={currentRateCoverageCardIndex}
						downloadLink={dataPromise.csv_link}
					/>
				</div>
				<Details
					index={currentRateCoverageCardIndex}
					setIndex={setCurrentRateCoverageCardIndex}
					value={DATAMAPPING[currentRateCoverageCardIndex]}
					filter={filter}
				/>
			</div>
		);
	}
	return (
		<div style={{ backgroundColor: '#fff' }}>
			<div className={styles.parent}>
				<Card
					type={CONSTANT_ZERO}
					value={dataPromise.count}
					setIndex={setCurrentRateCoverageCardIndex}
					index={currentRateCoverageCardIndex}
					downloadLink={dataPromise.csv_link}
				/>
				<Card
					type={CONSTANT_ONE}
					value={expiredRatedataPromise.count}
					setIndex={setCurrentRateCoverageCardIndex}
					index={currentRateCoverageCardIndex}
					downloadLink={expiredRatedataPromise.csv_link}
				/>
				<Card
					type={CONSTANT_TWO}
					value={1459}
					setIndex={setCurrentRateCoverageCardIndex}
					index={currentRateCoverageCardIndex}
					downloadLink={dataPromise.csv_link}
				/>
				<Card
					type={CONSTANT_THREE}
					value={1534}
					setIndex={setCurrentRateCoverageCardIndex}
					index={currentRateCoverageCardIndex}
					downloadLink={dataPromise.csv_link}
				/>
				<Card
					type={CONSTANT_FOUR}
					value={477}
					setIndex={setCurrentRateCoverageCardIndex}
					index={currentRateCoverageCardIndex}
					downloadLink={dataPromise.csv_link}
				/>
			</div>
		</div>
	);
}

export default RateCoverageDetails;
