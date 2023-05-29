import { ResponsiveFunnel } from '@cogoport/charts/funnel';
import { startCase } from '@cogoport/utils';
import React from 'react';

import pieColors from '../../../../utils/pieColors';
import styles from '../styles.module.css';

function FunnelChart({ data }) {
	const { account_type, organizations_count, ...rest } = data || {};

	const funnelData = { ...rest } || {};

	const dataKeys = Object.keys(funnelData);
	const formattedData = (dataKeys || []).map((val) => ({
		id    : val,
		label : startCase(val),
		value : Number(funnelData[val]).toFixed(2),
	}));

	return (
		<ResponsiveFunnel
			data={formattedData}
			margin={{
				top    : 35,
				right  : 20,
				bottom : 35,
				left   : 20,
			}}
			valueFormat=">-.4s"
			colors={pieColors}
			currentPartSizeExtension={10}
			currentBorderWidth={40}
			enableLabel={false}
			motionConfig="wobbly"
			direction="horizontal"
			enableBeforeSeparators={false}
			enableAfterSeparators={false}
			borderWidth={20}
			beforeSeparatorLength={100}
			beforeSeparatorOffset={20}
			afterSeparatorLength={100}
			afterSeparatorOffset={20}
			tooltip={({ part }) => (
				<div className={styles.tool_tip_container}>
					<strong>
						{startCase(part.data?.id) ?? 'Unknown'}
						:
						{(Number(part.data?.value) ?? 0).toFixed(2)}
						%
					</strong>
				</div>
			)}
		/>
	);
}

export default FunnelChart;
