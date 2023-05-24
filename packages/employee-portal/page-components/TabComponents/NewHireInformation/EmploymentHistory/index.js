import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useEffect } from 'react';

import FieldArray from '../../../../commons/FieldArray';
import useGetEmployeeDetails from '../../../../hooks/useGetEmployeeDetails';
import useUpdateEmployeeDetails from '../../../../hooks/useUpdateEmployeeDetails';

import controls from './controls';
import styles from './styles.module.css';

function EmploymentHistory({ data: content }) {
	const { handleSubmit, control, setValue } = useForm();

	const { data: info } = useGetEmployeeDetails({});

	const id = info?.detail?.id;

	const { updateEmployeeDetails } = useUpdateEmployeeDetails({ id });

	const onSubmit = (values) => {
		console.log(values, 'eduqual');
		updateEmployeeDetails({ data: values, formType: 'employment_history' });
	};

	const controlsvalue = controls({ content });

	useEffect(() => {
		controlsvalue.forEach((item) => {
			setValue(item.name, content?.detail?.[item?.name]);
		});
	}, [controlsvalue, content?.detail, setValue]);

	return (
		<>
			<div className={styles.container}>
				{controlsvalue?.map((controlItem) => {
					const { type, name: controlName } = controlItem || {};

					if (type === 'fieldArray') {
						return (
							<FieldArray
								Array
								name="employment_history"
								control={control}
								controls={controlItem?.controls}
								key={controlName}
							/>
						);
					}
					return (
						<div key={controlItem}>
							EmploymentHistory
						</div>
					);
				})}
			</div>

			<Button
				size="md"
				type="button"
				className={styles.button}
				onClick={handleSubmit(onSubmit)}
			>
				Save
			</Button>
		</>
	);
}

export default EmploymentHistory;
