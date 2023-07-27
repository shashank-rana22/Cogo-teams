const OFFSET = 1;

const checkForDisabled = ({ experience, controlName, index, showForm, slabsLength = 0 }) => {
	if (showForm) return true;
	if (experience === 'default' || controlName === 'slab_lower_limit') return true;
	if (controlName === 'slab_unit' && index > 0) return true;
	if (controlName === 'slab_upper_limit' && index < slabsLength - OFFSET) return true;

	return false;
};

export default checkForDisabled;
