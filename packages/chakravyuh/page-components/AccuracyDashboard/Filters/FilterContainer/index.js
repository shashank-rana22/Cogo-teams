import Layout from '@cogoport/air-modules/components/Layout';
import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React from 'react';

import { useDasboardFilters } from '../../../../constants/dashboard_filter_controls';

import styles from './styles.module.css';

function FilterContainer() {
	const CLASS_TYPE = 'sea';

	const final_controls = useDasboardFilters(CLASS_TYPE);
	const {
		control,
		formState: { errors },
		reset,
		// setValue,
		// handleSubmit,
	} = useForm({ final_controls });

	return (
		<div className={styles.main_container}>
			<div className={styles.header_row}>
				<span className={styles.title}>Filters</span>
				<div className={styles.filter_action_buttons}>
					<Button themeType="secondary" onClick={reset}>Reset</Button>
					<Button themeType="accent">Apply</Button>
				</div>
			</div>
			<Layout className={styles.layout_container} fields={final_controls} errors={errors} control={control} />
		</div>
	);
}

export default FilterContainer;

/* <div className={styles.filters_container}>
	{
		FILTER_OPTIONS.pills.map(({ key:rowKey, label, options }) => (
			<div className={styles.filter_row} key={rowKey}>
				<p className={styles.row_label}>{label}</p>
				<div>
					{
					options.map(({ key: pillKey, value }) => (
						<Pill
							key={pillKey}
							color="#FFFFFF"
							className={styles.default_pill}
							prefix={<IcMTick />}
						>
							{value}
						</Pill>
					))
				}
				</div>
			</div>
		))
	}
	<div className={styles.filter_row}>
		<p className={styles.row_label}>Commodity Type</p>
		<div className={styles.async_select_container}>
			<AsyncSelect
				asyncKey="list_locations"
				multiple
				initialCall={false}
				onChange={(value) => (
					setFilters((prev) => ({ ...prev, commodity_type: value }))
				)}
				value={filters?.commodity_type}
				placeholder="Type here..."
				prefix={<IcMSearchlight className={styles.search_icon} />}
				size="sm"
				params={{
				// filters: {
				// 	is_icd: false,
				// },
				}}
				className={styles.location_select}
			/>
		</div>
	</div>
	<div className={styles.split_row}>
		<div className={styles.filter_row}>
			<p className={styles.row_label}>Shipping Line</p>
			<div className={styles.async_select_container}>
				<AsyncSelect
					asyncKey="shipping_lines"
					multiple={false}
					initialCall={false}
					onChange={(value) => (
						setFilters((prev) => ({ ...prev, shipping_line: value }))
					)}
					value={filters?.shipping_line}
					placeholder="Type here..."
					prefix={null}
					size="sm"
					className={styles.location_select}
				/>
			</div>
		</div>
		<div className={styles.filter_row}>
			<p className={styles.row_label}>Created At</p>
			<div className={styles.async_select_container}>
				<Select
					onChange={(value) => (
						setFilters((prev) => ({ ...prev, createdAt: value }))
					)}
					value={filters?.createdAt}
					placeholder="DD/MM/YYYY"
					prefix={<IcMCalendar className={styles.search_icon} />}
					size="sm"
					className={styles.location_select}
				/>
			</div>
		</div>
	</div>
</div> */

// .filters_container {
// 	.filter_row {
// 		display: flex;
// 		flex-direction: column;
// 		margin-top: 24px;

// 		.row_label {
// 			margin: 0;
// 			font-size: 14px;
// 			color: #4f4f4f;
// 		}

// 		.default_pill {
// 			padding: 4px 8px;
// 			margin: 8px 12px 0 0;
// 			font-size: 14px;
// 			color: #221f20;
// 			cursor: pointer;
// 			border: 1px solid #e0e0e0;
// 		}

// 		.async_select_container {
// 			margin-top: 8px;
// 		}
// 	}

// 	.split_row {
// 		display: flex;
// 		align-items: center;
// 		justify-content: space-between;

// 		.filter_row {
// 			width: 47%;

// 			.async_select_container {
// 				width: 100%;
// 			}
// 		}
// 	}
// }
