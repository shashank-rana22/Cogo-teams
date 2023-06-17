import { Button, Select } from '@cogoport/components';

import styles from './styles.module.css';
import useKRAList from './useKRAList';

function KRATable() {
	const { selectedValue, setSelectedValue, KRAOptions } = useKRAList();
	return (
		<div className={styles.container}>
			<div>
				Select KRA
				<div className={styles.select_container}>
					<Select
						size="sm"
						placeholder="Container no"
						value={selectedValue}
						onChange={(e) => setSelectedValue(e)}
						options={KRAOptions || []}
					/>
				</div>
			</div>

			<div className={styles.button_wrapper}>
				<Button
					themeType="primary"
					size="sm"
				>
					Add KRAs
				</Button>
			</div>

		</div>
	);
}

export default KRATable;
