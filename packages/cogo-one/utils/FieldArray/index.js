/* eslint-disable import/no-cycle */
import { useFieldArray } from '@cogoport/forms';

import EachField from './EachField';
import styles from './styles.module.css';

function FieldArrayController({ control, name, controls, error = [] }) {
	const { fields = [] } = useFieldArray({ control, name });

	return (
		<div className={styles.main_container}>
			{fields.map((field, index) => (
				<EachField
					key={field.id}
					controls={controls}
					control={control}
					index={index}
					error={error?.[index]}
					parentName={name}
				/>
			))}
		</div>
	);
}

export default FieldArrayController;
