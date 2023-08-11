import { Checkbox } from '@cogoport/components';

import styles from './styles.module.css';

function Content({
	lineItem = [],
	checkedLineItem = [],
	handleLineItemSelect = () => {},
}) {
	const isChecked = checkedLineItem?.map((item) => item?.name);
	const keysToDisplay = ['name', 'currency', 'price', 'quantity', 'tax_percent', 'tax_price', 'total_tax_price'];
	return (
		<div className={styles.content}>
			<Checkbox
				checked={(isChecked || []).includes(lineItem?.name)}
				onChange={() => handleLineItemSelect(lineItem)}
			/>
			{keysToDisplay.map((key) => (
				<div key={key}>{lineItem?.[key]}</div>
			))}
		</div>
	);
}

export default Content;
