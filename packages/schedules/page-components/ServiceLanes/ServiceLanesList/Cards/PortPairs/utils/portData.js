const ZERO = 0;
const ONE = 1;
const THREE = 3;
const TEN_THOUSAND = 10000;
const TWO = 2;
const TEN = 10;
const SIXTEEN = 16;
const TWETY = 20;
const EIGHT = 8;

const portData = ({ item }) => {
	const truncate = (str, len) => (str?.length > len ? `${str.substring(ZERO, len - THREE)}...` : str);

	const links = item?.service_lane_links?.length;

	const origin = item?.service_lane_links?.[ZERO]?.display_name;
	const splitOrigin = origin?.indexOf(',')
        < (origin?.indexOf('(') < ZERO ? TEN_THOUSAND : origin?.indexOf('('))
		? origin?.indexOf(',')
		: origin?.indexOf('(');
	const originPort = origin?.substring(ZERO, splitOrigin);
	const commaIndexOrigin = origin?.indexOf(',');
	const originLocation = truncate(
		origin?.substring(commaIndexOrigin + TWO).trim(),
		originPort?.length > SIXTEEN ? TEN : TWETY,
	);

	const destination = item?.service_lane_links?.[links - ONE]?.display_name;
	const splitDestination = destination?.indexOf(',') < destination?.indexOf('(')
		? destination?.indexOf(',')
		: destination?.indexOf('(');
	const destinationPort = destination?.substring(ZERO, splitDestination);
	const commaIndexDestination = destination?.indexOf(',');
	const destinationLocation = truncate(
		destination?.substring(commaIndexDestination + TWO).trim(),
		destinationPort?.length > SIXTEEN ? EIGHT : TWETY,
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
