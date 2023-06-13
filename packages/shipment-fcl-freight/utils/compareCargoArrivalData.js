const OBJ1_KEY_FIRST = 0;
const OBJ2_KEY_FIRST = 0;

const compareCargoArrivalData = (obj1, obj2) => {
	let check = true;
	Object.keys(obj1 || {}).forEach((key) => {
		if (key === 'shipment_details') {
			const obj = obj1[key];
			Object.keys(obj || {}).forEach((key2) => {
				if (obj[key2] !== obj2?.[key]?.[key2]) {
					check = false;
				}
			});
		}
		if (key === 'containers') {
			const obj = obj1[key]?.[OBJ1_KEY_FIRST];
			Object.keys(obj || {}).forEach((key2) => {
				if (obj[key2] !== obj2?.[key]?.[OBJ2_KEY_FIRST]?.[key2]) {
					check = false;
				}
			});
		} else if (
			obj1[key] !== obj2?.[key]
			&& !['containers', 'shipment_details'].includes(key)
		) {
			check = false;
		}
	});

	return check;
};

export default compareCargoArrivalData;
