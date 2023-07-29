import { Button } from '@cogoport/components';
import React from 'react';

import RenderCardHeader from '../RenderCardHeader';
import MyResponsiveBar from '../ResponsiveBar';

import styles from './styles.module.css';

function SingleGraphCard({
	heading = '', setActiveBar = () => {}, isViewDetailsVisible = false,
	onViewDetails = () => {},
}) {
	const GRAPH_DATA = [
		{
			name      : 'Air',
			surface   : 24,
			Estimated : 12,
			Actual    : 12,
		},
		{
			name      : 'Surface',
			surface   : 190,
			Estimated : 10,
			Actual    : 12,
		},
		{
			name      : 'Ocean',
			surface   : 99,
			Estimated : 4,
			Actual    : 12,
		},
		{
			name      : 'Rail',
			air       : -5,
			Estimated : 3,
			Actual    : 12,
		},

	];

	const onBarClick = (e) => {
		setActiveBar(e?.indexValue);
	};

	return (
		<div className={styles.container}>
			<div className={styles.flexhead}>
				<RenderCardHeader title={heading} />
				{isViewDetailsVisible && (
					<Button
						themeType="secondary"
						onClick={onViewDetails}
					>
						View Details

					</Button>
				)}
			</div>

			<div style={{ minWidth: '300px' }}>
				<MyResponsiveBar
					data={GRAPH_DATA}
					keys={['Estimated', 'Actual']}
					legendX=""
					legendY=""
					width="100%"
					height="300px"
					colors={['#cfeaed', '#6fa5ab']}
					colorBy="id"
					indexBy="name"
					enableGridY
					legends={false}
					onClick={onBarClick}
					margin={{ top: 50, right: 30, bottom: 50, left: 60 }}
					axisLeft={{
						tickSize       : 0,
						tickPadding    : 0,
						tickRotation   : 0,
						legend         : 'Percentage',
						legendPosition : 'middle',
						legendOffset   : -40,
						ariaHidden     : true,
					}}
				/>
			</div>

		</div>
	);
}
export default SingleGraphCard;
