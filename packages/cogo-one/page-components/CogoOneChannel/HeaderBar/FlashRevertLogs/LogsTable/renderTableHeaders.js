import { Popover, cl, Datepicker, Select } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';

import styles from './styles.module.css';

const SERVICE_TYPES = [
	{
		label : 'FCL Freight',
		value : 'fcl_freight_service',
	},
	{
		label : 'LCL Freight',
		value : 'lcl_freight_service',
	},
	{
		label : 'AIR Freight',
		value : 'air_freight_service',
	},
];

export function RenderFlashedAt({ setFilterParams = () => {}, filtersParams = {} }) {
	return (
		<div className={styles.header_container}>
			<div className={styles.title}>Flashed At</div>
			<Popover
				placement="bottom"
				render={(
					<>
						Flashed after
						<Datepicker
							name="date"
							size="sm"
							placeholder="select date"
							onChange={(val) => setFilterParams((prev) => ({ ...prev, flashed_at: val }))}
							value={filtersParams?.flashed_at}
							isPreviousDaysAllowed
							maxDate={new Date()}
							shouldCloseOnSelect
						/>
					</>
				)}
			>
				<>
					<div className={cl`${styles.applied_filter} 
						${filtersParams?.flashed_at ? '' : styles.empty_filter_badge}`}
					/>
					<IcMFilter className={styles.filter_icon} />
				</>
			</Popover>
		</div>
	);
}

export function RenderShipmentType({ setFilterParams = () => {}, filtersParams = {} }) {
	return (
		<div className={styles.header_container}>
			<div className={styles.title}>Shipment Type</div>
			<Popover
				placement="bottom"
				render={(
					<Select
						placeholder="service type"
						name="service_type"
						isClearable
						onChange={(val) => setFilterParams((prev) => ({ ...prev, service_type: val }))}
						value={filtersParams?.service_type}
						options={SERVICE_TYPES}
					/>
				)}
				className={styles.popover_filter}
			>
				<>
					<div className={cl`${styles.applied_filter} 
						${filtersParams?.service_type ? '' : styles.empty_filter_badge}`}
					/>
					<IcMFilter className={styles.filter_icon} />
				</>
			</Popover>
		</div>
	);
}
