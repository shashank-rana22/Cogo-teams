import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useEffect } from 'react';

import getElementController from '../../../../configs/getElementController';
import useCreateEmployeeDetails from '../../../../hooks/useCreateEmployeeDetails';
import useGetEmployeeDetails from '../../../../hooks/useGetEmployeeDetails';

import controls from './controls';
import styles from './styles.module.css';

const removeTypeField = (controlItem) => {
	const { type, ...rest } = controlItem;
	return rest;
};

function PersonalInformation({ data:content }) {
	const { handleSubmit, control, formState: { errors }, setValue } = useForm();

	const controlsvalue = controls({ content });

	const { createEmployeeDetails } = useCreateEmployeeDetails();

	const { data: info } = useGetEmployeeDetails({});

	const id = info?.detail?.id;

	const onSubmit = (values) => {
		createEmployeeDetails({ data: values, id });
	};

	useEffect(() => {
		const mapping = {
			mobile_number: {
				number       : content?.detail?.mobile_number,
				country_code : content?.detail?.mobile_country_code || +91,
			},
		};

		controlsvalue.forEach((item) => {
			if (item?.name === 'mobile_number') {
				setValue(
					`${item.name}`,
					mapping[item.name]
					|| content?.detail?.[item.name],
				);
			} else {
				setValue(item.name, content?.detail?.[item?.name]);
			}
		});
	}, [controlsvalue, content?.detail, setValue]);

	return (
		<div className={styles.whole_container}>
			<div className={styles.container}>
				{controlsvalue?.map((controlItem) => {
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
									control={control}
									key={controlName}
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

export default PersonalInformation;
