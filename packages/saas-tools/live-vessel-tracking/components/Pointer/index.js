import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { L, Marker, FeatureGroup, Tooltip } from '@cogoport/maps';
import { Image } from '@cogoport/next';
import ReactDOMServer from 'react-dom/server';

import {
	ICON_ANCHOR_X, ICON_ANCHOR_Y, ICON_SIZE, TOOLTIP_MAPPING,
	TOOLTIP_OFFSET_X, TOOLTIP_OFFSET_Y,
} from '../../constant/pointer';

import styles from './styles.module.css';

const geo = getGeoConstants();

const ICON_MAPPING = {
	yellow : GLOBAL_CONSTANTS.image_url.yellow_vessel,
	red    : GLOBAL_CONSTANTS.image_url.red_vessel,
	black  : GLOBAL_CONSTANTS.image_url.black_vessel,
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
			<Image
				src={ICON_MAPPING[arrow]}
				width={8}
				height={16}
				style={{
					transform: `rotate(${direction}deg)`,
					// height    : '16px',
					// width     : '8px',
				}}
				alt="ship"
			/>,
		),
		iconSize   : [ICON_SIZE, ICON_SIZE],
		iconAnchor : [ICON_ANCHOR_X, ICON_ANCHOR_Y],
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
				<Tooltip offset={[TOOLTIP_OFFSET_X, TOOLTIP_OFFSET_Y]}>
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
