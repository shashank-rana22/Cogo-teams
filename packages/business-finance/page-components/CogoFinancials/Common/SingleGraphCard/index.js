import { IcMInfo } from '@cogoport/icons-react';
import React from 'react';

import MyResponsiveBar from '../ResponsiveBar';

import styles from './styles.module.css';

function SingleGraphCard({ heading = '' }) {
	const NEW_DATA = [
		{
			name    : 'surface',
			surface : 24,
		},
		{
			name    : 'air',
			surface : 190,
		},
		{
			name    : 'surfaces',
			surface : 99,
		},
		{
			name : 'airs',
			air  : -5,
		},
		{
			name    : 'surfacess',
			surface : 99,
		},
		{
			name : 'airss',
			air  : -5,
		},
		{
			name    : 'surfacesss',
			surface : 99,
		},
		{
			name : 'airsss',
			air  : -5,
		},
		{
			name    : 'surfacessss',
			surface : 99,
		},
		{
			name : 'airssss',
			air  : -5,
		},
	];

	return (
		<div className={styles.container}>
			<div className={styles.flexhead}>
				<div>
					<div className={styles.header}>
						<div>
							{heading}
						</div>
						<div className={styles.info}>
							<IcMInfo />
						</div>
					</div>
					<div className={styles.bottom_line} />
				</div>
			</div>
			<MyResponsiveBar
				data={NEW_DATA}
				keys={['surface', 'air']}
				legendX=""
				legendY=""
				width="750px"
				colors={['#88CAD1']}
				height="274px"
				indexBy="name"
				enableGridY
				legends={false}
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
	);
}
export default SingleGraphCard;
