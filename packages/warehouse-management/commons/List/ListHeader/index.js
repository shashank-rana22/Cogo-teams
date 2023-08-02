import { cl } from '@cogoport/components';

import styles from '../styles.module.css';

const SPAN_ONE = 1;

function ListHeader({
	fields = {},
}) {
	return (
		<header className={styles.header}>
			{fields.map((field) => (
				<div
					key={field.id}
					className={cl`${styles.col} ${field.className || ''}`}
					style={{ '--span': field.span || SPAN_ONE }}
				>
					{ field.label }
				</div>
			))}
		</header>
	);
}

export default ListHeader;
