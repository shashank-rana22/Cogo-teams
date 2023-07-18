import { Button } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';
import { IcMPlusInCircle } from '@cogoport/icons-react';
import { useState } from 'react';

import Service from './Service';
import SetAndOrConditionModal from './SetAndOrConditionModal';
import styles from './styles.module.css';

const MIN_FIELD_LENGTH = 1;

function ServiceRequirements(props) {
	const {
		name,
		control,
		watch,
		resetField,
		formValues,
		setFormValues,
		disabled,
	} = props;

	const [showAddAnotherConditionModal, setShowAnotherConditionModal] = useState(false);

	const { fields, append, remove } = useFieldArray({ control, name });

	return (
		<div className={styles.container}>
			{fields.map((field, index) => (
				<Service
					key={field.id}
					index={index}
					control={control}
					name={name}
					remove={remove}
					watch={watch}
					resetField={resetField}
					serviceRequirementOperator={formValues.objectiveRequirements?.service_requirement_operator}
					disabled={disabled}
				/>
			))}

			<Button
				type="button"
				themeType="tertiary"
				disabled={disabled}
				onClick={() => {
					if (fields?.length === MIN_FIELD_LENGTH) {
						return setShowAnotherConditionModal(true);
					}

					return append({});
				}}
			>
				<IcMPlusInCircle style={{ marginRight: '4px' }} />
				Add Another
			</Button>

			{showAddAnotherConditionModal && (
				<SetAndOrConditionModal
					showAddAnotherConditionModal={showAddAnotherConditionModal}
					setShowAnotherConditionModal={setShowAnotherConditionModal}
					setFormValues={setFormValues}
					append={append}
				/>
			)}
		</div>
	);
}

export default ServiceRequirements;
