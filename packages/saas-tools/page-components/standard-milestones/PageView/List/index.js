import { Placeholder } from '@cogoport/components';

import getValue from '../../../../utils/getValues';

import styles from './styles.module.css';

function List({
	columns = [],
	item = {},
	onClick = () => {},
	loading = false,
	shippingInfo = {},
}) {
	return (
		<div className={styles.container}>
			{columns.map((singleItem) => {
      	const { key, flex, label } = singleItem;

      	return (
	<div
		role="presentation"
		className={styles.item}
		key={key || label}
		style={{ flex }}
	>
		{loading ? (
			<Placeholder />
		) : (
			getValue(item, singleItem, onClick, shippingInfo)
		)}
	</div>
);
			})}
		</div>
	);
}

export default List;
