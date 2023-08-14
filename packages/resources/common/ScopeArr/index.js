import { Button } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';
import { IcMPlus } from '@cogoport/icons-react';

import Child from './Child';
import styles from './styles.module.css';

const FIRST_INDEX = 1;

function ScopeArr({
	control, errors, watch, register, setValue = () => {},
	clearErrors = () => {}, source = 'create_resource', selectedApi = {}, getValues = () => {},
}) {
	const fileldControls = useFieldArray({
		control,
		name: 'scopes',
	});

	const { fields, append, remove } = fileldControls;

	return (
		<form className={styles.scope_section}>
			<div className={styles.section_header}>Scopes</div>
			{fields.map((item, index) => (
				<Child
					errors={errors}
					index={index}
					key={item.id}
					item={item}
					remove={remove}
					control={control}
					watch={watch}
					styles={styles}
					register={register}
					disableRemove={fields.length === FIRST_INDEX}
					setValue={setValue}
					clearErrors={clearErrors}
					selectedApi={selectedApi}
					source={source}
					getValues={getValues}
				/>
			))}

			<div className={styles.add_another}>
				<Button onClick={() => append({ type: '', through_criteria: [] })}>
					<IcMPlus style={{ marginRight: '4px' }} />
					Add Another
				</Button>
			</div>
		</form>
	);
}

export default ScopeArr;
