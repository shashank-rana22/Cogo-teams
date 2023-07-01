import { DateRangepicker, Select } from '@cogoport/components';
import containerSizes from '@cogoport/constants/container-sizes.json';
import containerTypes from '@cogoport/constants/container-types.json';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { asyncFieldsLocations } from '@cogoport/forms/utils/getAsyncFields';
import { FREIGHT_CONTAINER_COMMODITY_MAPPINGS } from '@cogoport/globalization/constants/commodities';
import { merge, startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

const TYPE = ['seaport'];

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

const getCommodityOptions = (container_type) => {
	const commodities = container_type
		? FREIGHT_CONTAINER_COMMODITY_MAPPINGS[container_type] : Object.values(FREIGHT_CONTAINER_COMMODITY_MAPPINGS)
			.flat();
	return commodities.map((value) => ({ label: startCase(value), value }));
};

function Filters({ filters, setFilters }) {
	const originLocationOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params   : { filters: { type: TYPE } },
		includes : { default_params_required: true },
		labelKey : 'display_name',
	}));
	const originDestinationOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params   : { filters: { type: TYPE } },
		labelKey : 'display_name',
	}));

	const commodityOptions = getCommodityOptions(filters?.container_type);

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
						value={filters?.origin_port_id}
						onChange={(value) => {
							setFilters((prev) => ({ ...prev, origin_port_id: value, page: 1 }));
						}}
					/>
				</div>
				<div className={styles.filter}>
					<p>Destination</p>
					<Select
						placeholder="Destination"
						isClearable
						{...originDestinationOptions}
						value={filters?.destination_port_id}
						onChange={(value) => {
							setFilters((prev) => ({ ...prev, destination_port_id: value, page: 1 }));
						}}
					/>
				</div>
				<div className={styles.filter}>
					<p>Commodity</p>
					<Select
						placeholder="Commodity"
						isClearable
						options={commodityOptions}
						value={filters?.commodity}
						onChange={(value) => {
							setFilters((prev) => ({ ...prev, commodity: value, page: 1 }));
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
