import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { countriesHash } from '@cogoport/globalization/utils/getCountriesHash';
import { FeatureGroup, GeoJSON, useMapEvents, L } from '@cogoport/maps';
import { isEmpty } from '@cogoport/utils';
import { useRef } from 'react';
import ReactDOMServer from 'react-dom/server';

import MapTooltip from '../../../../../common/MapTooltip';
import {
	COLORS,
	PADDING_TOP,
	LAYOUT_WIDTH,
	ONE,
} from '../../../../../constants/map_constants';
import useListNearestLocations from '../../../../../hooks/useListNearestLocations';
import isPointInsideRegion from '../../../../../utils/isPointInsideRegion';

const TIME_LIMIT = 200;

const DUMMY_DATA = { ...countriesHash };

function WorldGeometry({
	setBounds = () => {}, hierarchy = {},
	setHierarchy = () => {}, map = null, data = [],
	setLocationFilters = () => {},
}) {
	const timerRef = useRef(null);
	const activeCountryRef = useRef(null);

	const filteredData = isEmpty(hierarchy) ? data
		: data.filter(({ id }) => Object.values(hierarchy).includes(id));
	const activeId = hierarchy?.country_id;

	const { getNearestLocations } = useListNearestLocations(setLocationFilters, setHierarchy, activeId);

	const onEachFeature = (feature, layer, id) => {
		const IDX = Number((DUMMY_DATA[id].mobile_country_code || '0').slice(-ONE)) % COLORS.length
		|| GLOBAL_CONSTANTS.zeroth_index;
		DUMMY_DATA[id].deviation = COLORS[IDX].min + Math.floor(Math.random() * (COLORS[IDX].max - COLORS[IDX].min));

		layer?.setStyle({
			weight      : 1,
			fillOpacity : 0,
			opacity     : 0.7,
			...COLORS[IDX],
		});

		layer.bindTooltip(
			ReactDOMServer.renderToString(
				<MapTooltip
					display_name={DUMMY_DATA[id].name}
					color={COLORS[IDX]?.color}
					deviation={DUMMY_DATA[id]?.deviation}
				/>,
			),
			{ sticky: true, direction: 'top' },
		);
	};

	const handleClick = (e) => {
		L.DomEvent.stopPropagation(e);
		const latitude = e.latlng.lat;
		const longitude = e.latlng.lng;

		if (!!activeId && !!activeCountryRef.current && !isPointInsideRegion(
			e.latlng,
			activeCountryRef.current,
		)) {
			getNearestLocations({ filters: { latitude, longitude, type: ['country'] } });
		}
	};

	useMapEvents({
		click(e) {
			clearTimeout(timerRef.current);

			timerRef.current = setTimeout(() => {
				handleClick(e);
			}, TIME_LIMIT);
		},
		dblclick() {
			clearTimeout(timerRef.current);
		},
	});

	return (
		<FeatureGroup
			eventHandlers={{
				add: (e) => {
					if (!map) return;
					map.fitBounds(e.target.getBounds(), { paddingTopLeft: [LAYOUT_WIDTH, PADDING_TOP] });
				},
			}}
		>
			{filteredData.map((item) => (
				<GeoJSON
					key={item.id}
					ref={item.id === activeId ? activeCountryRef : null}
					data={JSON.parse(item.geometry)}
					onEachFeature={(feature, layer) => onEachFeature(feature, layer, item.id)}
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
									id   : item.id,
									type : 'country',
								},
							}));
							setHierarchy({ country_id: item.id });
							setBounds(e.target.getBounds());
						},
					}}
				/>
			))}
		</FeatureGroup>
	);
}

export default WorldGeometry;
