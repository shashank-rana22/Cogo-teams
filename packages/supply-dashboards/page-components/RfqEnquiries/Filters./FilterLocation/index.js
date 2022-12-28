import { Radio, Select } from '@cogoport/components';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { asyncFieldsLocations } from '@cogoport/forms/utils/getAsyncFields';
import { merge } from '@cogoport/utils';

import styles from './styles.module.css';

function FilterLocation({ filters }) {
	const countryOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params: { filters: { type: ['country'] } },
	}));
	const { service } = filters;
	const filterOption = service === 'fcl_freight' ? 'seaport' : 'airport';
	const locationOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params: { filters: { type: [filterOption] } },
	}));
	const heading = service === 'air_freight' ? 'Airport' : 'Port';
	const handleChange = () => {};
	return (
		<div className={styles.filter}>
			<div className={styles.heading}>Trade Type </div>
			<div className={styles.tradetype}>
				<Radio
					className="primary lg"
					label="Import "
					checked
					onChange={handleChange}
				/>
				<Radio
					className="primary lg"
					label="Export "
					checked
					onChange={handleChange}
				/>

			</div>
			<div className={styles.heading}>
				{heading}
				{' '}
				Pair
			</div>
			<div className={styles.subheading}>
				<div>
					Origin
					{' '}
					{heading}
				</div>
				<Select
					className={styles.select}
					{...locationOptions}
					isClearable
					placeholder="Select Origin Location"
				/>
				<div>
					Destination
					{' '}
					{heading}
				</div>
				<Select
					className={styles.select}
					{...locationOptions}
					isClearable
					placeholder="Select Destination Location"
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
				/>
				<div>Destination Country</div>
				<Select
					className={styles.select}
					{...countryOptions}
					isClearable
					placeholder="Select Destination Country"
				/>
			</div>
		</div>
	);
}
export default FilterLocation;
