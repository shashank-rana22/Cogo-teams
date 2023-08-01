import { ResponsiveBump } from '@cogoport/charts/bump';
import { ResponsiveMarimekko } from '@cogoport/charts/marimekko';
import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React,
{ useEffect, useState } from 'react';

import CustomTooltip from '../../../../common/CustomTooltip';
import NoDataState from '../../../../common/NoDataState';
import {
	TOTAL_DEVIATION,
	DIMENSIONS, BOTTOM_AXIS_UNIT, SEPARATION_INDEX,
} from '../../../../constants/histogram_config';
import { section_header, section_container } from '../styles.module.css';

import styles from './styles.module.css';

const ANIMATION_TIME = 500;
const TEN = 10;
const HUNDRED = 100;
const FIFTY = 50;
const SEVENTY = 70;
const TWENTY_FIVE = 25;

const getRandomArray = () => {
	const rem = Math.floor(Math.random() * TEN);
	return Array.from(
		{ length: 30 },
		(_, i) => (i % TEN === rem
			? [-Math.ceil(HUNDRED + Math.random() * FIFTY),
				Math.ceil(SEVENTY + Math.random() * FIFTY),
				-Math.ceil(SEVENTY - TWENTY_FIVE + Math.random() * TWENTY_FIVE)]
			: GLOBAL_CONSTANTS.zeroth_index),
	).flat();
};

function Deviation({ data = [], loading = false }) {
	const [loadingData, setLoadingData] = useState([]);

	const formatedData = data.map(({ range, count }, idx) => ({
		deviation       : `(${range - BOTTOM_AXIS_UNIT} to ${range})%`,
		participation   : BOTTOM_AXIS_UNIT,
		countOfNegative : idx < SEPARATION_INDEX ? count : GLOBAL_CONSTANTS.zeroth_index,
		countOfPositive : idx >= SEPARATION_INDEX ? count : GLOBAL_CONSTANTS.zeroth_index,
	}));

	const lineData = [{
		id   : 'line',
		data : formatedData.map(({ countOfNegative, countOfPositive }, idx) => ({
			x : idx,
			y : -(countOfNegative + countOfPositive),
		})),
	}];

	const isEmptyData = !loading && (!data || (Array.isArray(data)
						&& (data.reduce((total, item) => total + item.count, GLOBAL_CONSTANTS.zeroth_index)
						=== GLOBAL_CONSTANTS.zeroth_index)));

	useEffect(() => {
		const updateData = () => {
			const randomArray = getRandomArray();

			const newData = [{
				id   : 'line',
				data : randomArray.map((val, idx) => ({
					x : idx,
					y : val,
				})),
			}];
			setLoadingData(newData);
		};

		const animationInterval = loading ? setInterval(updateData, ANIMATION_TIME) : null;
		return () => clearInterval(animationInterval);
	}, [loading]);

	return (
		<div className={cl`${styles.container} ${section_container}`}>
			<h3 className={section_header}>Rate Deviation</h3>
			{
				formatedData && formatedData.length > GLOBAL_CONSTANTS.zeroth_index
					? (
						<>
							<div className={styles.legend}>
								{DIMENSIONS.map(({ id }) => (
									<div className={styles.legend_item} key={id}>
										<div className={cl`${styles.circle} ${styles[id]}`} />
										<p>{`${id === 'negative' ? '-' : '+'}ve Deviated Rates`}</p>
									</div>
								))}

							</div>
							<div className={styles.graph_container}>
								<ResponsiveMarimekko
									data={formatedData}
									id="deviation"
									value="participation"
									dimensions={DIMENSIONS}
									innerPadding={0}
									outerPadding={-0.75}
									axisTop={null}
									axisBottom={{
										orient       : 'bottom',
										tickSize     : 5,
										tickPadding  : 5,
										tickRotation : 0,
										format       : (value) => `${value - TOTAL_DEVIATION}%`,
									}}
									margin={{ top: 10, right: 22, bottom: 25, left: 23 }}
									borderWidth={1}
									enableGridY={false}
									enableGridX={false}
									colors={['#f2f3fa', '#FDFBF6']}
									defs={[
										{
											id         : 'positive',
											type       : 'patternDots',
											background : '#FDFBF6',
											color      : '#FDFBF6',
											size       : 4,
											padding    : 1,
											stagger    : true,
										},
										{
											id         : 'negative',
											type       : 'patternDots',
											background : '#CED1ED',
											color      : '#CED1ED',
											size       : 4,
											padding    : 1,
											stagger    : true,
										},
									]}
									fill={[
										{
											match : { id: 'negative' },
											id    : 'negative',
										},
										{
											match : { id: 'positive' },
											id    : 'positive',
										},
									]}
									borderColor={{
										from: 'colors',
									}}
									tooltip={CustomTooltip}
								/>
								<ResponsiveBump
									data={loading ? loadingData : lineData}
									margin={{ top: 10, right: 20, bottom: 25, left: 20 }}
									axisTop={null}
									axisRight={null}
									axisLeft={null}
									axisBottom={null}
									endLabel={false}
									colors={['#A69676']}
									colorBy="index"
									enableGridX={false}
									enableGridY={false}
									pointSize={0}
									isInteractive={false}
									xPadding={0.25}
									xOuterPadding={0}
									xInnerPadding={2}
									lineWidth={1.5}
									activeLineWidth={6}
									inactiveLineWidth={3}
									motionConfig={{
										mass      : 0.5,
										tension   : 170,
										friction  : 18,
										clamp     : false,
										precision : 0.01,
										velocity  : 0,
									}}
									opacity={1}
									activeOpacity={0.4}
									inactiveOpacity={0.15}
									activePointSize={7}
									inactivePointSize={0}
									activePointBorderWidth={3}
								/>
							</div>
						</>
					)
					: (
						<NoDataState
							visible={isEmptyData}
							flow="column"
						/>
					)
			}
		</div>
	);
}

export default Deviation;
