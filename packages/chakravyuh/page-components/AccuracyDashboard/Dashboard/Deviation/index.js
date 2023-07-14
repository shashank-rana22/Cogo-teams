import { ResponsiveBump } from '@cogoport/charts/bump';
import { ResponsiveMarimekko } from '@cogoport/charts/marimekko';
import { cl } from '@cogoport/components';
import React from 'react';

import CustomTooltip from '../../../../common/CustomTooltip';
import { DUMMY_DATA, TOTAL_DEVIATION, DIMENSIONS } from '../../../../constants/histogram_config';
import { section_header, section_container } from '../styles.module.css';

import styles from './styles.module.css';

const LINE_DATA = [{
	id   : 'line',
	data : DUMMY_DATA.map(({ countOfNegative, countOfPositive }, idx) => ({
		x : idx,
		y : -(countOfNegative + countOfPositive),
	})),
}];

function Deviation() {
	return (
		<div className={cl`${styles.container} ${section_container}`}>
			<h3 className={section_header}>Rate Deviation</h3>
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
					data={DUMMY_DATA}
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
					margin={{ top: 10, right: 20, bottom: 25, left: 20 }}
					borderWidth={0.5}
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
					data={LINE_DATA}
					margin={{ top: 10, right: 20, bottom: 25, left: 20 }}
					axisTop={null}
					axisRight={null}
					axisLeft={null}
					axisBottom={null}
					endLabel={false}
					colors={['#CFBC93']}
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
					opacity={1}
					activeOpacity={0.4}
					inactiveOpacity={0.15}
					activePointSize={7}
					inactivePointSize={0}
					activePointBorderWidth={3}
				/>
			</div>
		</div>
	);
}

export default Deviation;
