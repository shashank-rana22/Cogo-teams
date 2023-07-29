import { Checkbox } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useEffect, useState, useMemo } from 'react';

import getElementController from '../../../../configs/getElementController';

import controls from './controls';
import permanent_controls from './controls_permanent';
import styles from './styles.module.css';

const CURRENT_ADDRESS_MAPPING = [
	'current_city', 'current_country', 'current_pincode', 'current_state', 'current_address'];

const CONTROL_SELECT_TYPE_ONE = 'fileUpload';
const CONTROL_SELECT_TYPE_TWO = 'textarea';

const removeTypeField = (controlItem) => {
	const { type, ...rest } = controlItem;
	return rest;
};

function AddressDetails({
	data:content,
	control, errors, setValue, getValues, watch,
}) {
	const { permanent_address, present_address } = content?.detail || {};

	const { city, country, pincode, state, address:presentAddress } = present_address || {};

	const {
		city: permanentCity,
		country: permanentCountry,
		pincode: permanentPincode,
		state: permanentState,
		address: permanentAddress,
	} = permanent_address || {};

	const controlsvalue = controls({ content });

	const permanentcontrols = permanent_controls({ content });

	const addressEqualityCheck = JSON.stringify(permanent_address) === JSON.stringify(present_address);

	const [isAddressChecked, setIsAddressChecked] = useState(addressEqualityCheck);

	const permanentValues = watch(['permanent_city', 'permanent_state', 'permanent_country',
		'permanent_pincode', 'permanent_address']);

	const presentValues = watch(['current_city', 'current_state', 'current_country',
		'current_pincode', 'current_address']);

	const equalityCheck = JSON.stringify(permanentValues) === JSON.stringify(presentValues)
		&& permanentValues?.[GLOBAL_CONSTANTS?.zeroth_index] !== undefined;

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
		setIsAddressChecked((prev) => !prev);
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

		if (isAddressChecked === false) {
			Object.keys(GETVALUES_MAPPING).map((element) => (
				setValue(element, GETVALUES_MAPPING[element])
			));
		} else {
			CURRENT_ADDRESS_MAPPING.map((element) => (
				setValue(element, '')
			));
		}
	};

	useEffect(() => {
		setIsAddressChecked(equalityCheck);
	}, [equalityCheck]);

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
											{...(type === CONTROL_SELECT_TYPE_ONE
												? removeTypeField(controlItem) : { ...controlItem })}
											control={control}
											key={controlName}
											className={type === CONTROL_SELECT_TYPE_TWO ? styles.box : null}
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
											{...(type === CONTROL_SELECT_TYPE_ONE
												? removeTypeField(controlItem) : { ...controlItem })}
											control={control}
											key={controlName}
											className={type === CONTROL_SELECT_TYPE_TWO ? styles.box : null}
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
				<Checkbox
					label="Current Address is same as Permanent Address"
					onChange={handleAddressChange}
					checked={isAddressChecked}
				/>
			</div>
		</div>
	);
}

export default AddressDetails;
