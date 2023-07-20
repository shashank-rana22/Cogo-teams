import { Select } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

// const tabs = ['spot_searches', 'quotations', 'spot_booking', 'sales_shipments'];

const SERVICES = [
	{ label: 'FCL', value: 'fcl_freight' },
	{ label: 'LCL', value: 'lcl_freight' },
	{ label: 'AIR International', value: 'air_freight' },
	{ label: 'AIR Domestic', value: 'domestic_air_freight' },
	{ label: 'AIR Customs', value: 'air_customs' },
	{ label: 'FCL Customs', value: 'fcl_customs' },
	{ label: 'LCL Customs', value: 'lcl_customs' },
	{ label: 'FTL', value: 'ftl_freight' },
	{ label: 'LTL', value: 'ltl_freight' },
	{ label: 'Haulage Freight', value: 'haulage_freight' },
	{ label: 'Trailer Freight', value: 'trailer_freight' },
	{ label: 'FCL Locals', value: 'fcl_freight_local' },
];

function ExtraFilters({
	serviceType,
	// filters,
	setFilters,
	setServiceType,
	type,
}) {
	// const [date, setDate] = useState({});
	// const [range, setRange] = useState('last_3_days');
	// const [isOpenCalendar, setIsOpenCalendar] = useState(false);

	// const { validity_end_less_than, validity_start_greater_than } = date || {};

	// const handleApplyFilters = () => {
	// 	let newDate = { ...date };

	// 	if (tabs.includes(type)) {
	// 		newDate = {
	// 			created_at_greater_than : validity_start_greater_than,
	// 			created_at_less_than    : validity_end_less_than,
	// 		};
	// 	}

	// 	setFilters({
	// 		...filters,
	// 		...newDate,
	// 		page: 1,
	// 	});
	// };

	return (
		<div className={styles.container}>
			{type !== 'allocation_requests' ? (
				<div className={styles.service_select}>
					<Select
						placeholder="Select Service"
						style={{ marginRight: 8 }}
						size="sm"
						value={serviceType}
						onChange={(val) => {
							setServiceType(val);
							setFilters((previousFilters) => ({ ...previousFilters, page: 1 }));
						}}
						options={SERVICES}
						isClearable
					/>
				</div>
			) : null}

			{/* <FilterContent
				applyFilters={handleApplyFilters}
				setOpen={setIsOpenCalendar}
				open={isOpenCalendar}
				type="date-range"
				date={date}
				setDate={setDate}
				range={range}
				setRange={setRange}
			>
				<div
					role="presentation"
					className={styles.date_filter_wrap}
					onClick={() => setIsOpenCalendar(!isOpenCalendar)}
				>
					<div>
						<Pill>{startCase(range)}</Pill>
						<div
							style={{
								borderRight : '1px solid #e0e0e0',
								margin      : '0px 8px',
								height      : '18px',
							}}
						/>
						<div>
							{`${formatDate({
								date       : validity_start_greater_than,
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								formatType : 'date',
							})} - ${formatDate({
								date       : validity_end_less_than,
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								formatType : 'date',
							})}`}
						</div>
					</div>

					<IcMArrowRotateDown
						style={{
							width  : '22px',
							height : '14px',
							margin : '0 6px',
						}}
					/>
				</div>
			</FilterContent> */}
		</div>
	);
}

export default ExtraFilters;
