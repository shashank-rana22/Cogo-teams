import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function Item({
	item,
	fields,
	loading = false,
}) {
	return (
		<div className={styles.row}>
			{fields?.map((singleItem) => {
				if (singleItem?.show === false) {
					return null;
				}
				const { span, render = () => {}, label } = singleItem;
				const widthVal = (span / 12) * 100;
				return (
					<div
						style={{ width: `${widthVal}%` }}
						key={label}
						className={styles.column}
					>
						{loading ? <Placeholder width="100%" height="20px" /> : null}

						{render && !loading ? render(item) : null}

					</div>
				);
			})}
		</div>
	);
}

export default Item;
