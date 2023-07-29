import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useEffect } from 'react';

import getElementController from '../../../../configs/getElementController';
import useCreateEmployeeDocument from '../../../hooks/useCreateEmployeeDocument';

import controls from './controls';
import styles from './styles.module.css';

const removeTypeField = (controlItem) => {
	const { type, ...rest } = controlItem;
	return rest;
};

function Resume({ getEmployeeDetails, data: info }) {
	const { handleSubmit, control, formState: { errors }, setValue } = useForm();

	const { loading, createEmployeeDocument } = useCreateEmployeeDocument({ getEmployeeDetails });

	const id = info?.detail?.id;

	const { documents = [] } = info || {};
	const resumeDoc = (documents || []).find((element) => (element?.document_type === 'resume'));

	useEffect(() => {
		setValue('resume', resumeDoc?.document_url);
	}, [resumeDoc?.document_url, setValue]);

	const onSubmit = (values) => {
		const newDoc = [{
			document_type : 'resume',
			document_url  : values?.resume || undefined,
			status        : 'active',
		}];
		createEmployeeDocument({ data: values, id, newDoc });
	};

	return (
		<div className={styles.whole_container}>
			<div className={styles.introductory_text}>
				Please upload your resume here !
			</div>

			<div className={styles.container}>
				{controls?.map((controlItem) => {
					const { type, label, name: controlName } = controlItem || {};
					if (!type) { return null; }
					const Element = getElementController(type);
					if (!Element) { return null; }

					return (
						<div key={controlName} className={styles.control_container}>
							<div className={styles.label}>
								{label}
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

			<div className={styles.button}>
				<Button
					size="md"
					type="button"
					loading={loading}
					onClick={
						handleSubmit(onSubmit)
					}
				>
					Save
				</Button>
			</div>

		</div>
	);
}

export default Resume;
