import { Checkbox } from '@cogoport/components';

import styles from './styles.module.css';

function GetTableBodyCheckbox({ itemData = {}, onChangeTableBodyCheckbox = () => {}, apiData = {} }) {
	const { organizationId = '' } = itemData || {};
	const { list = [] } = apiData || {};

	const isChecked = list.find(
		(item) => item?.organizationId === organizationId,
	)?.checked;

	return (
		<div className={styles.checkbox_style}>
			<Checkbox
				checked={isChecked}
				onChange={() => onChangeTableBodyCheckbox(itemData)}
			/>
		</div>
	);
}

export default GetTableBodyCheckbox;
