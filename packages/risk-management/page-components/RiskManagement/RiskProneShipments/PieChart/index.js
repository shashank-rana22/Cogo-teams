import { ResponsivePie } from '@cogoport/charts/pie';
import { Button } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import React from 'react';

import Loader from '../../common/Loader';

import styles from './styles.module.css';

function PieChart({ activeTab, chartData, loading }) {
	const { stats } = chartData || {};
	const {
		container_movement_count = '',
		bl_do_release_count = '', both_count = '', container_stats, late_collection_stats, late_release_stats,
	} = stats || {};
	const {
		draft_bl_approval_pending = '', invoice_not_uploaded = '', late_collection = '',
		late_collection_total = '', payment_not_done = '',
	} = late_collection_stats || {};

	const { late_release_total = '', payment_not_received = '' } = late_release_stats || {};
	const {
		gated_in_at_vessel_departure = '', pick_up_and_not_gated_in = '',
		vessel_arrived_but_not_gated_out = '', container_not_picked_up = '', gated_out_but_not_returned = '',
	} = container_stats || {};
	let centroidValue = '';
	if (activeTab === 'container_movement') {
		centroidValue = container_movement_count;
	} else if (activeTab === 'bl_do_release') {
		centroidValue = bl_do_release_count;
	} else if (activeTab === 'both') {
		centroidValue = both_count;
	}
	const CONTAINER_MOVEMENT_MAPPING = [
		{
			label : 'Container Not Picked Up :',
			value : container_not_picked_up,
			color : '#EE3425',
		},
		{
			label : 'Pick Up And Not Gated In :',
			value : pick_up_and_not_gated_in,
			color : ' #F37166',
		},
		{
			label : 'Gated In At Vessel Dep. :',
			value : gated_in_at_vessel_departure,
			color : '#F8AEA8',
		},
		{
			label : 'Vessel Arrived but not gated out :',
			value : vessel_arrived_but_not_gated_out,
			color : '#BF291E',
		},
		{
			label : 'Gated out + not returned :',
			value : gated_out_but_not_returned,
			color : ' #FFD1CC',
		},
	];
	const LATE_COLLECTION_MAPPING = [
		{
			label : 'Payment Not Done :',
			value : payment_not_done,
		},
		{
			label : 'Draft Bl Approval Pending : ',
			value : draft_bl_approval_pending,
		},
		{
			label : 'Invoice Not Uploaded : ',
			value : invoice_not_uploaded,
		},
		{
			label : 'Late Collection :  ',
			value : late_collection,
		},
	];
	const LATE_RELEASE_MAPPING = [
		{
			label : 'Customer - Payment Not Received : ',
			value : payment_not_received,
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
			value : container_not_picked_up,

		},
		{
			id    : 'Pick Up And Not Gated In',
			label : 'Pick Up And Not Gated In: 314',
			value : pick_up_and_not_gated_in,

		},
		{
			id    : 'Gated In At Vessel Dep',
			label : 'Gated In At Vessel Dep.: 219',
			value : gated_in_at_vessel_departure,

		},
		{
			id    : 'Vessel Arrived but not gated out',
			label : 'Vessel Arrived but not gated out: 468',
			value : vessel_arrived_but_not_gated_out,
		},
		{
			id    : 'Gated out + not returned',
			label : 'Gated out + not returned: 272',
			value : gated_out_but_not_returned,
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
				{centroidValue}
			</text>
		);
	}
	return (
		<div className={styles.container}>
			<div>
				<div className={styles.pie_chart}>
					{loading ? (
						<img
							src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/ic-spinner.svg"
							alt="badge-icon"
						/>
					)
						: (
							<ResponsivePie
								data={data}
								margin={{ top: 8, right: 0, bottom: 4, left: 10 }}
								innerRadius={0.7}
								colors={colors}
								padAngle={1}
								enableArcLabels={false}
								enableArcLinkLabels={false}
								isInteractive
								activeOuterRadiusOffset={4}
								layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends', CenteredMetric]}
							/>
						)}
				</div>
				<div className={styles.bottom_heading}>
					{activeTab === 'container_movement' && 'Container Movement'}
					{activeTab === 'bl_do_release' && 'BL/DO Release'}
					{activeTab === 'both' && 'Charge Range'}
				</div>
			</div>
			{activeTab === 'container_movement' && (loading ? <Loader />
				: (
					<div className={styles.column_container}>
						{CONTAINER_MOVEMENT_MAPPING.map((item) => (
							<div className={styles.sub_container} key={item.label}>
								<div className={styles.square} style={{ background: item.color }} />
								<div className={styles.label}>
									{item.label}
								</div>
								<div className={styles.value}>
									{ item.value || '-'}
								</div>
							</div>
						))}
					</div>
				)
			)}

			{activeTab === 'bl_do_release' && (
				loading ? <Loader />
					:				(
						<div className={styles.bl_do_container}>
							<div>
								<div className={styles.bl_square1} />
								<div className={styles.sub_container}>

									<div className={styles.label}>
										Late collection :
									</div>
									<div className={styles.value}>
										{late_collection_total || '-'}
									</div>
								</div>
								{LATE_COLLECTION_MAPPING.map((item) => (
									<div className={styles.sub_container} key={item.value}>
										<div className={styles.point} />
										<div>
											{item.label}
											{' '}
											{ item.value || '-'}
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
											{late_release_total || '-'}
										</div>
									</div>
									{LATE_RELEASE_MAPPING.map((item) => (
										<div className={styles.sub_container} key={item.value}>
											<div className={styles.point} />
											<div>
												{item.label}
												{' '}
												{ item.value || '-'}
											</div>
										</div>
									))}

								</div>
							</div>
						</div>
					)
			)}
			{activeTab === 'both'
			&& (loading ? <Loader />
				: (
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
				)
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
