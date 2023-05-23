import { DateRangepicker, Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';

import styles from './styles.module.css';

function Filters({ setDateRange, dateRange, cost_details, showTotalCost }) {
	const {
		total_cost_amount,
		total_cost_currency,
		cost_per_token_amount,
		cost_per_token_currency,
	} = cost_details || {};

	const renderContent = () => (
		<div style={{ fontSize: 12 }}>
			Cost per token amount -
			{' '}
			{cost_per_token_amount.toFixed(8)}
			<span style={{ paddingLeft: 4 }}>{cost_per_token_currency}</span>
		</div>
	);

	return (
		<div className={styles.top_content}>

			{showTotalCost ? (
				<div className={styles.total}>
					<div className={styles.total_cost}>
						Total Cost -
						{' '}
						<span style={{ paddingRight: '4px' }}>
							{total_cost_amount}
						</span>
						{total_cost_currency}
					</div>

					<div className={styles.tooltip_wrapper}>
						<Tooltip
							content={renderContent()}
							placement="top"
						>
							<IcMInfo height={16} className={styles.info_icon} />
						</Tooltip>
					</div>

				</div>

			) : null}

			<div className={styles.date_range_container}>
				<div style={{
					margin      : '0.3rem',
					marginRight : '1.2rem',
				}}
				>
					Date
				</div>

				<DateRangepicker
					name="date"
					onChange={setDateRange}
					value={dateRange}
					dateFormat="MMM dd, yyyy"
					isPreviousDaysAllowed
					maxDate={new Date()}
				/>
			</div>

			{/* <div className={styles.select_container}>
				<div style={{
					margin      : '0.5rem',
					marginLeft  : '1rem',
					marginRight : '1rem',

				}}
				>
					User Group
				</div>
				<Select
					placeholder="All"
					id="group_by"
					labelKey="display_name"
					valueKey="group_by"
					isClearable
				/>
			</div> */}
		</div>
	);
}

export default Filters;
