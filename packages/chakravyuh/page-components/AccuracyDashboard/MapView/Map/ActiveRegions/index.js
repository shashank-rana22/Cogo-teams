import { FeatureGroup, GeoJSON, L } from '@cogoport/maps';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import MapTooltip from '../../../../../common/MapTooltip';
import { getPolygonStyleProps } from '../../../../../utils/map-utils';

const ActiveRegions = React.forwardRef(({
	showRegions = () => {},
	activeData = [],
	setBounds = () => {},
	accuracyMapping = {},
	setActiveList = () => {},
	setLocationFilters = () => {},
	hierarchy = {},
	setHierarchy = () => {},
	currentId = null,
}, ref) => {
	const activeId = hierarchy?.region_id;

	const onEachFeature = (feature, layer, code, id) => {
		const styleProps = getPolygonStyleProps(accuracyMapping[id]);

		const disableRegion = hierarchy?.region_id && id !== hierarchy?.region_id;
		const disableProps = disableRegion ? { fillOpacity: 0 } : {};

		layer?.setStyle({
			weight      : 1,
			fillOpacity : 0.7,
			opacity     : 0,
			fillColor   : '#f4f4f4',
			...styleProps,
			...disableProps,
		});

		layer.bindTooltip(
			ReactDOMServer.renderToString(
				<MapTooltip
					display_name={code}
					color={styleProps?.color}
					value={accuracyMapping[id]}
					value_key=""
				/>,
			),
			{ sticky: true, direction: 'top' },
		);
	};

	return (
		<FeatureGroup key={hierarchy?.region_id}>
			{showRegions && activeData.map(({ id, geometry, name, type, ...rest }) => {
				const isActive = activeId === id;
				return (
					<GeoJSON
						key={id}
						ref={currentId === id ? ref : null}
						data={JSON.parse(geometry)}
						onEachFeature={(feature, layer) => onEachFeature(feature, layer, name, id)}
						eventHandlers={{
							click: (e) => {
								L.DomEvent.stopPropagation(e);
								if (!isActive) {
									setLocationFilters((prev) => ({
										...prev,
										destination: {
											id, name, type: type || 'region', ...rest,
										},
									}));
									setHierarchy((prev) => ({ ...prev, [`${type}_id`]: id }));
									setActiveList([]);
								}
								setBounds(e.target.getBounds());
							},
						}}
					/>
				);
			})}
		</FeatureGroup>
	);
});

export default ActiveRegions;
