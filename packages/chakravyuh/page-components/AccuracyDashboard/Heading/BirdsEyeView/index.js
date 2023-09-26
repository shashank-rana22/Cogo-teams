import { Loader } from '@cogoport/components';
import { CogoMaps, FeatureGroup, GeoJSON } from '@cogoport/maps';
import React, { useState } from 'react';
import ReactDOMServer from 'react-dom/server';

import MapTooltip from '../../../../common/MapTooltip';
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

export const COLORS = ['#ffeacc', '#ffc680', '#f0883e', '#db6d28', '#bd561d', '#9b4215', '#762d0a', '#3d1300'];
function BirdsEyeView({ countMapping = {}, maxCount = 0, minCount = 0, loading = false }) {
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
			zoom={1}
			key={data?.length}
			maxBounds={MAX_BOUNDS}
			maxZoom={2}
			minZoom={1}
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
				{!!maxCount && COLORS.map((color, idx) => (
					<p key={color}>
						{formatBigNumbers(range * (idx + NEXT))}
					</p>
				))}
			</div>
			{loading && (
				<div className={styles.loader_container}>
					<Loader className={styles.loader} />
				</div>
			)}
		</CogoMaps>
	);
}

export default BirdsEyeView;
