import { Select } from '@cogoport/components';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { asyncFieldsLocations } from '@cogoport/forms/utils/getAsyncFields';
import { IcALocationwhite } from '@cogoport/icons-react';
import { merge } from '@cogoport/utils';

import styles from './styles.module.css';

const LOCATION_MAPPING = {
	fcl_freight : 'port',
	air_freight : 'airport',
	ltl_freight : 'location',
	ftl_freight : 'location',
	air_customs : 'airport',
	fcl_customs : 'port',
	lcl_freight : 'port',
	lcl_customs : 'port',
	haulage_freight : 'location',
};

const IMG_SRC = 'https://cogoport-production.sgp1.digitaloceanspaces.com'
				+ '/314e2cdf282b4b8b6e4dd28283865a1d/radio-button-on.svg';

function FilterLocation({ filters, setFilters }) {
	const filterOption = {
		fcl_freight     : ['seaport'],
		lcl_freight     : ['seaport'],
		air_freight     : ['airport'],
		fcl_customs     : ['seaport'],
		lcl_customs     : ['seaport'],
		air_customs     : ['airport'],
		haulage_freight : ['pincode', 'seaport'],
		trailer_freight : ['pincode', 'seaport'],
		ltl_freight     : ['pincode', 'seaport'],
		ftl_freight     : ['pincode', 'seaport'],
		fcl_cfs         : ['seaport'],
	};

	const locationOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params: { filters: { type: filterOption[filters?.service] } },
	}));

	let origin_location_name = `origin_${LOCATION_MAPPING[filters?.service]}_id`;
	let destination_location_name = `destination_${LOCATION_MAPPING[filters?.service]}_id`;
	if (filters?.service === 'air_customs' || filters?.service === 'fcl_customs') {
		origin_location_name = `${LOCATION_MAPPING[filters?.service]}_id`;
		destination_location_name = `${LOCATION_MAPPING[filters?.service]}_id`;
	}

	const locationPlaceholders = {
		fcl_freight: {
			origin_placeholder: 'Origin Port',
			destination_placeholder: 'Destination Port',
		},
		air_freight: {
			origin_placeholder: 'Origin Airport',
			destination_placeholder: 'Destination Airport',
		},
		lcl_freight: {
			origin_placeholder: 'Origin Port',
			destination_placeholder: 'Destination Port',
		},
		air_customs: {
			origin_placeholder: 'Airport',
			destination_placeholder: null,
		},
		ftl_freight: {
			origin_placeholder: 'Origin Location',
			destination_placeholder: 'Destination Location',
		},
		ltl_freight: {
			origin_placeholder: 'Origin Location',
			destination_placeholder: 'Destination Location',
		},
		fcl_customs: {
		  origin_placeholder: 'Port',
		  destination_placeholder: null,
		},
		lcl_customs: {
		  origin_placeholder: 'Port',
		  destination_placeholder: null,
		},
		haulage_freight: {
		  origin_placeholder: 'Origin Location',
		  destination_placeholder: 'Destination Location',
		},
	  };
	  
	  const locationData = locationPlaceholders[filters?.service] || {};
	  const origin_placeholder = locationData.origin_placeholder || 'Origin';
	  const destination_placeholder = locationData.destination_placeholder || 'Destination';  
	return (
		<div style={{ display: 'flex' }}>
			<div className={styles.icon_container}>
				<div>
					<img
						src={IMG_SRC}
						alt="img"
						height="20px"
						width="20px"
					/>
				</div>
				{locationData?.destination_placeholder && (
					<div>
						<div className={styles.dashed_line} />
						<div style={{ marginTop: '5px' }}>
							<IcALocationwhite width="20" height="20" />
						</div>
					</div>
				)}
			</div>
			<div className={styles.select_conatiner}>
				<div className={styles.origin}>
					<Select
						placeholder={origin_placeholder}
						{...locationOptions}
						value={filters?.[origin_location_name]}
						isClearable
						onChange={(value) => setFilters({
							...filters,
							[origin_location_name]: value,
						})}
					/>
				</div>
				{locationData?.destination_placeholder && (
					<div className={styles.destination}>
						<Select
							placeholder={destination_placeholder}
							{...locationOptions}
							value={filters?.[destination_location_name]}
							isClearable
							onChange={(value) => setFilters({
							...filters,
							[destination_location_name]: value,
							})}
						/>
					</div>
				)}
			</div>

		</div>
	);
}

export default FilterLocation;
