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
	showAddButton = false,
	defaultValues = {},
	buttonText = 'Add',
	style = {},
	...rest
}) {
	const { fields = [], remove, append } = useFieldArray({ control, name });

	return (
		<div className={styles.main_container}>
			{fields.map((field, index) => (
				<EachField
					key={field.id}
					{...rest}
					controls={controls}
					control={control}
					index={index}
					error={error?.[index]}
					parentName={name}
					remove={remove}
					style={style}
				/>
			))}
			{showAddButton ? (
				<Button
					size="md"
					themeType="secondary"
					className={styles.button_container}
					onClick={() => append(defaultValues)}
				>
					{buttonText}
				</Button>
			) : null}
		</div>
	);
}

export default FieldArrayController;
