import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function List({ fields, item, loading }) {
	return (
		<div className={styles.container}>
			{fields.map((field) => (
				<div
					className={styles.item}
				>
					{loading ? <Placeholder /> : field.render(item) }
				</div>
			))}
		</div>
	);
}
export default List;
