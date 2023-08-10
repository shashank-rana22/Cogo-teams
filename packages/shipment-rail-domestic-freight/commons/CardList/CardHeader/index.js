import React, { useMemo } from 'react';

import Field from './Field';
import styles from './styles.module.css';

function CardHeader({
	fields = [],
	showCode = false,
	sort = {},
	setSort = () => {},
}) {
	const keys = useMemo(() => Array(fields?.length).fill(null).map(() => Math.random()), [fields?.length]);

	return (
		<div className={styles.container}>
			<div className={styles.row}>
				{fields?.map((field, index) => {
					if (field.show === false) {
						return null;
					}

					return (
						<Field
							key={keys[index]}
							field={field}
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
