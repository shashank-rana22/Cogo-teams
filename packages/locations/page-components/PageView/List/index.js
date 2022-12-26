import { Placeholder } from '@cogoport/components';

import getValue from '../../../utils/getValues';

import styles from './styles.module.css';

function List({
	columns = [],
	item = {},
	onClick = () => {},
	loading = false,
}) {
	return (
		<div className={styles.container}>
			{columns.map((singleItem) => {
				const { key, flex, label } = singleItem;
				return (
					<div
						role="presentation"
						onClick={() => onClick(item)}
						className={styles.item}
						key={key || label}
						style={{ flex }}
					>
						{loading ? <Placeholder /> : getValue(item, singleItem) }
					</div>
				);
			})}
		</div>
	);
}

export default List;
