import { Checkbox } from '@cogoport/components';

import styles from './styles.module.css';

function PreviewAndApproveLists() {
	return (
		<div className={styles.main_container}>
			<div className={styles.header}>
				<Checkbox
					label="checkbox2"
					value="a2"
					disabled={false}
					loading
				/>

			</div>
		</div>
	);
}
export default PreviewAndApproveLists;
