const portData = ({ item }) => {
    const truncate = (str) => {
        return str?.length > 16 ? `${str.substring(0, 14)}...` : str;
    };

    const links = item?.service_lane_links?.length;

    const origin = item?.service_lane_links[0]?.display_name;
    const splitOrigin =
        origin?.indexOf(",") <
        (origin?.indexOf("(") < 0 ? 10000 : origin?.indexOf("("))
            ? origin?.indexOf(",")
            : origin?.indexOf("(");

    const commaIndexOrigin = origin?.indexOf(",");
    const originLocation = truncate(
        origin?.substring(commaIndexOrigin + 2).trim()
    );
    const originPort = origin?.substring(0, splitOrigin);

    const destination = item?.service_lane_links[links - 1]?.display_name;
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
