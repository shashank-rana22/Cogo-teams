import { FeatureGroup, GeoJSON, L, Marker } from '@cogoport/maps';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';
import ReactDOMServer from 'react-dom/server';

import MapTooltip from '../../../../../common/MapTooltip';
import {
	DUMMY_DATA, COLORS, ICON_SIZE,
	ICON_ANCHORX,
	ICON_ANCHORY,
	PADDING_TOP,
	LAYOUT_WIDTH,
} from '../../../../../constants/map_constants';
import styles from '../styles.module.css';

function CountryGeometry({
	setBounds = () => {}, activeLocations = [],
	setActiveLocations = () => {}, map = null, showLabels = false, data = [],
}) {
	const [centerMapping, setCenterMapping] = useState({});
	const filteredData = isEmpty(activeLocations) ? data
		: data.filter(({ id }) => activeLocations.includes(id));
	const markerData = Object.entries(centerMapping).filter(([, { id }]) => activeLocations.includes(id));

	const onEachFeature = (feature, layer, code) => {
		const IDX = DUMMY_DATA[code].idx;

		layer?.setStyle({
			weight      : 1,
			fillOpacity : 0,
			opacity     : 0,
			...COLORS[IDX],
		});

		layer.bindTooltip(
			ReactDOMServer.renderToString(
				<MapTooltip
					display_name={code}
					color={COLORS[IDX]?.color}
					deviation={DUMMY_DATA[code].deviation}
				/>,
			),
			{ sticky: true, direction: 'top' },
		);

		setCenterMapping((prev) => ({
			...prev,
			[code]: { ...(prev?.[code] || {}), color: COLORS[IDX]?.color || '#828282' },
		}));
	};

	return (
		<FeatureGroup eventHandlers={{
			add: (e) => {
				if (!map) return;
				map.fitBounds(e.target.getBounds(), { paddingTopLeft: [LAYOUT_WIDTH, PADDING_TOP] });
			},
		}}
		>
			{filteredData.map((item) => (
				<GeoJSON
					key={item.country_code}
					data={JSON.parse(item.geometry)}
					onEachFeature={(feature, layer) => onEachFeature(feature, layer, item.country_code)}
					eventHandlers={{
						add: (e) => {
							if (!map) return;
							const curBounds = e.target.getBounds();
							const center = curBounds.getCenter();
							setBounds((prevBounds) => {
								if (!prevBounds) {
									return curBounds;
								}
								const newBounds = prevBounds.extend(curBounds);
								return newBounds;
							});
							setCenterMapping((prev) => ({
								...prev,
								[item.country_code]: { ...(prev?.[item.country_code] || {}), center, id: item.id },
							}));
						},
						click: (e) => {
							setActiveLocations((prev) => [...prev, item.id]);
							setBounds(e.target.getBounds());
						},
					}}
				/>
			))}

			{showLabels
				? (markerData.map(([code, { center, color }]) => (
					<Marker
						key={code}
						position={center}
						icon={L.divIcon({
							html       : code,
							iconSize   : [ICON_SIZE, ICON_SIZE],
							iconAnchor : [ICON_ANCHORX, ICON_ANCHORY],
							className  : styles.heading_text,
							styles     : { color },
						})}
					/>
				))) : null}

		</FeatureGroup>
	);
}

export default CountryGeometry;
