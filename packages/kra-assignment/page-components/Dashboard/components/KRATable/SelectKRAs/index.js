import { Button, MultiSelect } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function SelectKRAs({ selectedValue, setSelectedValue, KRAOptions, onClickAddKRAs }) {
	return (
		<div className={styles.container}>
			<div>
				Select KRA
				<div className={styles.select_container}>
					<MultiSelect
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
					onClick={onClickAddKRAs}
					disabled={isEmpty(selectedValue)}
				>
					Add KRAs
				</Button>
			</div>
		</div>
	);
}

export default SelectKRAs;
