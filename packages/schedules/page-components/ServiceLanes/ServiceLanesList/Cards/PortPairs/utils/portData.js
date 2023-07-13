const portData = ({ item }) => {
	const truncate = (str, len) => (str?.length > len ? `${str.substring(0, len - 3)}...` : str);

	const links = item?.service_lane_links?.length;

	const origin = item?.service_lane_links?.[0]?.display_name;
	const splitOrigin = origin?.indexOf(',')
        < (origin?.indexOf('(') < 0 ? 10000 : origin?.indexOf('('))
		? origin?.indexOf(',')
		: origin?.indexOf('(');
	const originPort = origin?.substring(0, splitOrigin);
	const commaIndexOrigin = origin?.indexOf(',');
	const originLocation = truncate(
		origin?.substring(commaIndexOrigin + 2).trim(),
		originPort?.length > 16 ? 10 : 20,
	);

	const destination = item?.service_lane_links?.[links - 1]?.display_name;
	const splitDestination = destination?.indexOf(',') < destination?.indexOf('(')
		? destination?.indexOf(',')
		: destination?.indexOf('(');
	const destinationPort = destination?.substring(0, splitDestination);
	const commaIndexDestination = destination?.indexOf(',');
	const destinationLocation = truncate(
		destination?.substring(commaIndexDestination + 2).trim(),
		destinationPort?.length > 16 ? 8 : 20,
	);

	return {
		origin,
		originPort,
		originLocation,

		destination,
		destinationPort,
		destinationLocation,

		links,
	};
};

export default portData;
