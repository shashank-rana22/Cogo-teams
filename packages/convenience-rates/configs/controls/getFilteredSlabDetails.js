const getFilteredSlabDetails = ({ slab_details = [], control_name }) => {
	const isDefaultSlab = control_name === 'slab_details';

	return slab_details.filter((slab) => slab?.is_default === isDefaultSlab);
};

export default getFilteredSlabDetails;
