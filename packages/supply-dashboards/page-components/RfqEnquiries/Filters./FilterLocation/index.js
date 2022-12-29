import { Radio, Select } from '@cogoport/components';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { asyncFieldsLocations } from '@cogoport/forms/utils/getAsyncFields';
import { merge, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function FilterLocation({ filters, hookSetters }) {
	const countryOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params: { filters: { type: ['country'] } },
	}));
	const { service } = filters;
	const filterOption = service === 'fcl_freight' ? 'seaport' : 'airport';
	const locationOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params: { filters: { type: [filterOption] } },
	}));
	const heading = service === 'air_freight' ? 'airport' : 'port';
	const handleChange = (value) => {
		hookSetters?.setFilters({ ...filters, trade_type: value });
	};
	return (
		<div className={styles.filter}>
			<div className={styles.heading}>Trade Type </div>
			<div className={styles.tradetype}>
				<Radio
					className="primary lg"
					label="Import "
					checked={filters.trade_type === 'import'}
					onChange={() => handleChange('import')}
				/>
				<Radio
					className="primary lg"
					label="Export "
					checked={filters.trade_type === 'export'}
					onChange={() => handleChange('export')}
				/>

			</div>
			<div className={styles.heading}>
				{startCase(heading)}
				{' '}
				Pair
			</div>
			<div className={styles.subheading}>
				<div>
					Origin
					{' '}
					{startCase(heading)}
				</div>
				<Select
					className={styles.select}
					{...locationOptions}
					isClearable
					placeholder="Select Origin Location"
					value={filters[`origin_${heading}_id`]}
					onChange={(value) => { hookSetters.setFilters({ ...filters, [`origin_${heading}_id`]: value }); }}
				/>
				<div>
					Destination
					{' '}
					{startCase(heading)}
				</div>
				<Select
					className={styles.select}
					{...locationOptions}
					isClearable
					placeholder="Select Destination Location"
					value={filters[`destination_${heading}_id`]}
					onChange={(value) => {
						hookSetters.setFilters(
							{ ...filters, [`destination_${heading}_id`]: value },
						);
					}}
				/>
			</div>
			<div className={styles.heading}>Country Pair </div>
			<div className={styles.subheading}>
				<div>Origin Country</div>
				<Select
					className={styles.select}
					{...countryOptions}
					isClearable
					placeholder="Select Origin Country"
					value={filters?.origin_country_id}
					onChange={(value) => { hookSetters.setFilters({ ...filters, origin_country_id: value }); }}
				/>
				<div>Destination Country</div>
				<Select
					className={styles.select}
					{...countryOptions}
					isClearable
					placeholder="Select Destination Country"
					value={filters?.destination_country_id}
					onChange={(value) => { hookSetters.setFilters({ ...filters, destination_country_id: value }); }}
				/>
			</div>
		</div>
	);
}
export default FilterLocation;
