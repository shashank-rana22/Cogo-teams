import { Radio, Select } from '@cogoport/components';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { asyncFieldsLocations } from '@cogoport/forms/utils/getAsyncFields';
import { merge } from '@cogoport/utils';

import styles from './styles.module.css';

function FilterLocation({ filters }) {
	const countryOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params: { filters: { type: ['country'] } },
	}));
	const handleChange = () => {};
	return (
		<div>
			<div>Trade Type </div>
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
			<div>Port Pair </div>
			<div>
				<div>Origin Port</div>
				<Select />
				<div>Destination Port</div>
				<Select />
			</div>
			<div>Country Pair </div>
			<div>
				<div>Origin Country</div>
				<Select optionsListKey="locations" />
				<div>Destination Country</div>
				<Select />
			</div>
		</div>
	);
}
export default FilterLocation;
