import { Checkbox } from '@cogoport/components';

import styles from './styles.module.css';

function Content({
	lineItem = [],
	checkedLineItem = [],
	handleLineItemSelect = () => {},
}) {
	const isChecked = checkedLineItem?.map((item) => item?.name);
	return (
		<div className={styles.content}>
			<Checkbox
				checked={(isChecked || []).includes(lineItem?.name)}
				onChange={() => handleLineItemSelect(lineItem)}
			/>
			<div>{lineItem?.name}</div>
			<div>{lineItem?.currency}</div>
			<div>{lineItem?.price}</div>
			<div>{lineItem?.quantity}</div>
			<div>{lineItem?.tax_percent}</div>
			<div>{lineItem?.tax_price}</div>
			<div>{lineItem?.total_tax_price}</div>
		</div>
	);
}

export default Content;
