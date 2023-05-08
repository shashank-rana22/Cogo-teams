const statusMapping = {
	surrendered : 'surrender_pending',
	released    : 'released',
	collected   : 'release_pending',
};
const getMutatedControls = ({ item, activeTab, controls = [] }) => {
	const { export_bl_details, import_bl_details, do_details } = item || {};
	const blOptions = [];
	const mutatedControls = [];

	let docs;

	if (
		[
			'knockoff_pending',
			'collection_pending',
			'under_collection',
			'collected',
		].includes(activeTab)
		&& item?.trade_type === 'import'
	) {
		docs = import_bl_details;
	} else {
		docs = item?.trade_type === 'export' ? export_bl_details : do_details;
	}

	if (
		['collection_pending', 'surrendered', 'released', 'collected'].includes(
			activeTab,
		)
	) {
		const availableDocs = (docs || []).filter((ele) => {
			if (activeTab === 'collection_pending') {
				return ele.collection_mode === null;
			}

			return ele.status === statusMapping[activeTab];
		});

		availableDocs.forEach((doc) => {
			blOptions.push({
				label : doc?.bl_number,
				value : doc?.id,
			});
		});

		controls.forEach((ctrl) => {
			const newObj = { ...ctrl };
			if (ctrl.name === 'ids') {
				newObj.options = [...ctrl.options, ...blOptions];
			}
			mutatedControls.push(newObj);
		});
	} else {
		mutatedControls.push(...controls);
	}
	return {
		mutatedControls,
	};
};

export default getMutatedControls;
