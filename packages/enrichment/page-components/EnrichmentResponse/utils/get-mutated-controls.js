import { COUNTRY_CODE_TO_NUMBER_MAPPING, MOBILE_CONTROLS } from '../configurations/response-keys-mapping';

const ADDRESS_KEYS = ['country_id', 'state_id', 'city_id', 'pincode', 'address', 'tax_number'];

const KEYS_MAPPING = {
	country_id : 'country',
	state_id   : 'state',
	city_id    : 'city',
	pincode    : 'pincode',
};

const getMutatedControls = (props) => {
	const {
		controls,
		setResponseData = () => {},
		activeTab = '',
		detailsForm = {},
		setValue = () => {},
	} = props;

	if (activeTab === 'user') {
		const mutatedControls = (controls || []).map((mutatedControl) => {
			const newControl = { ...mutatedControl };
			const controlName = newControl?.name;
			const initialData = detailsForm?.initialData;

			if (!MOBILE_CONTROLS.includes(controlName)) {
				newControl.value = initialData?.[controlName];
			} else {
				newControl.value = {
					number       : initialData?.[controlName],
					country_code : initialData?.[COUNTRY_CODE_TO_NUMBER_MAPPING[controlName]],
				};
			}

			return newControl;
		});

		return mutatedControls;
	}

	const mutatedControls = (controls || []).map((mutatedControl) => {
		let newControl = { ...mutatedControl };
		const controlName = newControl?.name;
		const initialData = detailsForm?.initialData;

		if (ADDRESS_KEYS.includes(controlName)) {
			newControl = {
				...newControl,
				value    : initialData?.[controlName],
				onChange : (_, obj) => {
					setResponseData((prev) => ({
						...prev,
						[KEYS_MAPPING[controlName]]: obj,
					}));

					if (controlName === 'country_id') {
						ADDRESS_KEYS.forEach((key) => (
							setValue(key, '')
						));
					}
				},
			};
		}

		return newControl;
	});

	return mutatedControls;
};

export default getMutatedControls;
