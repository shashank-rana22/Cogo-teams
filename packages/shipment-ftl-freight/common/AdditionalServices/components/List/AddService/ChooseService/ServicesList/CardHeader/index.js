import { useMemo } from 'react';

import Field from './Field';
import styles from './styles.module.css';

function CardHeader({ fields = {} }) {
	const keysForFields = useMemo(
		() => Array(fields.length).fill(null).map(() => Math.random()),
		[fields.length],
	);
	return (
		<div className={styles.container}>
			{fields.map((field, index) => <Field field={field} key={keysForFields[index]} />)}
		</div>
	);
}

export default CardHeader;
