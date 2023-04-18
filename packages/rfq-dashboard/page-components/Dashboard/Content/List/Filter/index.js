import { Checkbox, Button, Select } from '@cogoport/components';

import styles from './styles.module.css';

function Filter() {
	return (
		<div className={styles.container}>
			<div className={styles.checkbox_field}>
				<Checkbox label="checkbox1" value="a1" />
				<Button>Approve Selected</Button>
			</div>
			<Select
				prefix="Sort By : "
				options={[{ label: 'Newest Arrival', value: 'newest' }]}
				size="sm"
			/>
		</div>
	);
}

export default Filter;
