import { useForm } from '@cogoport/forms';
import isEmpty from '@cogoport/utils';
import { useState } from 'react';

/**
 * Provides headless filters functionality to all type of usecases
 * @param {object} props
 * @param {Array} [props.controls=[]]
 * @param {object} [props.initialFilters={}]
 */

const useGetFilters = ({ controls = [], initialFilters = {} }) => {
	const [displayNames, setDisplayNames] = useState({});
	const newControls = controls.map((control) => ({
		...control,
		value        : initialFilters?.[control.name],
		handleChange : (obj) => {
			if (control.type === 'select' || control.type === 'location-select') {
				let displaValue = null;

				if (Array.isArray(obj)) {
					displaValue = obj.map(
						(newObj) => newObj?.[control.labelKey] || newObj?.label || newObj?.name,
					);
				} else {
					displaValue = obj?.[control.labelKey] || obj?.label || obj?.name;
				}

				setDisplayNames({
					...displayNames,
					[control.name]: displaValue,
				});

				if (typeof control.handleChange === 'function') {
					control.handleChange(obj);
				}
			}
		},
	}));
	const { fields, reset, getValues, setValue, watch, trigger, setValues } =		useForm(newControls);

	const serviceExtraDetails = ['container_size', 'commodity', 'container_type'];

	const [filters, setFilters] = useState(() => {
		const values = {};
		controls.forEach((control) => {
			const { name } = control;
			const value = initialFilters[name];

			if (value) {
				values[name] = value;
			}
		});

		return values;
	});

	const applyFilters = () => {
		const data = getValues();
		const values = {};
		newControls.forEach((control) => {
			if (!isEmpty(data?.[control?.name]) || data?.[control?.name] === 0) {
				if (serviceExtraDetails.includes(control.name) && data?.search_type) {
					values[data?.search_type] = {
						...(values?.[data?.search_type] || {}),
						[control?.name]: data?.[control?.name],
					};
				} else {
					values[control.name] = data?.[control?.name];
				}
			}
		});
		setFilters(values);
	};

	const resetFilters = (names) => {
		if (Object.keys(names || {}).length > 0) {
			Object.keys(names || {}).forEach((key) => {
				setValue(key, names[key]);
			});
			let newDisplayNames = {};
			const new_display_names = { ...displayNames, ...names };
			Object.keys(new_display_names).forEach((key) => {
				if (new_display_names[key]) {
					newDisplayNames = {
						...newDisplayNames,
						[key]: new_display_names[key],
					};
				}
			});
			setDisplayNames({ ...newDisplayNames });
			applyFilters();
		} else {
			reset();
			setDisplayNames({});
			setFilters({});
		}
	};

	return {
		fields,
		applyFilters,
		reset        : resetFilters,
		filters,
		displayNames : { ...filters, ...displayNames },
		watch,
		trigger,
		setValue,
		getValues,
		setValues,
	};
};
export default useGetFilters;
