import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { FeatureGroup, GeoJSON, L } from '@cogoport/maps';
import { isEmpty } from '@cogoport/utils';
import React, { useRef, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';

import MapTooltip from '../../../../../common/MapTooltip';
import { formatBigNumbers } from '../../../../../utils/formatBigNumbers';
import { getPolygonStyleProps } from '../../../../../utils/map-utils';
import { COLORS } from '../../../Heading/BirdsEyeView';

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
	filterBy = '',
	minCount = 0,
	maxCount = 0,
	range = 1,
}, ref) => {
	const activeCountryRef = useRef(null);

	const filteredData = isEmpty(hierarchy) ? data
		: data.filter(({ id }) => Object.values(hierarchy).includes(id));
	const activeId = hierarchy?.country_id;

	const onEachFeature = (feature, layer, id, name) => {
		const fillColor = !accuracyMapping[id]
			? 'transparent'
			: COLORS[Object.keys(accuracyMapping).length === 1 || minCount === maxCount
				? COLORS.length - 1
				: Math.floor((accuracyMapping[id] - minCount) / range)];

		const styleProps = filterBy.includes('accuracy') ? getPolygonStyleProps(accuracyMapping[id]) : {
			weight      : 0.5,
			fillOpacity : 1,
			opacity     : 1,
			fillColor   : fillColor || '#FFF',
			color       : '#828282',
		};
		const value = filterBy.includes('accuracy')
			? (accuracyMapping[id] || GLOBAL_CONSTANTS.zeroth_index).toFixed(ONE + ONE)
			: formatBigNumbers(accuracyMapping[id]);

		const activeProps = activeId === id ? {
			fillOpacity : 0,
			fillColor   : 'transparent',
			color       : '#E6A400',
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
					color={filterBy.includes('accuracy') ? styleProps?.color : fillColor}
					value={value}
					value_key=""
					value_suffix={filterBy.includes('accuracy') ? '%' : ''}
				/>,
			),
			{ sticky: true, direction: 'top' },
		);
	};

	useEffect(() => {
		const cachedRef = activeCountryRef.current;
		if (cachedRef && filteredData.length === ONE && !hierarchy.region_id) {
			setBounds(cachedRef.getBounds());
		}
	}, [filteredData.length, setBounds, hierarchy]);

	return (
		<FeatureGroup key={`${filterBy} ${minCount} ${maxCount} ${activeId}`}>
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
