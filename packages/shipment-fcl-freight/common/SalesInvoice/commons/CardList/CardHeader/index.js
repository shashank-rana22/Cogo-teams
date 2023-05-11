import React from 'react';

import CargoDetails from '../../../../CargoDetails';

import Field from './Field';
import styles from './styles.module.css';

function CardHeader({ fields = [], showCode = false, detail = {} }) {
	return (
		<div className={styles.container}>
			<div className={styles.cargo}>
				<CargoDetails primary_service={detail || {}} />
			</div>

			<div className={styles.row}>
				{fields?.map((field) => {
					if (field.show === false) {
						return null;
					}

					return <Field field={field} showCode={showCode} />;
				})}
			</div>
		</div>
	);
}

export default CardHeader;
