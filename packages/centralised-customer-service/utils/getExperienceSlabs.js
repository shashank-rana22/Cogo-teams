import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const OFFSET = -1;
const MAX_SLAB_INDEX = 3;

const getExperienceSlabs = (slabs = []) => {
	const experienceSlabs = slabs.map((slab, index) => {
		const { slab_unit, slab_lower_limit, slab_upper_limit } = slab;

		if (index === MAX_SLAB_INDEX) {
			return {
				slab_unit,
				slab_lower_limit: Number(slab.slab_lower_limit
					.slice(GLOBAL_CONSTANTS.zeroth_index, OFFSET)),
				slab_upper_limit: 99999,
			};
		}
		return {
			slab_unit,
			slab_lower_limit : Number(slab_lower_limit),
			slab_upper_limit : Number(slab_upper_limit),
		};
	});

	return experienceSlabs;
};

export default getExperienceSlabs;
