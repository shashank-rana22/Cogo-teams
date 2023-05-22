import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useEffect } from 'react';

import getElementController from '../../../configs/getElementController';
import useGetEmployeeDetails from '../../../hooks/useGetEmployeeDetails';

import controls from './controls';
import styles from './styles.module.css';

const removeTypeField = (controlItem) => {
	const { type, ...rest } = controlItem;
	return rest;
};

function PersonalInformation({ id = '' }) {
	const {
		loading,
		data,
		getEmployeeDetails,
	} = useGetEmployeeDetails({ id });

	const { handleSubmit, control, formState: { errors }, setValue } = useForm();

	const controlsvalue = controls({ data });

	useEffect(() => {
		const mapping = {
			mobile_number: {
				number       : data?.detail?.mobile_number,
				country_code : data?.detail?.mobile_country_code || +91,
			},
		};

		controlsvalue.forEach((item) => {
			if (item?.name === 'mobile_number') {
				setValue(
					`${item.name}`,
					mapping[item.name]
					|| data?.detail?.[item.name],
				);
			} else {
				setValue(item.name, data?.detail?.[item?.name]);
			}
		});
	}, [controlsvalue, data?.detail, setValue]);

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
						handleSubmit()
					}
			>
				Save
			</Button>
		</div>
	);
}

export default PersonalInformation;
