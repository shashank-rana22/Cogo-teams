import { Select } from '@cogoport/components';
import { AsyncSelectController } from '@cogoport/forms';

import styles from './styles.module.css';

interface DashboardFilterInterface {
	month?:string
	year?:string
}
interface FilterHeaderInterface {
	setDashboardFilters?: React.Dispatch<React.SetStateAction<DashboardFilterInterface>>
	dashboardFilters?:DashboardFilterInterface
	GetMonthDetails?: {
		value?: string;
		label?: string;
	}
	GetYearDetails?:string
	optionsMonth: {
		value: string;
		label: string;
	}[]
	optionsYear: () => {
		value: string;
		label: string;
	}[]
	control: object
}

function FilterHeader({
	dashboardFilters, setDashboardFilters,
	GetYearDetails, optionsYear, GetMonthDetails, optionsMonth, control,
}:FilterHeaderInterface) {
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
					onChange={(val) => { setDashboardFilters((prev) => ({ ...prev, month: val })); }}
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
