const checkForDisabled = ({ experience, controlName, index }) => {
	if (experience === 'default' || controlName === 'slab_lower_limit') return true;
	if (controlName === 'slab_unit' && index > 0) return true;
	return false;
};

export default checkForDisabled;
