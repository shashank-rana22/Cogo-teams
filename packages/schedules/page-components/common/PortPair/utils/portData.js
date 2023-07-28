const ZERO = 0;
const ONE = 1;
const TWO = 2;
const TWENTY = 20;
const SEVENTEEN = 17;
const portData = ({ data }) => {
	const truncate = (str) => (str?.length > TWENTY ? `${str.substring(ZERO, SEVENTEEN)}...` : str);

	const links = data?.[ZERO]?.service_lane_links?.length;
	const origin = links ? data?.[ZERO]?.service_lane_links?.[ZERO]?.display_name : data?.origin_location?.display_name;
	const splitOrigin = origin?.indexOf(',') < origin?.indexOf('(')
		? origin?.indexOf(',')
		: origin?.indexOf('(');

	const commaIndexOrigin = origin?.indexOf(',');
	const originLocation = truncate(
		origin?.substring(commaIndexOrigin + TWO).trim(),
	);
	const originPort = origin?.substring(ZERO, splitOrigin);

	const destination = links ? data?.[ZERO]?.service_lane_links?.[links - ONE]?.display_name
		: data?.destination_location?.display_name;
	const splitDestination = destination?.indexOf(',') < destination?.indexOf('(')
		? destination?.indexOf(',')
		: destination?.indexOf('(');

	const commaIndexDestination = destination?.indexOf(',');
	const destinationLocation = truncate(
		destination?.substring(commaIndexDestination + TWO).trim(),
	);
	const destinationPort = destination?.substring(ZERO, splitDestination);

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
