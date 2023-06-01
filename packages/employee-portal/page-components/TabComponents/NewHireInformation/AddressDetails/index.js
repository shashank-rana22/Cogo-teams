import { Button, Checkbox } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useEffect, useState } from 'react';

import getElementController from '../../../../configs/getElementController';
import useGetEmployeeDetails from '../../../../hooks/useGetEmployeeDetails';
import useUpdateEmployeeDetails from '../../../../hooks/useUpdateEmployeeDetails';

import controls from './controls';
import permanent_controls from './controls_permanent';
import styles from './styles.module.css';

const removeTypeField = (controlItem) => {
	const { type, ...rest } = controlItem;
	return rest;
};

function AddressDetails({ data:content, getEmployeeDetails }) {
	const [address, setAddress] = useState(false);

	const { handleSubmit, control, formState: { errors }, setValue, getValues } = useForm();

	const { permanent_address, present_address } = content?.detail || {};

	const controlsvalue = controls({ content });

	const permanentcontrols = permanent_controls({ content });

	const { data: info } = useGetEmployeeDetails({});

	const id = info?.detail?.id;

	const { updateEmployeeDetails } = useUpdateEmployeeDetails({ id, getEmployeeDetails });

	const onSubmit = (values) => {
		updateEmployeeDetails({ data: values, formType: 'address_details' });
	};

	useEffect(() => {
		setValue('current_city', present_address?.city);
		setValue('current_country', present_address?.country);
		setValue('current_pincode', present_address?.pincode);
		setValue('current_state', present_address?.state);
		setValue('current_address', present_address?.address);
		setValue('permanent_city', permanent_address?.city);
		setValue('permanent_country', permanent_address?.country);
		setValue('permanent_pincode', permanent_address?.pincode);
		setValue('permanent_state', permanent_address?.state);
		setValue('permanent_address', permanent_address?.address);
	}, [present_address, permanent_address, setValue]);

	const handleAddressChange = () => {
		setAddress((prev) => !prev);
		const getControlvalues = getValues();

		if (address === false) {
			setValue('current_city', getControlvalues?.permanent_city);
			setValue('current_country', getControlvalues?.permanent_country);
			setValue('current_pincode', getControlvalues?.permanent_pincode);
			setValue('current_state', getControlvalues?.permanent_state);
			setValue('current_address', getControlvalues?.permanent_address);
			setValue('permanent_city', getControlvalues?.permanent_city);
			setValue('permanent_country', getControlvalues?.permanent_country);
			setValue('permanent_pincode', getControlvalues?.permanent_pincode);
			setValue('permanent_state', getControlvalues?.permanent_state);
			setValue('permanent_address', getControlvalues?.permanent_address);
		} else {
			setValue('current_city', present_address?.city);
			setValue('current_country', present_address?.country);
			setValue('current_pincode', present_address?.pincode);
			setValue('current_state', present_address?.state);
			setValue('current_address', present_address?.address);
		}
	};

	return (
		<div className={styles.whole_container}>
			<div className={styles.sub_navigation}>
				<div className={styles.first}>
					<div className={styles.address}>
						Permanent Address
					</div>
					<div className={styles.container}>
						{permanentcontrols?.map((controlItem) => {
							const { type, label, name: controlName } = controlItem || {};
							const Element = getElementController(type);

							return (
								<div key={controlName} className={styles.control_container}>
									<div className={styles.label}>
										{label}
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
											? (
												<div className={styles.error_msg}>
													{errors[controlName]?.message}
												</div>
											) : null}
									</div>
								</div>
							);
						})}
					</div>
				</div>

				<div className={styles.second}>
					<div className={styles.address}>Current Address </div>
					<div className={styles.container}>
						{controlsvalue?.map((controlItem) => {
							const { type, label, name: controlName } = controlItem || {};
							const Element = getElementController(type);

							return (
								<div key={controlName} className={styles.control_container}>
									<div className={styles.label}>
										{label}
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
											? (
												<div className={styles.error_msg}>
													{errors[controlName]?.message}

												</div>
											) : null}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>

			<div className={styles.check}>
				<Checkbox onChange={handleAddressChange} />
				Current Address is same as Permanent Address
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

export default AddressDetails;
