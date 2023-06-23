import { Button } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';

import EachField from './EachField';
import styles from './styles.module.css';

function FieldArrayController({ control, name, controls, error = [], defaultValues, showButton = false }) {
	const { fields = [], append, remove } = useFieldArray({ control, name });
	return (
		<div className={styles.main_container}>
			{fields.map((field, index) => (
				<EachField
					key={field.id}
					controls={controls}
					control={control}
					index={index}
					error={error}
					parentName={name}
					remove={remove}
					showButton={showButton}
				/>
			))}

			{showButton && (
				<Button
					size="sm"
					themeType="tertiary"
					onClick={() => append(defaultValues)}
				>
					+
				</Button>
			)}

		</div>
	);
}

export default FieldArrayController;
