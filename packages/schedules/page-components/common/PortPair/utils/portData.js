const portData = ({ data }) => {
    const truncate = (str) => {
        return str?.length > 20 ? `${str.substring(0, 17)}...` : str;
    };

    const links = data?.[0]?.service_lane_links?.length;

    const origin = data?.[0]?.service_lane_links?.[0]?.display_name;
    const splitOrigin =
        origin?.indexOf(",") < origin?.indexOf("(")
            ? origin?.indexOf(",")
            : origin?.indexOf("(");

    const commaIndexOrigin = origin?.indexOf(",");
    const originLocation = truncate(
        origin?.substring(commaIndexOrigin + 2).trim()
    );
    const originPort = origin?.substring(0, splitOrigin);

    const destination =
        data?.[0]?.service_lane_links?.[links - 1]?.display_name;
    const splitDestination =
        destination?.indexOf(",") < destination?.indexOf("(")
            ? destination?.indexOf(",")
            : destination?.indexOf("(");

    const commaIndexDestination = destination?.indexOf(",");
    const destinationLocation = truncate(
        destination?.substring(commaIndexDestination + 2).trim()
    );
    const destinationPort = destination?.substring(0, splitDestination);

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
