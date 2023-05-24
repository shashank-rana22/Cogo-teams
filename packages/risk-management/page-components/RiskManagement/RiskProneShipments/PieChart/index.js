import { ResponsivePie } from '@cogoport/charts/pie';
import { Button } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function PieChart({ activeTab }) {
	const CONTAINER_MOVEMENT_MAPPING = [
		{
			label : 'Container Not Picked Up :',
			value : 484,
			color : '#EE3425',
		},
		{
			label : 'Pick Up And Not Gated In :',
			value : 484,
			color : ' #F37166',
		},
		{
			label : 'Gated In At Vessel Dep. :',
			value : 484,
			color : '#F8AEA8',
		},
		{
			label : 'Vessel Arrived but not gated out :',
			value : 484,
			color : '#BF291E',
		},
		{
			label : 'Gated out + not returned :',
			value : 484,
			color : ' #FFD1CC',
		},
	];
	const LATE_COLLECTION_MAPPING = [
		{
			label : 'Payment Not Done :',
			value : 84,
		},
		{
			label : 'Draft Bl Approval Pending : ',
			value : 14,
		},
		{
			label : 'Invoice Not Uploaded : ',
			value : 40,
		},
		{
			label : 'Invoice Not Uploaded : ',
			value : 54,
		},
		{
			label : 'Late Collection :  ',
			value : 78,
		},
	];
	const LATE_RELEASE_MAPPING = [
		{
			label : 'Customer - Payment Not Received : ',
			value : 23,
		},
		{
			label : 'Disputed/Collateral Cargo :',
			value : 76,
		},
	];

	const CHARGE_RANGE_MAPPING = [
		{
			label : 'INR 10,000 - INR 1,00,000 :',
			value : 4,
			color : '#EE3425',
		},
		{
			label : 'INR 100,001 - INR 5,00,000 :',
			value : 68,
			color : '#F37166',
		},
		{
			label : 'INR 500,001 - INR 10,00,000',
			value : 50,
			color : '#F8AEA8',
		},
		{
			label : 'INR 10,00,001 - INR 50,00,000 :',
			value : 23,
			color : '#BF291E',
		},
		{
			label : '> INR 50,00,000 :',
			value : 25,
			color : '#FFD1CC',
		},
	];
	const continer_data = [
		{
			id    : 'Container Not Picked Up',
			label : 'Container Not Picked Up: 484',
			value : 484,

		},
		{
			id    : 'Pick Up And Not Gated In',
			label : 'Pick Up And Not Gated In: 314',
			value : 314,

		},
		{
			id    : 'Gated In At Vessel Dep',
			label : 'Gated In At Vessel Dep.: 219',
			value : 219,

		},
		{
			id    : 'Vessel Arrived but not gated out',
			label : 'Vessel Arrived but not gated out: 468',
			value : 468,
		},
		{
			id    : 'Gated out + not returned',
			label : 'Gated out + not returned: 272',
			value : 272,
		},
	];
	const bl_do_data = [
		{
			id    : 'Late Collection',
			label : 'Late Collection',
			value : 10,

		},
		{
			id    : 'Late Release',
			label : 'Pick Release',
			value : 11,

		},
	];
	let data = [];
	if (activeTab === 'container_movement') {
		data = continer_data;
	} else if (activeTab === 'bl_do_release') {
		data = bl_do_data;
	} else {
		data = continer_data;
	}
	const colors = ['#EE3425', '#F8AEA8', '#F37166', '#BF291E', '#FFD1CC'];
	function CenteredMetric({ centerX, centerY }) {
		return (
			<text
				x={centerX}
				y={centerY}
				textAnchor="middle"
				dominantBaseline="central"
				style={{
					fontSize   : '12px',
					fontWeight : 600,
				}}
			>
				{300}
			</text>
		);
	}
	return (
		<div className={styles.container}>
			<div>
				<div className={styles.pie_chart}>
					<ResponsivePie
						data={data}
						// margin={{ top: 0, right: 0, bottom: 4, left: 10 }}
						innerRadius={0.7}
						colors={colors}
						padAngle={1}
						enableArcLabels={false}
						enableArcLinkLabels={false}
						isInteractive
						activeOuterRadiusOffset={4}
						layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends', CenteredMetric]}
					/>

				</div>
				<div className={styles.bottom_heading}>
					{activeTab === 'container_movement' && 'Container Movement'}
					{activeTab === 'bl_do_release' && 'BL/DO Release'}
					{activeTab === 'both' && 'Charge Range'}
				</div>
			</div>
			{activeTab === 'container_movement' && (
				<div className={styles.column_container}>
					{CONTAINER_MOVEMENT_MAPPING.map((item) => (
						<div className={styles.sub_container} key={item.label}>
							<div className={styles.square} style={{ background: item.color }} />
							<div className={styles.label}>
								{item.label}
							</div>
							<div className={styles.value}>
								{item.value}
							</div>
						</div>
					))}
				</div>
			)}

			{activeTab === 'bl_do_release' && (
				<div className={styles.bl_do_container}>
					<div>
						<div className={styles.bl_square1} />
						<div className={styles.sub_container}>

							<div className={styles.label}>
								Late collection :
							</div>
							<div className={styles.value}>
								10
							</div>
						</div>
						{LATE_COLLECTION_MAPPING.map((item) => (
							<div className={styles.sub_container} key={item.value}>
								<div className={styles.point} />
								<div>
									{item.label}
									{' '}
									{item.value}
								</div>
							</div>
						))}
					</div>
					<div className={styles.bl_do_container}>
						<div>
							<div className={styles.bl_square5} />
							<div className={styles.sub_container}>
								<div className={styles.label}>
									Late Release :
								</div>
								<div className={styles.value}>
									11
								</div>
							</div>
							{LATE_RELEASE_MAPPING.map((item) => (
								<div className={styles.sub_container} key={item.value}>
									<div className={styles.point} />
									<div>
										{item.label}
										{' '}
										{item.value}
									</div>
								</div>
							))}

						</div>
					</div>
				</div>
			)}
			{activeTab === 'both'
			&& (
				<div>
					{CHARGE_RANGE_MAPPING.map((item) => (
						<div className={styles.sub_container} key={item.value}>
							<div className={styles.square} style={{ background: item.color }} />
							<div className={styles.label}>
								{item.label}
							</div>
							<div className={styles.value}>
								{item.value}
							</div>
						</div>
					))}
				</div>
			)}

			<div className={styles.side_container}>
				<div className={styles.top_element}>
					<IcMInfo height={20} width={20} />
				</div>
				{activeTab !== 'both'
					&& (
						<div className={styles.bottom_element}>
							<Button size="md" themeType="linkUi">
								<div className={styles.button_text}>
									View By Charge
								</div>
							</Button>
						</div>
					)}
			</div>
		</div>
	);
}

export default PieChart;
