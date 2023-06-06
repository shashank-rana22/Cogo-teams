import { useMemo } from 'react';

import Field from './Field';
import styles from './styles.module.css';

function CardHeader({
	fields = [],
	showCode = false,
	sort = {},
	setSort = () => {},
}) {
	const keysForFields = useMemo(
		() => Array(fields.length).fill(null).map(() => Math.random()),
		[fields.length],
	);
	return (
		<div className={styles.container}>
			<div className={styles.row}>
				{fields?.map((field, index) => {
					if (field.show === false) {
						return null;
					}

					return (
						<Field
							field={field}
							key={keysForFields[index]}
							showCode={showCode}
							sort={sort}
							setSort={setSort}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default CardHeader;
