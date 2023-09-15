const getTagPayload = ({ value = {}, forUpdate = false, data = {} }) => {
	const { tags, location_ids, ...restControls } = value;
	const tagStrings = tags.map((tag) => tag.tag).filter((tag) => !!tag);
	const loc_ids = (forUpdate) ? [location_ids].flat() : location_ids;

	const withTagPayload = {
		...restControls,
		tags         : tagStrings,
		location_ids : loc_ids,
	};

	Object.keys(withTagPayload).forEach((key) => {
		if (!withTagPayload[key]) {
			withTagPayload[key] = undefined;
		}
		if (key === 'tags' && !withTagPayload[key].length) {
			withTagPayload[key] = undefined;
		}
	});
	if (forUpdate) {
		withTagPayload.id = data.id;
	}
	return withTagPayload;
};
export default getTagPayload;
