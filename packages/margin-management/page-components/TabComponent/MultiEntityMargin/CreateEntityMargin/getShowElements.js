import entityMarginControls from './controls';

const getShowElements = ({ formValues }) => {
	const SHOW_ELEMENTS = {};
	entityMarginControls.forEach((control) => {
		SHOW_ELEMENTS[control?.name] = true;

		if (control.name === 'margin_slabs' && formValues?.margin_slabs) {
			SHOW_ELEMENTS[control.name] = formValues.margin_slabs.map((itemValue) => {
				if (itemValue?.type === 'percentage') {
					return {
						type      : true,
						value     : true,
						currency  : true,
						min_value : true,
						max_value : true,
					};
				}
				return {
					type      : true,
					value     : true,
					currency  : true,
					min_value : false,
					max_value : false,
				};
			});
		}
	});

	return SHOW_ELEMENTS;
};

export default getShowElements;
