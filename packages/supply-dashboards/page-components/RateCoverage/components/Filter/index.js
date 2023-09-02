import { Button, DateRangepicker, Select } from '@cogoport/components';
import { asyncFieldsLocations, asyncFieldsOperators, useGetAsyncOptions } from '@cogoport/forms';
import { merge } from '@cogoport/utils';
import { useEffect } from 'react';

// import Controls from '../../configurations/filter';

import { serviceOptions, taskStatusOptions, commodityOptions } from '../../helpers/constants';

import styles from './styles.module.css';

const CONSTANT_SIX_HUNDERED = 600;
const CONSTANT_SIXTEEN = 16;
// const CONSTANT_TWENTY = 20;
// const CONSTANT_SEVEN = 7;

function Filter({ getCoverageDetails = () => {}, filter = {}, setFilter = () => {}, getListCoverage = () => {} }) {
	const type = (filter?.service === 'air_freight') ? ['country', 'airport'] : ['country', 'trade', 'seaport'];
	const operator_type = (filter?.service === 'air_freight') ? 'air_line' : 'shipping_line';
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

	useEffect(() => {
		getCoverageDetails();
	}, [filter, getCoverageDetails]);

	useEffect(() => {
		getListCoverage();
	}, [getListCoverage, filter]);

	return (
		<div className={styles.parent}>
			<div className={styles.heading}>
				<span className={styles.apply_filters}>Apply Filter</span>
				{' '}
				(These filters will be applied throughout the page)
				<Button
					size="md"
					themeType="tertiary"
					onClick={() => {
						setFilter({ page: 1, service: 'fcl_freight' });
					}}
					style={{
						float         : 'right',
						color         : '#828282',
						fontWeight    : CONSTANT_SIX_HUNDERED,
						paddingBottom : CONSTANT_SIXTEEN,
					}}
				>
					Clear All Filters
				</Button>
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
							setFilter((prevFilters) => ({ ...prevFilters, service: value, page: 1 }));
						}}
					/>
				</div>
				<div className={styles.filter_option_width}>
					<p>Origin</p>
					<Select
						placeholder="Country/Port Pair"
						{...originLocationOptions}
						value={filter?.origin_location_id}
						onChange={(value) => {
							setFilter((prevFilters) => ({ ...prevFilters, origin_location_id: value, page: 1 }));
						}}
					/>
				</div>
				<div className={styles.filter_option_width}>
					<p>Destination</p>
					<Select
						placeholder="Country/Port Pair"
						{...destinationLocationOptions}
						value={filter?.destination_location_id}
						onChange={(value) => {
							setFilter((prevFilters) => ({ ...prevFilters, destination_location_id: value, page: 1 }));
						}}
					/>
				</div>
				<div className={styles.filter_option_width}>
					<p>{(filter?.service === 'air_freight') ? 'Air Line' : 'Shipping Line'}</p>
					<Select
						placeholder="search here"
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
						placeholder="search here"
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
						placeholder="search here"
						value={filter?.status}
						options={taskStatusOptions}
						onChange={(value) => {
							setFilter((prevFilters) => ({ ...prevFilters, status: value, page: 1 }));
						}}
					/>
				</div>
				<div className={styles.filter_option_width} style={{ width: '220px' }}>
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
