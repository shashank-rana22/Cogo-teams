import { GeoJSON } from '@cogoport/maps';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import MapTooltip from '../../../../../common/MapTooltip';
import { COLORS, ONE } from '../../../../../constants/map_constants';

const TOTAL_IDX = 4;

function getRandomWholeNumber(x, y) {
	const min = Math.ceil(x);
	const max = Math.floor(y);
	return Math.floor(Math.random() * (max - min + ONE)) + min;
}

const ActiveRegions = ({ showRegions, activeData, setBounds, setLocationFilters, map, setHierarchy }) => {
	const onEachFeature = (feature, layer, code) => {
		const IDX = Math.floor(Math.random() * TOTAL_IDX);

		layer?.setStyle({
			weight      : 1,
			fillOpacity : 0.7,
			opacity     : 0,
			fillColor   : '#f4f4f4',
			...COLORS[IDX],
		});

		layer.bindTooltip(
			ReactDOMServer.renderToString(
				<MapTooltip
					display_name={code}
					color={COLORS[IDX]?.color}
					deviation={getRandomWholeNumber(COLORS[IDX]?.min, COLORS[IDX]?.max)}
				/>,
			),
			{ sticky: true, direction: 'top' },
		);
	};

	return (showRegions && activeData.map(({ id, geometry, name, ...rest }) => (
		<GeoJSON
			key={id}
			data={JSON.parse(geometry)}
			onEachFeature={(feature, layer) => onEachFeature(feature, layer, name)}
			eventHandlers={{
				add: (e) => {
					if (!map) return;
					const curBounds = e.target.getBounds();
					setBounds((prevBounds) => {
						if (!prevBounds) {
							return curBounds;
						}
						const newBounds = prevBounds.extend(curBounds);
						return newBounds;
					});
				},
				click: (e) => {
					setLocationFilters((prev) => ({
						...prev,
						destination: {
							id, name, ...rest,
						},
					}));
					setHierarchy((prev) => ({ ...prev, [`${rest?.type}_id`]: id }));
					setBounds(e.target.getBounds());
				},
			}}
		/>
	))
	);
};

export default ActiveRegions;
