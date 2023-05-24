import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import getElementController from '../../../../configs/getElementController';
import useCreateEmployeeDocument from '../../../../hooks/useCreateEmployeeDocument';
import useGetEmployeeDetails from '../../../../hooks/useGetEmployeeDetails';

import controls from './controls';
import styles from './styles.module.css';

const removeTypeField = (controlItem) => {
	const { type, ...rest } = controlItem;
	return rest;
};

function Resume() {
	const { handleSubmit, control, formState: { errors } } = useForm();

	const component = 'resume';

	const { createEmployeeDocument } = useCreateEmployeeDocument({ component });

	const { data: info } = useGetEmployeeDetails({});

	const id = info?.detail?.id;

	const onSubmit = (values) => {
		const newDoc = [{
			document_type : 'resume',
			document_url  : values?.resume?.finalUrl || undefined,
			status        : 'active',
		}];

		createEmployeeDocument({ data: values, id, newDoc });
	};
	return (
		<div className={styles.whole_container}>
			<div className={styles.container}>
				{controls?.map((controlItem) => {
					const { type, label, name: controlName } = controlItem || {};
					const Element = getElementController(type);

					return (
						<div key={controlName} className={styles.control_container}>
							<div className={styles.label}>
								{label}
								<sup className={styles.sup}>*</sup>
							</div>

							<div className={styles.control}>
								<Element
									{...(type === 'fileUpload'
										? removeTypeField(controlItem) : { ...controlItem })}
									key={controlName}
									control={control}
									className={styles[`element_${controlName}`]}
								/>

								{errors[controlName]?.message
									? <div className={styles.error_msg}>{errors[controlName]?.message}</div> : null}
							</div>
						</div>
					);
				})}
			</div>
			<Button
				size="md"
				type="button"
				className={styles.button}
				onClick={
						handleSubmit(onSubmit)
					}
			>
				Save
			</Button>
		</div>
	);
}

export default Resume;
