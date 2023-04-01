function createPOCOptions({
	pocs = [],
}) {
	const pocOptions = (pocs || []).map((poc) => {
		const obj = {
			label : poc?.name,
			value : poc?.id,
		};

		return obj;
	});

	return {
		pocOptions,
	};
}

export default createPOCOptions;
