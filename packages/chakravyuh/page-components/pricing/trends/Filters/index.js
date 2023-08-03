import { Select } from '@cogoport/components';
import containerSizes from '@cogoport/constants/container-sizes.json';
import containerTypes from '@cogoport/constants/container-types.json';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { asyncFieldsLocations } from '@cogoport/forms/utils/getAsyncFields';
import { merge } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function Filters({ setFilters, filters }) {
	const type = filters?.origin_location_type ? [filters?.origin_location_type] : ['country', 'trade', 'seaport'];
	const locationOriginOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params   : { filters: { type } },
		includes : { default_params_required: true },
		labelKey : 'display_name',
	}));

	const locationDestination = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params   : { filters: { type } },
		labelKey : 'display_name',
	}));

	return (

		<div className={styles.filters}>
			<p className={styles.filtersheading}>
				Apply Filter (These filters will be applied throughout the page)
			</p>
			<div className={styles.row}>
				<div>
					<p className={styles.label}>Location Type</p>
					<Select
						className={styles.select}
						options={[
							{
								label : 'Trade lane',
								value : 'trade',
							},
							{
								label : 'Country',
								value : 'country',
							},
							{
								label : 'Seaport',
								value : 'seaport',
							},
						]}
						isClearable
						placeholder="Location Type"
						value={filters?.origin_location_type}
						onChange={(value) => { setFilters({ ...filters, origin_location_type: value, page: 1 }); }}
					/>
				</div>
				<div>
					<p className={styles.label}>Origin</p>
					<Select
						className={styles.select}
						{...locationOriginOptions}
						isClearable
						placeholder="Origin"
						value={filters?.origin_location_id}
						onChange={(value) => { setFilters({ ...filters, origin_location_id: value, page: 1 }); }}
					/>
				</div>
				<div>
					<p className={styles.label}>Destination</p>
					<Select
						className={styles.select}
						{...locationDestination}
						isClearable
						placeholder="Destination"
						value={filters?.destination_location_id}
						onChange={(value) => { setFilters({ ...filters, destination_location_id: value, page: 1 }); }}
					/>
				</div>
				<div>
					<p className={styles.label}>Container Size</p>
					<Select
						className={styles.select}
						isClearable
						options={containerSizes}
						placeholder="Container Size"
						value={filters?.container_size}
						onChange={(value) => { setFilters({ ...filters, container_size: value, page: 1 }); }}
					/>
				</div>
				<div>
					<p className={styles.label}>Container Type</p>
					<Select
						className={styles.select}
						options={containerTypes}
						isClearable
						placeholder="Container Type"
						value={filters?.container_type}
						onChange={(value) => { setFilters({ ...filters, container_type: value, page: 1 }); }}
					/>
				</div>
			</div>
		</div>
	);
}

export default Filters;
