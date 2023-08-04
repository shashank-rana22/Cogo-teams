import { CogoMaps, FeatureGroup, GeoJSON } from '@cogoport/maps';
import React, { useState } from 'react';
import ReactDOMServer from 'react-dom/server';

import MapTooltip from '../../../../common/MapTooltip';
import { BASE_LAYER } from '../../../../constants/map_constants';
import useGetSimplifiedGeometry from '../../../../hooks/useGetSimplifiedGeometry';
import { formatBigNumbers } from '../../../../utils/formatBigNumbers';
import styles from '../styles.module.css';

const MAX_LNG = 90;
const MAX_LAT = 180;
const K = 0.0001;
const NEXT = 1;

const MAX_BOUNDS = [
	[-MAX_LNG, -MAX_LAT],
	[MAX_LNG, MAX_LAT]];

const COLORS = ['#e4f4ac', '#9ed688', '#7ec87b', '#45a95d', '#076536'];
function BirdsEyeView({ countMapping = {}, maxCount = 0, minCount = 0 }) {
	const [map, setMap] = useState(null);
	const { data = [] } = useGetSimplifiedGeometry({ type: 'country' });

	const range = K + (maxCount - minCount) / COLORS.length;

	const onEachFeature = (feature, layer, id, name) => {
		const fillColor = COLORS[Math.floor((countMapping[id] - minCount) / range)];

		layer?.setStyle({
			weight      : 1,
			fillOpacity : 1,
			opacity     : 1,
			fillColor   : fillColor || '#FFF',
			color       : '#828282',
		});

		layer.bindTooltip(
			ReactDOMServer.renderToString(
				<MapTooltip
					display_name={name}
					value={formatBigNumbers(countMapping[id])}
					value_key=""
					value_suffix=""
					color={fillColor}
				/>,
			),
			{ sticky: true, direction: 'top' },
		);
	};

	return (
		<CogoMaps
			style={{ height: '550px', width: '100%' }}
			setMap={setMap}
			zoom={5}
			key={data?.length}
			baseLayer={BASE_LAYER}
			maxBounds={MAX_BOUNDS}
			maxZoom={2}
			zoomControls={false}
			scaleControl={false}
			attributionControl={false}
		>
			<FeatureGroup eventHandlers={{
				add: (e) => {
					if (!map) return;
					map.fitBounds(e.target.getBoudns());
				},
			}}
			>
				{data.map((item) => (
					<GeoJSON
						key={item.id}
						data={JSON.parse(item.geometry)}
						onEachFeature={(feature, layer) => onEachFeature(feature, layer, item.id, item.name)}
					/>
				))}
			</FeatureGroup>
			<div className={styles.legend}>
				{COLORS.map((color, idx) => (
					<p key={color}>
						{formatBigNumbers(range * (idx + NEXT))}
					</p>
				))}
			</div>
		</CogoMaps>
	);
}

export default BirdsEyeView;
