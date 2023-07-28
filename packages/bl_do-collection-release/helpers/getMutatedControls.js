const STATUS_MAPPING = {
	surrendered : 'surrender_pending',
	released    : 'released',
	collected   : 'release_pending',
};

const getMutatedControls = ({ item, stateProps, controls = [] }) => {
	const BL_OPTIONS = [];
	const MUTATED_CONTROLS = [];

	const { bill_of_ladings, delivery_orders } = item || {};

	let docs;
	let bl_do_number_key = '';

	if (stateProps.activeTab === 'do') {
		docs = delivery_orders || [];
		bl_do_number_key = 'do_number';
	} else {
		docs = bill_of_ladings || [];
		bl_do_number_key = 'bl_number';
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

			return ele.status === STATUS_MAPPING[stateProps.inner_tab];
		});

		availableDocs.forEach((doc) => {
			BL_OPTIONS.push({
				label : doc?.[bl_do_number_key],
				value : doc?.id,
				name  : doc?.[bl_do_number_key],
			});
		});

		controls.forEach((ctrl) => {
			const newObj = { ...ctrl };
			if (ctrl.name === 'ids') {
				newObj.options = [...ctrl.options, ...BL_OPTIONS];
			}
			MUTATED_CONTROLS.push(newObj);
		});
	} else {
		MUTATED_CONTROLS.push(...controls);
	}
	return {
		MUTATED_CONTROLS,
	};
};

export default getMutatedControls;
