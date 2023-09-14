import { Button, DateRangepicker, Select } from '@cogoport/components';
import { asyncFieldsLocations, asyncFieldsOperators, useGetAsyncOptions } from '@cogoport/forms';
import { FREIGHT_CONTAINER_COMMODITY_MAPPINGS } from '@cogoport/globalization/constants/commodities';
import { merge, startCase } from '@cogoport/utils';

import { serviceOptions, taskStatusOptions, commodityOptions } from '../../configurations/helpers/constants';

import styles from './styles.module.css';

function Filter({
	filter = {},
	setFilter = () => {},
	setSerialId = () => {},
	setShowWeekData = () => {},
	setSource = () => {},
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

	const FCL_COMMODITY_OPTIONS = [];
	(Object.keys(FREIGHT_CONTAINER_COMMODITY_MAPPINGS) || []).forEach((containerType) => {
		FREIGHT_CONTAINER_COMMODITY_MAPPINGS[containerType].forEach((commodity) => {
			FCL_COMMODITY_OPTIONS.push(
				{
					label : (commodity.split('-') || []).map((item) => parseFloat(item) || startCase(item)).join(' '),
					value : commodity,
				},
			);
		});
	});

	const handleClick = () => {
		setFilter({
			service           : 'fcl_freight',
			status            : 'pending',
			releventToMeValue : true,
			page              : 1,
			daily_stats       : true,
			assign_to_id      : '',
		});
		setSerialId('');
		setShowWeekData(false);
		setSource(null);
	};

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
						onClick={handleClick}
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
							setFilter({
								service           : value,
								status            : 'pending',
								releventToMeValue : true,
								daily_stats       : true,
								assign_to_id      : '',
							});
							setShowWeekData(false);
						}}
					/>
				</div>
				<div className={styles.filter_option_width}>
					<p>Origin</p>
					<Select
						placeholder="Country / Port Pair"
						{...originLocationOptions}
						value={filter?.origin_location}
						isClearable
						onChange={(value) => {
							setFilter((prevFilters) => ({ ...prevFilters, origin_location: value, page: 1 }));
						}}
					/>
				</div>
				<div className={styles.filter_option_width}>
					<p>Destination</p>
					<Select
						placeholder="Country / Port Pair"
						{...destinationLocationOptions}
						value={filter?.destination_location}
						isClearable
						onChange={(value) => {
							setFilter((prevFilters) => ({ ...prevFilters, destination_location: value, page: 1 }));
						}}
					/>
				</div>
				<div className={styles.filter_option_width}>
					<p>{(isAirService) ? 'Air Line' : 'Shipping Line'}</p>
					<Select
						placeholder="Search here"
						{...shippingLineOptions}
						value={filter?.operater_type}
						isClearable
						onChange={(value) => {
							setFilter((prevFilters) => ({ ...prevFilters, operater_type: value, page: 1 }));
						}}
					/>
				</div>
				<div className={styles.filter_option_width}>
					<p>Commodity Type</p>
					<Select
						placeholder="Search here"
						value={filter?.commodity}
						options={(isAirService) ? commodityOptions : FCL_COMMODITY_OPTIONS}
						isClearable
						onChange={(value) => {
							setFilter((prevFilters) => ({ ...prevFilters, commodity: value, page: 1 }));
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
				<div>
					<p>Date Range</p>
					<DateRangepicker
						className={styles.date_range_filter_width}
						value={{ startDate: filter?.start_date, endDate: filter?.end_date }}
						onChange={(value) => {
							setFilter((prev) => ({
								...prev, start_date: value?.startDate, end_date: value?.endDate, page: 1,
							}));
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
