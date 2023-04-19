import { ResponsiveBar } from '@cogoport/charts/bar';
import { ResponsiveLine } from '@cogoport/charts/line';
import { Table } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMUp } from '@cogoport/icons-react';

import { getFieldController } from '../../../../common/Form/getFieldController';
import controls from '../../configurations/get-leaderboard-filters-controls';

import styles from './styles.module.css';

function AccountLeaderboard({ loading = false }) {
	const formProps = useForm();

	const {
		control, formState: { errors },
	} = formProps;

	const data = [
		{
			account : 100,
			warmth  : 'Ice cold',
		},
		{
			account : 500,
			warmth  : 'Cold',
		},
		{
			account : 2000,
			warmth  : 'Warm',
		},
		{
			account : 8000,
			warmth  : 'Hot',
		},
		{
			account : 10000,
			warmth  : 'Flaming Hot',
		},
	];

	const columns = [
		{
			Header   : 'Position',
			accessor : ({ position }) => (
				<div>
					{position || 0}
				</div>
			),
		},
		{
			Header   : 'Positions Trend',
			accessor : ({ positions_trend }) => (
				<div style={{ width: '120px', height: '40px', display: 'flex', padding: '8px 0' }}>
					<div style={{ marginRight: '8px', display: 'flex', alignItems: 'center' }}>
						<IcMUp height={16} width={16} style={{ marginRight: '4px' }} />
						5
					</div>
					<ResponsiveLine
						data={positions_trend || []}
						width={100}
						height={20}
						colors="green"
						xScale={{ type: 'point' }}
						yScale={{
							type    : 'linear',
							min     : 'auto',
							max     : 'auto',
							stacked : true,
							reverse : false,
						}}
						axisTop={null}
						axisRight={null}
						axisBottom={null}
						axisLeft={null}
						enableGridX={false}
						enableGridY={false}
						lineWidth={1}
						enablePoints={false}
						pointSize={2}
						pointColor={{ theme: 'background' }}
						pointBorderColor={{ from: 'serieColor' }}
						pointLabelYOffset={-12}
						areaOpacity={0}
						isInteractive={false}
						enableCrosshair={false}
						legends={[]}
						animate={false}
					/>
				</div>
			),
		},
		{
			Header   : 'WARMTH',
			accessor : ({ warmth }) => (
				<div>
					{warmth || ''}
				</div>
			),
		},
		{
			Header   : 'ACCOUNT',
			accessor : ({ account }) => (
				<div>
					{account || ''}
				</div>
			),
		},
		{
			Header   : 'ALLOCATED KAM',
			accessor : ({ allocated_kam }) => (
				<div>
					{allocated_kam || 0}
				</div>
			),
		},

	];

	const list = [
		{
			position        : 1,
			positions_trend : [
				{
					id    : 'japan',
					color : '#4f4f4f',
					data  : [
						{
							x : 'plane',
							y : 241,
						},
						{
							x : 'helicopter',
							y : 245,
						},
						{
							x : 'boat',
							y : 129,
						},
						{
							x : 'train',
							y : 75,
						},
						{
							x : 'subway',
							y : 73,
						},
						{
							x : 'bus',
							y : 121,
						},
						{
							x : 'car',
							y : 254,
						},
						{
							x : 'moto',
							y : 97,
						},
						{
							x : 'bicycle',
							y : 150,
						},
						{
							x : 'horse',
							y : 60,
						},
						{
							x : 'skateboard',
							y : 58,
						},
						{
							x : 'others',
							y : 282,
						},
					],
				},
			],
			warmth        : 'Flaming Hot',
			account       : 'Anand Tiles',
			allocated_kam : 10,
		},
		{
			position        : 2,
			positions_trend : [

				{
					id    : 'france',
					color : 'hsl(171, 70%, 50%)',
					data  : [
						{
							x : 'plane',
							y : 82,
						},
						{
							x : 'helicopter',
							y : 0,
						},
						{
							x : 'boat',
							y : 170,
						},
						{
							x : 'train',
							y : 171,
						},
						{
							x : 'subway',
							y : 202,
						},
						{
							x : 'bus',
							y : 284,
						},
						{
							x : 'car',
							y : 177,
						},
						{
							x : 'moto',
							y : 168,
						},
						{
							x : 'bicycle',
							y : 236,
						},
						{
							x : 'horse',
							y : 61,
						},
						{
							x : 'skateboard',
							y : 270,
						},
						{
							x : 'others',
							y : 74,
						},
					],
				},
			],
			warmth        : 'Flaming Hot',
			account       : 'Anand Tiles',
			allocated_kam : 10,
		},
		{
			position        : 3,
			positions_trend : [

				{
					id    : 'norway',
					color : 'hsl(232, 70%, 50%)',
					data  : [
						{
							x : 'plane',
							y : 57,
						},
						{
							x : 'helicopter',
							y : 205,
						},
						{
							x : 'boat',
							y : 117,
						},
						{
							x : 'train',
							y : 122,
						},
						{
							x : 'subway',
							y : 55,
						},
						{
							x : 'bus',
							y : 131,
						},
						{
							x : 'car',
							y : 288,
						},
						{
							x : 'moto',
							y : 239,
						},
						{
							x : 'bicycle',
							y : 31,
						},
						{
							x : 'horse',
							y : 39,
						},
						{
							x : 'skateboard',
							y : 119,
						},
						{
							x : 'others',
							y : 38,
						},
					],
				},

			],
			warmth        : 'Flaming Hot',
			account       : 'Anand Tiles',
			allocated_kam : 10,
		},
		{
			position        : 4,
			positions_trend : [

				{
					id    : 'germany',
					color : 'hsl(87, 70%, 50%)',
					data  : [
						{
							x : 'plane',
							y : 252,
						},
						{
							x : 'helicopter',
							y : 163,
						},
						{
							x : 'boat',
							y : 188,
						},
						{
							x : 'train',
							y : 296,
						},
						{
							x : 'subway',
							y : 259,
						},
						{
							x : 'bus',
							y : 58,
						},
						{
							x : 'car',
							y : 252,
						},
						{
							x : 'moto',
							y : 92,
						},
						{
							x : 'bicycle',
							y : 112,
						},
						{
							x : 'horse',
							y : 149,
						},
						{
							x : 'skateboard',
							y : 160,
						},
						{
							x : 'others',
							y : 239,
						},
					],
				},
			],
			warmth        : 'Flaming Hot',
			account       : 'Anand Tiles',
			allocated_kam : 10,
		},
	];

	return (
		<section className={styles.container} id="core_engine_container">
			<div className={styles.header_text}>Account Score Distribution</div>

			<div className={styles.form_container}>
				{controls.map((filterItem) => {
					const Element = getFieldController(filterItem.type);

					return (
						<div className={styles.form_group}>
							<span className={styles.label}>{filterItem.label}</span>

							<div className={styles.input_group}>
								<Element
									{...filterItem}
									key={filterItem.name}
									control={control}
								/>
							</div>

							<div className={styles.error_message}>
								{errors?.[filterItem.name]?.message}
							</div>
						</div>
					);
				})}
			</div>

			<div style={{ height: '500px', margin: '16px 0px' }}>
				<ResponsiveBar
					data={data}
					keys={['account']}
					indexBy="warmth"
					margin={{ top: 90, right: 60, bottom: 90, left: 150 }}
					padding={0.5}
					valueScale={{
						type: 'linear',
					}}
					colors={['#888FD1']}
					axisBottom={{
						tickSize       : 0,
						tickPadding    : 5,
						tickRotation   : 0,
						legend         : 'Warmth',
						legendPosition : 'middle',
						legendOffset   : 60,
					}}
					axisLeft={{
						tickSize       : 0,
						tickPadding    : 5,
						tickRotation   : 0,
						legend         : 'Accounts',
						legendPosition : 'middle',
						legendOffset   : -80,
					}}
					enableGridY
					enableLabel={false}
				/>
			</div>

			<div className={styles.header_text}>Leaderboard List</div>
			<div style={{ margin: '16px 0px' }}>
				<Table
					className={styles.table}
					columns={columns || []}
					data={list || []}
					loading={loading}
					layoutType="table"
				/>
			</div>

		</section>
	);
}

export default AccountLeaderboard;
