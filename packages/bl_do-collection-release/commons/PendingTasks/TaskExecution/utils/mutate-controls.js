// if require control mutation takes place here
const mutateControls = (
	controls,
) => {
	let finalControls = [];

	(controls || []).forEach((control) => {
		const newControl = control;

		finalControls = [...finalControls, newControl];
	});

	return finalControls;
};

export default mutateControls;
