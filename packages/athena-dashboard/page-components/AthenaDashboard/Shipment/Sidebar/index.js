import { DateRangepicker } from '@cogoport/components';
import { AsyncSelectController } from '@cogoport/forms';

import controls from '../../../../configurations/Shipment/sidebar-controls';

import styles from './styles.module.css';

function Sidebar({ date, setDate, control }) {
	return (
		<div className={styles.advanced_filter_container}>
			<div className={styles.date_range_container}>
				Date Range

				<div>
					<DateRangepicker
						isPreviousDaysAllowed
						name="date"
						onChange={setDate}
						value={date}
					/>
				</div>
			</div>

			{controls.map((item) => {
				const el = { ...item };
				return (
					<div key={el.name}>
						<div className={styles.microfilter_names}>
							{el.label}
						</div>

						<AsyncSelectController
							{...el}
							placeholder={el.placeholder}
							key={el.name}
							control={control}
							isClearable
							id={`${el.name}_input`}
							className={styles.controller}
						/>
					</div>
				);
			})}
		</div>
	);
}
export default Sidebar;
