import { Checkbox } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import { DOCUMENT_COPIES } from './documentCopies';
import styles from './styles.module.css';

const TOTAL_AWB_COPIES = 12;

export function GetSelectAllCheckbox({ copiesOnChange = () => {}, copiesValue = [] }) {
	const { t } = useTranslation(['printingDesk']);
	const onChangeTableHeaderCheckbox = (event) => {
		copiesOnChange(event.currentTarget.checked ? DOCUMENT_COPIES : []);
	};
	const isAllRowsChecked = (copiesValue || []).length === TOTAL_AWB_COPIES;

	return (
		<Checkbox
			label={t('printingDesk:utils_get_select_all_checkbox_label')}
			value="select_all"
			className={styles.select_checkbox}
			checked={isAllRowsChecked}
			onChange={onChangeTableHeaderCheckbox}
		/>
	);
}
