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

	const [permanentAdd, setPermanentAdd] = useState(permanent_address);
	const [currentAdd, setCurrentAdd] = useState(present_address);

	const controlsvalue = controls({ content });

	const permanentcontrols = permanent_controls({ content });

	const { data: info } = useGetEmployeeDetails({});

	const id = info?.detail?.id;

	const { updateEmployeeDetails } = useUpdateEmployeeDetails({ id, getEmployeeDetails });

	const onSubmit = (values) => {
		updateEmployeeDetails({ data: values, formType: 'address_details' });
	};

	useEffect(() => {
		setValue('current_city', currentAdd?.city);
		setValue('current_country', currentAdd?.country);
		setValue('current_pincode', currentAdd?.pincode);
		setValue('current_state', currentAdd?.state);
		setValue('current_address', currentAdd?.address);
		setValue('permanent_city', permanentAdd?.city);
		setValue('permanent_country', permanentAdd?.country);
		setValue('permanent_pincode', permanentAdd?.pincode);
		setValue('permanent_state', permanentAdd?.state);
		setValue('permanent_address', permanentAdd?.address);
	}, [currentAdd, permanentAdd, setValue]);

	const handleAddressChange = () => {
		setAddress((prev) => !prev);
		const getControlvalues = getValues();

		if (address === false) {
			setCurrentAdd({
				address : getControlvalues?.permanent_address,
				city    : getControlvalues?.permanent_city,
				pincode : getControlvalues?.permanent_pincode,
				state   : getControlvalues?.permanent_state,
				country : getControlvalues?.permanent_country,
			});
			setPermanentAdd({
				address : getControlvalues?.permanent_address,
				city    : getControlvalues?.permanent_city,
				pincode : getControlvalues?.permanent_pincode,
				state   : getControlvalues?.permanent_state,
				country : getControlvalues?.permanent_country,
			});
		} else {
			setCurrentAdd(present_address);
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
