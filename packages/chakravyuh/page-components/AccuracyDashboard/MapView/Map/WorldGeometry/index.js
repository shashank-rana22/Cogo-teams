import { FeatureGroup, GeoJSON, L } from '@cogoport/maps';
import { isEmpty } from '@cogoport/utils';
import React, { useRef, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';

import MapTooltip from '../../../../../common/MapTooltip';
import { getPolygonStyleProps } from '../../../../../utils/map-utils';

const ONE = 1;

const WorldGeometry = React.forwardRef(({
	hierarchy = {},
	currentId = null,
	accuracyMapping = {},
	setHierarchy = () => {},
	data = [],
	setActiveList = () => {},
	setLocationFilters = () => {},
	setBounds = () => {},
}, ref) => {
	// const timerRef = useRef(null);
	const activeCountryRef = useRef(null);

	const filteredData = isEmpty(hierarchy) ? data
		: data.filter(({ id }) => Object.values(hierarchy).includes(id));
	const activeId = hierarchy?.country_id;

	// const { getNearestLocations } = useListNearestLocations({
	// 	setLocationFilters,
	// 	setHierarchy,
	// 	setActiveList,
	// 	activeId,
	// });

	const onEachFeature = (feature, layer, id, name) => {
		const styleProps = getPolygonStyleProps(accuracyMapping[id]);

		const activeProps = activeId === id ? {
			fillOpacity : 0,
			fillColor   : 'transparent',
			color       : '#ee3235',
			weight      : 1.5,
		} : {};

		layer?.setStyle({
			weight      : 1,
			fillOpacity : 0,
			opacity     : 0.7,
			...styleProps,
			...activeProps,
		});

		layer.bindTooltip(
			ReactDOMServer.renderToString(
				<MapTooltip
					display_name={name}
					color={styleProps.color}
					accuracy={accuracyMapping[id]}
				/>,
			),
			{ sticky: true, direction: 'top' },
		);
	};

	// const handleMapClick = (e) => {
	// 	L.DomEvent.stopPropagation(e);
	// 	const latitude = e.latlng.lat;
	// 	const longitude = e.latlng.lng;

	// 	map.setView(e.latlng, ZOOM_LEVEL);

	// 	if (!!activeId && !!activeCountryRef.current && !isPointInsideRegion(
	// 		e.latlng,
	// 		activeCountryRef.current,
	// 	)) {
	// 		getNearestLocations({ filters: { latitude, longitude, type: ['country'] } });
	// 	}
	// };

	// useMapEvents({
	// 	click(e) {
	// 		clearTimeout(timerRef.current);

	// 		timerRef.current = setTimeout(() => {
	// 			handleMapClick(e);
	// 		}, TIME_LIMIT);
	// 	},
	// 	dblclick() {
	// 		clearTimeout(timerRef.current);
	// 	},
	// });

	useEffect(() => {
		const cachedRef = activeCountryRef.current;
		if (cachedRef && filteredData.length === ONE && !hierarchy.region_id) {
			setBounds(cachedRef.getBounds());
		}
	}, [filteredData.length, setBounds, hierarchy]);

	return (
		<FeatureGroup key={activeId}>
			{filteredData.map((item) => {
				const currentRef = item.id === currentId ? ref : null;
				const isActive = item.id === activeId;

				return (
					<GeoJSON
						key={item.id}
						ref={isActive ? activeCountryRef : currentRef}
						data={JSON.parse(item.geometry)}
						onEachFeature={(feature, layer) => onEachFeature(feature, layer, item.id, item.name)}
						eventHandlers={{
							click: (e) => {
								L.DomEvent.stopPropagation(e);

								if (!isActive) {
									setLocationFilters((prev) => ({
										...prev,
										destination: {
											id   : item.id,
											type : 'country',
										},
									}));
									setHierarchy({ country_id: item.id });
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

export default WorldGeometry;
