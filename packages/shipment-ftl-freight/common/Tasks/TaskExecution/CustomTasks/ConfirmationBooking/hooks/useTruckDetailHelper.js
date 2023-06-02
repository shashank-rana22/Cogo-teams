import { useState, useEffect } from 'react';

const useTruckDetailHelper = ({
	finalControls = {},
	watch = () => {},
	setValue = () => {},
	formValues = {},
}) => {
	const [driverObj, setDriverObj] = useState();
	const [fieldIndex, setFieldIndex] = useState(0);

	const newControls = finalControls;

	useEffect(() => {
		const subscription = watch((value, { name }) => {
			const changedName = name?.split('.')?.[2];
			const changedIndex = name?.split('.')?.[1];
			if (
				changedName === 'contact_number'
				&& value?.truck_detail[changedIndex]?.contact_number
			) {
				setFieldIndex(changedIndex);
			}
		});
		return () => subscription.unsubscribe();
	}, [watch]);

	useEffect(() => {
		if (driverObj) {
			setValue(
				`truck_detail.${fieldIndex}.driver_name`,
				driverObj?.name || formValues?.truck_detail[fieldIndex]?.driver_name,
			);
		}
	}, [driverObj, fieldIndex, setValue, formValues]);

	newControls.truck_detail.controls.forEach((item) => {
		const newItem = item;
		if (newItem.name === 'contact_number') {
			newItem.handleChange = (obj) => {
				setDriverObj(obj);
			};
		}
	});

	return {
		newControls,
	};
};

export default useTruckDetailHelper;
