import { CogoMaps, FeatureGroup, GeoJSON } from '@cogoport/maps';
import React, { useState } from 'react';
import ReactDOMServer from 'react-dom/server';

import MapTooltip from '../../../../common/MapTooltip';
import { BASE_LAYER } from '../../../../constants/map_constants';
import useGetSimplifiedGeometry from '../../../../hooks/useGetSimplifiedGeometry';
import { getPolygonStyleProps } from '../../../../utils/map-utils';

const MAX_LNG = 90;
const MAX_LAT = 180;

const MAX_BOUNDS = [
	[-MAX_LNG, -MAX_LAT],
	[MAX_LNG, MAX_LAT]];

function BirdsEyeView({ countMapping = {} }) {
	const [map, setMap] = useState(null);
	const { data = [] } = useGetSimplifiedGeometry({ type: 'country' });

	const onEachFeature = (feature, layer, id, name) => {
		const styleProps = getPolygonStyleProps(countMapping[id]);

		layer?.setStyle({
			weight      : 1,
			fillOpacity : 1,
			opacity     : 1,
			fillColor   : '#FFFFFF',
			color       : '#828282',
			...styleProps,
		});

		layer.bindTooltip(
			ReactDOMServer.renderToString(
				<MapTooltip
					display_name={name}
					color={styleProps.color}
					value={countMapping[id]}
					key="Rates"
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
		</CogoMaps>
	);
}

export default BirdsEyeView;
