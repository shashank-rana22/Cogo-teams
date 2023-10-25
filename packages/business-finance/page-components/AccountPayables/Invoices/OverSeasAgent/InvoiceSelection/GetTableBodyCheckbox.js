import { Checkbox } from '@cogoport/components';

import styles from './styles.module.css';

function GetTableBodyCheckbox({
	itemData = {},
	onChangeTableBodyCheckbox = () => {},
	apiData = {}, setApiData = () => {},
	allowed = true,
}) {
	const { id = '' } = itemData || {};
	const { list = [] } = apiData || {};
	const isChecked = (list || [])?.find((item) => item?.id === id)?.checked;
	const visible = itemData?.invoiceType === 'CREDIT NOTE';

	return (
		<div className={styles.checkbox_style}>
			{ visible ? null : (
				<Checkbox
					checked={isChecked}
					disabled={!allowed}
					onChange={() => onChangeTableBodyCheckbox({ itemData, setApiData })}
				/>
			)}
		</div>
	);
}

export default GetTableBodyCheckbox;
