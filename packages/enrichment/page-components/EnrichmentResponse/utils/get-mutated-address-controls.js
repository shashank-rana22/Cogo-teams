const REGION_CONTROLS = ['country', 'state'];

const getMutatedControls = ({ controls, setResponseData = () => {}, activeTab = '' }) => {
	if (activeTab === 'user') {
		return controls;
	}

	const mutatedControls = (controls || []).map((mutatedControl) => {
		let newControl = { ...mutatedControl };

		if (REGION_CONTROLS.includes(newControl.name)) {
			newControl = {
				...newControl,
				onChange: (val, obj) => {
					setResponseData((prev) => ({
						...prev,
						[newControl.name === 'country' ? 'country_id' : 'region_id']: obj?.id,
					}));
				},
			};
		}

		return newControl;
	});

	return mutatedControls;
};

export default getMutatedControls;
