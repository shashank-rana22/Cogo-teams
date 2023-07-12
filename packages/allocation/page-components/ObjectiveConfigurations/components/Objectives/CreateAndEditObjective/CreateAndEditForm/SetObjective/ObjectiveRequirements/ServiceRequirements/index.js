import { Button } from '@cogoport/components';
import { useFieldArray } from '@cogoport/forms';
import { IcMPlusInCircle } from '@cogoport/icons-react';

import Service from './Service';
import styles from './styles.module.css';

function ServiceRequirements(props) {
	const {
		name,
		control,
		watch,
	} = props;

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
				/>
			))}

			<Button
				type="button"
				themeType="tertiary"
				onClick={() => append({})}
			>
				<IcMPlusInCircle style={{ marginRight: '4px' }} />
				Add Another
			</Button>
		</div>
	);
}

export default ServiceRequirements;
