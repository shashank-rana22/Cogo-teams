import { Checkbox } from '@cogoport/components';

import { DOCUMENT_COPIES } from './documentCopies';
import styles from './styles.module.css';

const TOTAL_AWB_COPIES = 12;

export function GetSelectAllCheckbox({ copiesOnChange = () => {}, copiesValue = [] }) {
	const onChangeTableHeaderCheckbox = (event) => {
		copiesOnChange(event.currentTarget.checked ? DOCUMENT_COPIES : []);
	};
	const isAllRowsChecked = (copiesValue || []).length === TOTAL_AWB_COPIES;

	return (
		<Checkbox
			label="Select All"
			value="select_all"
			className={styles.select_checkbox}
			checked={isAllRowsChecked}
			onChange={onChangeTableHeaderCheckbox}
		/>
	);
}
