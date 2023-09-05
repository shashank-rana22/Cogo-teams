import { Button, DateRangepicker, Select } from '@cogoport/components';
import { asyncFieldsLocations, asyncFieldsOperators, useGetAsyncOptions } from '@cogoport/forms';
import { merge } from '@cogoport/utils';

import { serviceOptions, taskStatusOptions, commodityOptions } from '../../helpers/constants';

import styles from './styles.module.css';

function Filter({
	filter = {},
	setFilter = () => {},
	setSerialId = () => {},
	setShowWeekData = () => {},
}) {
	const isAirService = filter?.service === 'air_freight';

	const type = (isAirService) ? 'airport' : 'seaport';
	const operator_type = (isAirService) ? 'airline' : 'shipping_line';
	const originLocationOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params   : { filters: { type } },
		includes : { default_params_required: true },
		labelKey : 'display_name',
	}));

	const destinationLocationOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params   : { filters: { type } },
		includes : { default_params_required: true },
		labelKey : 'display_name',
	}));
	const shippingLineOptions = useGetAsyncOptions(merge(
		asyncFieldsOperators(),
		{ params: { filters: { operator_type } } },
	));

	return (
		<div className={styles.parent}>
			<div className={styles.heading}>
				<span className={styles.apply_filters}>Apply Filter</span>
				{' '}
				(These filters will be applied throughout the page)
				<div className={styles.clear_all_filters}>
					<Button
						size="md"
						themeType="tertiary"
						onClick={() => {
							setFilter({ service: 'fcl_freight', status: 'pending', releventToMeValue: true, page: 1 });
							setSerialId('');
						}}
					>
						Clear All Filters
					</Button>
				</div>
			</div>

			<div className={styles.filter_container}>
				<div className={styles.filter_option_width}>
					<p>
						Service
					</p>
					<Select
						placeholder="select"
						options={serviceOptions}
						value={filter?.service}
						onChange={(value) => {
							setFilter({ service: value, status: 'pending', releventToMeValue: true });
							setShowWeekData(false);
						}}
					/>
				</div>
				<div className={styles.filter_option_width}>
					<p>Origin</p>
					<Select
						placeholder="Country / Port Pair"
						{...originLocationOptions}
						value={filter?.origin_port_id}
						onChange={(value) => {
							setFilter((prevFilters) => ({ ...prevFilters, origin_port_id: value, page: 1 }));
						}}
					/>
				</div>
				<div className={styles.filter_option_width}>
					<p>Destination</p>
					<Select
						placeholder="Country / Port Pair"
						{...destinationLocationOptions}
						value={filter?.destination_port_id}
						onChange={(value) => {
							setFilter((prevFilters) => ({ ...prevFilters, destination_port_id: value, page: 1 }));
						}}
					/>
				</div>
				<div className={styles.filter_option_width}>
					<p>{(isAirService) ? 'Air Line' : 'Shipping Line'}</p>
					<Select
						placeholder="Search here"
						{...shippingLineOptions}
						value={filter?.shipping_line_id}
						onChange={(value) => {
							setFilter((prevFilters) => ({ ...prevFilters, shipping_line_id: value, page: 1 }));
						}}
					/>
				</div>
				<div className={styles.filter_option_width}>
					<p>Commodity Type</p>
					<Select
						placeholder="Search here"
						value={filter?.commodity_type}
						options={commodityOptions}
						onChange={(value) => {
							setFilter((prevFilters) => ({ ...prevFilters, commodity_type: value, page: 1 }));
						}}
					/>
				</div>

				<div className={styles.filter_option_width}>
					<p>Task Status</p>
					<Select
						placeholder="Search here"
						value={filter?.status}
						options={taskStatusOptions}
						onChange={(value) => {
							setFilter((prevFilters) => ({ ...prevFilters, status: value, page: 1 }));
						}}
					/>
				</div>
				<div className={styles.date_range_filter_width}>
					<p>Date Range</p>
					<DateRangepicker
						value={filter?.date_range}
						onChange={(value) => {
							setFilter((prev) => ({ ...prev, date_range: value, page: 1 }));
						}}
						isPreviousDaysAllowed
						maxDate={new Date()}
					/>
				</div>
			</div>

		</div>
	);
}

export default Filter;
