import { Checkbox } from '@cogoport/components';

import styles from './styles.module.css';

function GetTableBodyCheckbox({ itemData = {}, onChangeTableBodyCheckbox = () => {}, apiData = {} }) {
	const { id = '' } = itemData || {};
	const { list = [] } = apiData || {};
	const isChecked = (list || [])?.find((item) => item?.id === id)?.checked;

	return (
		<div className={styles.checkbox_style}>
			{itemData?.invoiceType === 'CREDIT NOTE' ? null : (
				<Checkbox checked={isChecked} onChange={() => onChangeTableBodyCheckbox(itemData)} />
			)}
		</div>
	);
}

export default GetTableBodyCheckbox;
