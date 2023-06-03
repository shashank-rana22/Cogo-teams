import { Select } from '@cogoport/components';
import { AsyncSelectController, useForm } from '@cogoport/forms';

import styles from './styles.module.css';

function FilterHeader({
	dashboardFilters, setDashboardFilters,
	GetYearDetails, optionsYear, GetMonthDetails, optionsMonth,
}) {
	const { control } = useForm();
	return (
		<div className={styles.container}>

			<div className={styles.select_container}>
				<Select
					value={dashboardFilters?.year || GetYearDetails}
					onChange={(val:string) => { setDashboardFilters((prev) => ({ ...prev, year: val })); }}
					placeholder="Year"
					options={optionsYear()}
					isClearable
					style={{ width: '110px' }}
					size="sm"
				/>
				<Select
					value={dashboardFilters?.month || GetMonthDetails?.value}
					onChange={(val:string) => { setDashboardFilters((prev) => ({ ...prev, month: val })); }}
					placeholder="Month"
					options={optionsMonth}
					isClearable
					style={{ width: '150px' }}
					size="sm"
				/>
				<div className={styles.async_select}>
					<AsyncSelectController
						control={control}
						name="entityCode"
						asyncKey="list_cogo_entity"
						renderLabel={(item) => (`${item?.business_name}(${item?.entity_code})`)}
						placeholder="Entity"
						labelKey="entity_code"
						finalValue="301"
						initialCall
						rules={{ required: true }}
						isClearable
					/>
				</div>
			</div>

			<div className={styles.legends}>
				<div className={styles.legend}>Legend</div>
				<div className={styles.small_hr} />

				<div className={styles.flex_data}>
					{' '}
					<div className={styles.booked_circle} />
					Booked
				</div>

				<div className={styles.flex_data}>
					{' '}
					<div className={styles.acc_circle} />
					Accrued
				</div>
			</div>
		</div>
	);
}

export default FilterHeader;
