import { ResponsiveBar } from '@cogoport/charts/bar';
import { Table } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React from 'react';

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
			score  : 100,
			warmth : 'Ice cold',
		},
		{
			score  : 500,
			warmth : 'Cold',
		},
		{
			score  : 2000,
			warmth : 'Warm',
		},
		{
			score  : 8000,
			warmth : 'Hot',
		},
		{
			score  : 10000,
			warmth : 'Flaming Hot',
		},
	];

	// const columns = [
	// 		{
	// 			Header   : 'Position',
	// 			key      : 'position',
	// 			id       : 'position',
	// 			accessor : 'position',
	// 			Cell     : ({ value }) => (
	// 				<div>
	// 					{value || ''}
	// 				</div>
	// 			),
	// 		},
	// 		{
	// 			Header   : 'Positions Trend',
	// 			accessor : 'positions_trend',
	// 			Cell     : ({ value }) => {
	// 				const {arrow, point , graph_data} = value;
	// 				return (
	// 					<span>
	// 						<Pill className={styles.pill} color={colors}>{value || ''}</Pill>
	// 					</span>
	// 				);
	// 			},

	// 		},
	// 		{
	// 			Header   : 'LAST UPDATED',
	// 			accessor : 'audit_data',
	// 			Cell     : ({ value }) => (
	// 				<section>
	// 					{value?.updated_at ? formatDate({
	// 						date       : value.updated_at,
	// 						dateFormat : GLOBAL_CONSTANTS.formats.date['dd-MM-yyyy'],
	// 						formatType : 'date',
	// 					}) : ''}

	// 				</section>
	// 			),
	// 		},

	// 	];
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
					keys={['score']}
					indexBy="warmth"
					margin={{ top: 90, right: 60, bottom: 90, left: 150 }}
					padding={0.5}
					valueScale={{
						type: 'linear',
					}}
					colors={['#888FD1']}
					axisBottom={{
						tickSize       : 2,
						tickPadding    : 5,
						tickRotation   : 0,
						legend         : 'Warmth',
						legendPosition : 'middle',
						legendOffset   : 80,
					}}
					axisLeft={{
						tickSize       : 2,
						tickPadding    : 5,
						tickRotation   : 0,
						legend         : 'Score',
						legendPosition : 'middle',
						legendOffset   : -80,
					}}
					enableGridY={false}
				/>
			</div>

			<div className={styles.header_text}>Leaderboard List</div>
			<div style={{ margin: '16px 0px' }}>
				<Table
					className={styles.table}
					// columns={columns}
					// data={list || []}
					loading={loading}
				/>
			</div>

		</section>
	);
}

export default AccountLeaderboard;
