import { Button } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';

/* eslint-disable import/no-cycle */
import EachField from './EachField';
import styles from './styles.module.css';

function FieldArrayController({
	control = {},
	name = '',
	controls = [],
	error = [],
	append_empty_values = {},
	showAddButton = true,
	buttonText = 'Add',
	...rest
}) {
	const { fields = [], append, remove } = useFieldArray({ control, name });

	return (
		<div className={styles.outer_container}>
			{fields.map((field, index) => (
				<EachField
					{...rest}
					key={field.id}
					controls={controls}
					control={control}
					index={index}
					error={error?.[index]}
					parentName={name}
					remove={remove}
					field={field}
				/>
			))}
			{!showAddButton ? (
				null
			) : (
				<Button
					size="md"
					themeType="secondary"
					className={styles.button_container}
					onClick={() => append(append_empty_values)}
				>
					{buttonText}
				</Button>
			)}
		</div>
	);
}

export default FieldArrayController;
