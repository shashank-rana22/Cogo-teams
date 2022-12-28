import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function List({
	fields, item, loading, setRfq,
}) {
	return (
		<div className={styles.container}>
			{fields.map((field) => {
				const { label, flex, key } = field;
				return (
					<div
						role="presentation"
						onClick={() => setRfq(item)}
						className={styles.item}
						key={key || label}
						style={{ flex }}
					>
						{loading ? <Placeholder /> : field.render(item) }
					</div>
				);
			})}
		</div>
	);
}
export default List;
