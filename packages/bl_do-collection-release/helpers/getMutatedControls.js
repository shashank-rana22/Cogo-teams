const statusMapping = {
	surrendered : 'surrender_pending',
	released    : 'released',
	collected   : 'release_pending',
};
const getMutatedControls = ({ item, stateProps, controls = [] }) => {
	const { bill_of_ladings, delivery_orders	} = item || {};
	const blOptions = [];
	const mutatedControls = [];

	let docs;

	if (stateProps.activeTab === 'do') {
		docs = delivery_orders || [];
	} else {
		docs = bill_of_ladings || [];
	}

	if (
		['collection_pending', 'surrendered', 'released', 'collected'].includes(
			stateProps.inner_tab,
		)
	) {
		const availableDocs = (docs || []).filter((ele) => {
			if (stateProps.inner_tab === 'collection_pending') {
				return ele.collection_mode === null;
			}

			return ele.status === statusMapping[stateProps.inner_tab];
		});

		availableDocs.forEach((doc) => {
			blOptions.push({
				label : doc?.bl_number,
				value : doc?.id,
				name  : doc?.bl_number,
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
