import { useForm } from '@cogoport/forms';

import Layout from '../../../../common/Layout';

import getFilterControls from './search-controls';
import getShowElements from './showElement';
import styles from './styles.module.css';

function SearchFilters({ activeTab = () => {}, setSearchString = () => {}, setSerialId = () => {} }) {
	const { control, watch } = useForm();

	const {
		serial_id,
		airway_bill_no,
		container_bill_no,
		truck_no,
	} = watch();

	const q = airway_bill_no || container_bill_no || truck_no;
	setSerialId(serial_id);
	setSearchString(q);
	const controls = getFilterControls({ setSearchString });

	return (
		<div className={styles.container_class}>
			<Layout controls={controls} control={control} showElements={getShowElements({ activeTab, controls })} />

		</div>
	);
}

export default SearchFilters;
