import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { FeatureGroup, Tooltip, L } from '@cogoport/maps';
import React from 'react';

import MapTooltip from '../../../../../common/MapTooltip';
import { SECOND_IDX } from '../../../../../constants/map_constants';
import { formatBigNumbers } from '../../../../../utils/formatBigNumbers';
import { HIERARCHY_MAPPING, getLowestHierarchy } from '../../../../../utils/hierarchy-utils';
import { getPolygonStyleProps } from '../../../../../utils/map-utils';
import { COLORS } from '../../../Heading/BirdsEyeView';
import Point from '../AnimatedPoint';

const DECIMAL = 2;
const ActivePorts = React.forwardRef(({
	activeList,
	accuracyMapping,
	filterBy,
	hierarchy,
	minCount,
	maxCount,
	range,
	currentId,
	setBounds,
	setLocationFilters,
	setHierarchy,
}, ref) => {
	const lowestHierarchy = getLowestHierarchy(hierarchy);
	const showPorts = HIERARCHY_MAPPING[lowestHierarchy] <= SECOND_IDX;

	return (
		<FeatureGroup>
			{showPorts
			&& activeList.map((item) => {
				const position = [item.destination_latitude, item.destination_longitude];
				const value = filterBy.includes('accuracy')
					? (accuracyMapping[item.destination_id] || GLOBAL_CONSTANTS.zeroth_index).toFixed(DECIMAL)
					: formatBigNumbers(accuracyMapping[item.destination_id]);
				const idx = activeList.length === 1 || minCount === maxCount
					? COLORS.length - 1
					: Math.floor((accuracyMapping[item.destination_id] - minCount) / range);
				const color = filterBy.includes('accuracy')
					? getPolygonStyleProps(accuracyMapping[item.destination_id])?.color
					: COLORS[idx];
				return (
					<Point
						key={item.destination_id}
						position={position}
						ref={currentId === item.destination_id ? ref : null}
						backgroundColor={color}
						lightFill={idx < 3}
						eventHandlers={{
							click: (e) => {
								L.DomEvent.stopPropagation(e);
								const markerBounds = new L.LatLngBounds([position]);
								setBounds(markerBounds);

								if (!hierarchy?.port_id) {
									setLocationFilters((prev) => ({
										...prev,
										destination: {
											id: item.destination_id, name: item?.name, type: item.destination_type,
										},
									}));
									setHierarchy((prev) => ({ ...prev, port_id: item.destination_id }));
								}
							},
						}}
					>
						<Tooltip
							direction="top"
							sticky
						>
							<MapTooltip
								display_name={item.destination_name}
								color={color}
								value={value}
								value_key=""
								value_suffix={filterBy.includes('accuracy') ? '%' : ''}
							/>
						</Tooltip>
					</Point>
				);
			})}
		</FeatureGroup>
	);
});

export default ActivePorts;
