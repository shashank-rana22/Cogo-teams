import { ResponsiveBump } from '@cogoport/charts/bump';
import { ResponsiveMarimekko } from '@cogoport/charts/marimekko';
import { cl } from '@cogoport/components';
import React from 'react';

import {
	DUMMY_DATA, TOTAL_DEVIATION,
	DARKEN_AMOUNT,
} from '../../../../constants/histogram_config';
import { section_header, section_container } from '../styles.module.css';

import styles from './styles.module.css';

const LINE_DATA = [{
	id   : 'line',
	data : DUMMY_DATA.map(({ countOfRates }, idx) => ({ x: idx, y: -countOfRates })),
}];

function Deviation() {
	return (
		<div className={cl`${styles.container} ${section_container}`}>
			<h3 className={section_header}>Rate Deviation</h3>
			<div className={styles.graph_container}>
				<ResponsiveMarimekko
					data={DUMMY_DATA}
					id="deviation"
					value="participation"
					dimensions={[
						{
							id    : 'Deviation\n',
							value : 'countOfRates',
						},
					]}
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
					colors={{ scheme: 'nivo' }}
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
					]}
					fill={[
						{
							match : '*',
							id    : 'positive',
						},
					]}
					borderColor={{
						from      : 'color',
						modifiers : [
							[
								'darker',
								DARKEN_AMOUNT,
							],
						],
					}}
				/>
				<ResponsiveBump
					data={LINE_DATA}
					margin={{ top: 10, right: 20, bottom: 25, left: 20 }}
					axisTop={null}
					axisRight={null}
					axisBottom={null}
					endLabel={false}
					colors={['#CFBC93']}
					colorBy="index"
					axisLeft={null}
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
