import { DateRangepicker, Select } from '@cogoport/components';
import commodityOptions from '@cogoport/constants/commodity-types.json';
import containerSizes from '@cogoport/constants/container-sizes.json';
import containerTypes from '@cogoport/constants/container-types.json';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { asyncFieldsLocations } from '@cogoport/forms/utils/getAsyncFields';
import { merge } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const sourceTypes = [
	{
		label : 'Predicted',
		value : 'predicted',
	},
	{
		label : 'Spot Search',
		value : 'spot_search',
	},
];

function Filters({ filters, setFilters }) {
	const type = ['country', 'trade', 'seaport'];
	const originLocationOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params   : { filters: { type } },
		includes : { default_params_required: true },
		labelKey : 'display_name',
	}));
	const originDestinationOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params   : { filters: { type } },
		labelKey : 'display_name',
	}));

	return (
		<div className={styles.container}>
			<p className={styles.filter_heading}>
				Apply Filter &#40;These filters will be applied throughout the page&#41;
			</p>
			<div className={styles.flex}>
				<div className={styles.filter}>
					<p>Origin</p>
					<Select
						placeholder="Origin"
						{...originLocationOptions}
						isClearable
						value={filters?.origin_location_id}
						onChange={(value) => {
							setFilters((prev) => ({ ...prev, origin_location_id: value, page: 1 }));
						}}
					/>
				</div>
				<div className={styles.filter}>
					<p>Destination</p>
					<Select
						placeholder="Destination"
						isClearable
						{...originDestinationOptions}
						value={filters?.destination_location_id}
						onChange={(value) => {
							setFilters((prev) => ({ ...prev, destination_location_id: value, page: 1 }));
						}}
					/>
				</div>
				<div className={styles.filter}>
					<p>Commodity</p>
					<Select
						placeholder="Commodity"
						isClearable
						options={commodityOptions}
						value={filters?.commodity_type}
						onChange={(value) => {
							setFilters((prev) => ({ ...prev, commodity_type: value, page: 1 }));
						}}
					/>
				</div>
				<div className={styles.filter}>
					<p>Container Size</p>
					<Select
						placeholder="Container Size"
						isClearable
						options={containerSizes}
						value={filters?.container_size}
						onChange={(value) => {
							setFilters((prev) => ({ ...prev, container_size: value, page: 1 }));
						}}
					/>
				</div>
				<div className={styles.filter}>
					<p>Container Type</p>
					<Select
						placeholder="Container Type"
						isClearable
						options={containerTypes}
						value={filters?.container_type}
						onChange={(value) => {
							setFilters((prev) => ({ ...prev, container_type: value, page: 1 }));
						}}
					/>
				</div>
				<div className={styles.filter} style={{ width: '120px' }}>
					<p>Source</p>
					<Select
						placeholder="Source"
						isClearable
						options={sourceTypes}
						value={filters?.source}
						onChange={(value) => {
							setFilters((prev) => ({ ...prev, source: value, page: 1 }));
						}}
					/>
				</div>

				<div className={styles.filter}>
					<p>Date</p>
					<DateRangepicker
						value={filters?.dataRange}
						onChange={(value) => {
							setFilters((prev) => ({ ...prev, dataRange: value, page: 1 }));
						}}
						isPreviousDaysAllowed
						maxDate={new Date()}
					/>
				</div>

				<p
					role="presentation"
					className={styles.link_text}
					onClick={() => {
						setFilters({ page: 1 });
					}}
				>
					clear filters
				</p>
			</div>
		</div>
	);
}

export default Filters;
