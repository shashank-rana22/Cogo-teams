import { Select } from '@cogoport/components';
import { AsyncSelectController } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import styles from './styles.module.css';

type Options = {
	value: string;
	label: string;
};

interface DashboardFilterInterface {
	month?:string
	year?:string
}
interface FilterHeaderInterface {
	setDashboardFilters?: React.Dispatch<React.SetStateAction<DashboardFilterInterface>>
	dashboardFilters?:DashboardFilterInterface
	GET_MONTH_DETAILS?: Options
	GET_YEAR_DETAILS?:string
	optionsMonth: Options[]
	optionsYear: Options[]
	control: object
}

function FilterHeader({
	dashboardFilters, setDashboardFilters,
	GET_YEAR_DETAILS, optionsYear, GET_MONTH_DETAILS, optionsMonth, control,
}:FilterHeaderInterface) {
	return (
		<div className={styles.container}>

			<div className={styles.select_container}>
				<Select
					value={dashboardFilters?.year || GET_YEAR_DETAILS}
					onChange={(val:string) => { setDashboardFilters((prev) => ({ ...prev, year: val })); }}
					placeholder="Year"
					options={optionsYear}
					isClearable
					style={{ width: '110px' }}
					size="sm"
				/>
				<Select
					value={dashboardFilters?.month || GET_MONTH_DETAILS?.value}
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
						finalValue={Object.keys(GLOBAL_CONSTANTS.cogoport_entities)[2]}
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
