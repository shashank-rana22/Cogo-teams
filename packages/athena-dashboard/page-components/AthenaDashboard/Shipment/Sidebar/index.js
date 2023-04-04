import { DateRangepicker } from '@cogoport/components';
import { AsyncSelectController } from '@cogoport/forms';

import styles from './styles.module.css';

function Sidebar({ date, setDate, control, controls }) {
	return (
		<div className={styles.advanced_filter_container}>
			<div style={{ paddingTop: '8px' }}>
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

			{controls[0].map((item) => {
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
