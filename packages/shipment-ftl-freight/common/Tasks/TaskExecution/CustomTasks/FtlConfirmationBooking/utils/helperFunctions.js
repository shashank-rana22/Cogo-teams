const DEFAULT_VALUE = 0;

export const generateDefaultValues = ({ values }) => {
	const INITIAL_STATE = {};
	const FIELD_VALUE = {};
	const DEFAULT_VALUES = {};
	values.forEach((control) => {
		if (control.type === 'edit_service_charges') {
			DEFAULT_VALUES[control.name] = control.value.map((value) => {
				control.controls.forEach((subControl) => {
					FIELD_VALUE[subControl.name] = value[subControl.name] || INITIAL_STATE;
				});

				return FIELD_VALUE;
			});
		}
	});

	return DEFAULT_VALUES;
};

export const prepareFormValues = (formValues) => {
	const allFormValues = { ...formValues };
	(Object.keys(formValues) || []).forEach((key) => {
		if (key && formValues[key]) {
			allFormValues[key] = (allFormValues[key] || []).map((value) => ({
				...value,
				total: (value.price || DEFAULT_VALUE) * (value.quantity || DEFAULT_VALUE),
			}));
		}
	});

	return allFormValues;
};

export const handleTruckServices = (allTruckDetails) => {
	const trucks = Object.entries(allTruckDetails)?.reduce((acc, [key, values]) => {
		Object.keys(values || []).forEach((truckItem) => {
			const eachTruck = allTruckDetails[key][truckItem] || [];
			eachTruck.forEach((truck) => acc.push(truck));
		});

		return acc;
	}, []);
	return trucks;
};

export const handleServiceIdForTruck = (allTrucks, services) => {
	const tempTrucks = [...(allTrucks || [])];
	services.forEach((serviceItem) => {
		tempTrucks.some((tempTruck) => {
			const temp = tempTruck;
			if (tempTruck.truck_type === serviceItem.truck_type && !tempTruck.isSelect) {
				temp.service_id = serviceItem.id;
				temp.isSelect = true;
				return true;
			}
			return false;
		});
	});

	return tempTrucks;
};

export const checkForAth = (splitAmount = [], item = {}) => {
	const splitAdvanceAmountTotal = splitAmount.reduce(
		(acc, split) => acc + +(split?.amount || DEFAULT_VALUE),
		DEFAULT_VALUE,
	);

	if (splitAdvanceAmountTotal === DEFAULT_VALUE) {
		return { checked: true, err: '' };
	}

	if (item?.updated_advance_amount) {
		if (splitAdvanceAmountTotal === +(item?.updated_advance_amount || DEFAULT_VALUE)) {
			return { checked: true, err: '' };
		}
		return {
			checked : false,
			err     : `Split Advance amount is not equal entered Advance amount (${item?.updated_advance_amount})`,
		};
	}

	if (item?.advanced_amount) {
		if (splitAdvanceAmountTotal === +(item?.advanced_amount || DEFAULT_VALUE)) {
			return { checked: true, err: '' };
		}
		return {
			checked : false,
			err     : `Split Advance amount is not equal Advance amount (${item?.advanced_amount})`,
		};
	}

	return {
		checked : false,
		err     : 'No Advanced amount exist!! Please Enter Advanced Amount',
	};
};
