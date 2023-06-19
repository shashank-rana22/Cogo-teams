import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';

import { L, Marker, FeatureGroup, Tooltip } from '@cogoport/maps';
import ReactDOMServer from 'react-dom/server';

import styles from './styles.module.css';

const geo = getGeoConstants();
const ICON_MAPPING = {
	yellow : GLOBAL_CONSTANTS.image_url.yellow_vessel,
	green  : GLOBAL_CONSTANTS.image_url.green_vessel,
	red    : GLOBAL_CONSTANTS.image_url.red_vessel,
	black  : GLOBAL_CONSTANTS.image_url.black_vessel,
};

const TOOLTIP_MAPPING = {
	vessel_name   : 'Name',
	latitude      : 'Latitude',
	longitude     : 'Longitude',
	lastUpdatedAt : 'Last Update',
};

function Pointer(props) {
	const {
		latitude: lat = '',
		longitude: lng = '',
		lastUpdatedAt = '',
		cog: direction,
		arrow = 'black',
	} = props;
	const icon = new L.DivIcon({
		html: ReactDOMServer.renderToString(
			<img
				src={ICON_MAPPING[arrow]}
				style={{
					transform : `rotate(${direction}deg)`,
					height    : '16px',
					width     : '8px',
				}}
				alt="ship"
			/>,
		),
		iconSize   : [24, 24],
		iconAnchor : [10, 12],
		className  : 'divIcon',
	});

	const getData = (key) => {
		if (key === 'lastUpdatedAt') {
			return formatDate({
				date       : lastUpdatedAt,
				dateFormat : geo.formats.date.default,
				timeFormat : geo.formats.time['12hrs'],
				formatType : 'dateTime',
			});
		}
		return props?.[key];
	};
	return (
		<FeatureGroup key={lat}>
			<Marker position={[lat, lng]} icon={icon}>
				<Tooltip offset={[0, -10]}>
					<div className={styles.container}>
						{Object.keys(TOOLTIP_MAPPING).map((info) => (
							<div key={info}>
								<span className={styles.heading}>{TOOLTIP_MAPPING[info]}</span>
								<span className={styles.value}>{getData(info)}</span>
							</div>
						))}
					</div>
				</Tooltip>
			</Marker>
		</FeatureGroup>
	);
}

export default Pointer;
