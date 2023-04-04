import React from 'react';

import Field from './Field';
import styles from './styles.module.css';

function CardHeader({
	fields = [],
	showCode = false,
	sort = {},
	setSort = () => {},
}) {
	return (
		<div className={styles.container}>
			<div className={styles.row}>
				{fields?.map((field) => {
					if (field.show === false) {
						return null;
					}

					return (
						<Field
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
