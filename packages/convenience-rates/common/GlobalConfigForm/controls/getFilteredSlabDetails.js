const getFilteredSlabDetails = ({ slab_details = [], control_name }) => {
	if (control_name === 'custom_config_slab') {
		return slab_details;
	}
	const isDefaultSlab = control_name === 'slab_details';

	return (slab_details || []).filter((slab) => slab?.is_default === isDefaultSlab);
};

export default getFilteredSlabDetails;
