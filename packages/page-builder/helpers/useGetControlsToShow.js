const useGetControlsToShow = (controlItems, values) => {
	const showElements = {};

	controlItems.forEach((cntrl) => {
		if (cntrl.name === 'controls') {
			if (showElements.controls === undefined) {
				showElements.controls = Array.from(
					Array(values?.controls?.length),
					() => ({}),
				);
			}

			if (values.controls) {
				values?.controls?.forEach((item, i) => {
					if (item.type === 'select') {
						showElements.controls[i].dynamic_data_endpoint = false;
						showElements.controls[i].manual_options = false;
						showElements.controls[i].options_type = true;
						showElements.controls[i].options = false;
						if (item.options_type === 'dynamic_data') {
							showElements.controls[i].dynamic_data_endpoint = true;
							showElements.controls[i].manual_options = false;
							showElements.controls[i].options = false;
						} else if (item.options_type === 'manual_data') {
							showElements.controls[i].manual_options = true;
							showElements.controls[i].dynamic_data_endpoint = false;
							showElements.controls[i].options = false;
						} else {
							showElements.controls[i].manual_options = false;
							showElements.controls[i].dynamic_data_endpoint = false;
							showElements.controls[i].options = false;
						}
					} else if (['radioGroup', 'chips'].includes(item.type)) {
						showElements.controls[i].dynamic_data_endpoint = false;
						showElements.controls[i].manual_options = false;
						showElements.controls[i].options_type = false;
						showElements.controls[i].options = true;
					} else {
						showElements.controls[i].dynamic_data_endpoint = false;
						showElements.controls[i].manual_options = false;
						showElements.controls[i].options_type = false;
						showElements.controls[i].options = false;
					}
				});
			}
		} else {
			showElements[cntrl.name] = true;
		}
	});
	return showElements;
};

export default useGetControlsToShow;
