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

	const { handleSubmit, control, formState: { errors }, setValue, watch } = useForm();

	const { permanent_address,present_address } = content?.detail || {};

	const controlsvalue = controls({ content });

	const permanentcontrols = permanent_controls({ content });

	const { data: info } = useGetEmployeeDetails({});

	const id = info?.detail?.id;

	const permanent_address_fields = (permanentcontrols || []).map((item) => item?.name);

	const permanent_address_values = watch('permanent_address_fields');

	const addressFields = (controlsvalue || []).map((item) => item?.name);

	console.log('addressFields',addressFields);

	const { updateEmployeeDetails } = useUpdateEmployeeDetails({ id, getEmployeeDetails });

	const onSubmit = (values) => {
		updateEmployeeDetails({ data: values, formType: 'address_details' });
	};

	// useEffect(() => {
	// 	if (address) {
	// 		(addressFields || []).forEach((item, index) => {
	// 			setValue(item, permanent_address_values?.[index]);
	// 		});
	// 	} else {
	// 		(addressFields || []).forEach((item) => {
	// 			setValue(item, '');
	// 		});
	// 	}
	// }, [address]);

	const setAddressValue = (address) => {
		if (address) {
			(addressFields || []).forEach((item, index) => {
				setValue(item, permanent_address_values?.[index]);
			});
		} else {
			(addressFields || []).forEach((item) => {
				setValue(item, '');
			});
		}
	}

	const mapping = {
		permanent_address : permanent_address?.address || '',
		permanent_city    : permanent_address?.city || '',
		permanent_pincode : permanent_address?.pincode || '',
		permanent_state   : permanent_address?.state || '',
		permanent_country : permanent_address?.country || '',
		current_address   : present_address?.address || '',
		current_city      : present_address?.city || '',
		current_pincode   : present_address?.pincode || '',
		current_state     : present_address?.state || '',
		current_country   : present_address?.country || '',
	};

	const handleAddressChange = () => {
		console.log('hi')
		setAddress((prev) => !prev); 
		setAddressValue(address);
	}


	useEffect(() => {
		[...controlsvalue, ...permanentcontrols].forEach((item) => {
			setValue(`${item.name}`, mapping[item.name]);
		});
	}, []);

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
