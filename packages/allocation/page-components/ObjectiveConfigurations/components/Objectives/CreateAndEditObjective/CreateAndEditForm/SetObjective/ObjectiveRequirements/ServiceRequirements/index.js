import { Button } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';
import { IcMPlusInCircle } from '@cogoport/icons-react';

import getServiceRequirementControls from '../../../../../../../configurations/service-requirements-form-controls';

import Service from './Service';
import styles from './styles.module.css';

function ServiceRequirements(props) {
	const {
		name,
		control,
	} = props;

	const controls = getServiceRequirementControls();

	const { fields, append, remove } = useFieldArray({ control, name });

	const CHILD_EMPTY_VALUES = {};
	controls.forEach((item) => {
		CHILD_EMPTY_VALUES[item.name] = '';
	});

	return (
		<div className={styles.container}>
			{fields.map((field, index) => (
				<Service
					key={field.id}
					field={field}
					index={index}
					control={control}
					controls={controls}
					name={name}
					remove={remove}
				/>
			))}

			<Button
				type="button"
				themeType="tertiary"
				onClick={() => append(CHILD_EMPTY_VALUES)}
			>
				<IcMPlusInCircle style={{ marginRight: '4px' }} />
				Add Another
			</Button>
		</div>
	);
}

export default ServiceRequirements;
