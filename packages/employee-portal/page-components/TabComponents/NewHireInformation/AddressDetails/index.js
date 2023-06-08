import { Button, Checkbox } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useEffect, useState, useMemo } from 'react';

import getElementController from '../../../../configs/getElementController';
import useUpdateEmployeeDetails from '../../../../hooks/useUpdateEmployeeDetails';

import controls from './controls';
import permanent_controls from './controls_permanent';
import styles from './styles.module.css';

const CURRENT_ADDRESS_MAPPING = [
	'current_city', 'current_country', 'current_pincode', 'current_state', 'current_address'];

const removeTypeField = (controlItem) => {
	const { type, ...rest } = controlItem;
	return rest;
};

function AddressDetails({ data:content, getEmployeeDetails }) {
	const [address, setAddress] = useState(false);

	const { handleSubmit, control, formState: { errors }, setValue, getValues } = useForm();

	const { permanent_address, present_address, id } = content?.detail || {};

	const { city, country, pincode, state, address:presentAddress } = present_address || {};

	const {
		city:permanentCity,
		country:permanentCountry,
		pincode:permanentPincode,
		state:permanentState,
		address:permanentAddress,
	} = permanent_address || {};

	const controlsvalue = controls({ content });

	const permanentcontrols = permanent_controls({ content });

	const { updateEmployeeDetails, loading } = useUpdateEmployeeDetails({ id, getEmployeeDetails });

	const onSubmit = (values) => {
		updateEmployeeDetails({ data: values, formType: 'address_details' });
	};

	const ADDRESS_MAPPING = useMemo(() => ({
		current_city      : city,
		current_country   : country,
		current_pincode   : pincode,
		current_state     : state,
		current_address   : presentAddress,
		permanent_city    : permanentCity,
		permanent_country : permanentCountry,
		permanent_pincode : permanentPincode,
		permanent_state   : permanentState,
		permanent_address : permanentAddress,
	}), [city,
		country,
		permanentAddress,
		permanentCity, permanentCountry, permanentPincode, permanentState, pincode, presentAddress, state]);

	useEffect(() => {
		Object.keys(ADDRESS_MAPPING).map((element) => (
			setValue(element, ADDRESS_MAPPING[element])
		));
	}, [ADDRESS_MAPPING, setValue]);

	const handleAddressChange = () => {
		setAddress((prev) => !prev);
		const getControlvalues = getValues();

		const {
			permanent_city,
			permanent_country, permanent_pincode, permanent_state, permanent_address:getValuePermanentAdd,
		}	= getControlvalues || {};

		const GETVALUES_MAPPING = {
			current_city      : permanent_city,
			current_country   : permanent_country,
			current_pincode   : permanent_pincode,
			current_state     : permanent_state,
			current_address   : getValuePermanentAdd,
			permanent_city,
			permanent_country,
			permanent_pincode,
			permanent_state,
			permanent_address : getValuePermanentAdd,

		};

		if (address === false) {
			Object.keys(GETVALUES_MAPPING).map((element) => (
				setValue(element, GETVALUES_MAPPING[element])
			));
		} else {
			CURRENT_ADDRESS_MAPPING.map((element) => (
				setValue(element, ADDRESS_MAPPING[element])
			));
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

export default AddressDetails;
