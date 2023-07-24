import { ButtonIcon, Loader } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowBack } from '@cogoport/icons-react';
import { CircleMarker, CogoMaps, L, Tooltip } from '@cogoport/maps';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect } from 'react';

import CustomLegend from '../../../../common/Legend';
import { BASE_LAYER, LAYOUT_WIDTH, TIME_LIMIT, MAX_BOUNDS, ITEMS, ONE } from '../../../../constants/map_constants';
import useGetSimplifiedGeometry from '../../../../hooks/useGetSimplifiedGeometry';
import useListLocations from '../../../../hooks/useListLocations';
import { getChildHierarchy, getLowestHierarchy, HIERARCHY_MAPPING } from '../../../../utils/hierarchy-utils';

import ActiveRegions from './ActiveRegions';
import MapEvents from './MapEvents';
import styles from './styles.module.css';
import WorldGeometry from './WorldGeometry';

const MARKER_OPTIONS = {
	radius      : 5,
	color       : '#4f4f4f',
	fillColor   : '#7c7c7c',
	fillOpacity : 0.8,
	weight      : 1,
};

function Map({
	isFull = false, bounds = null, data = [], loading = false, setBounds = () => {},
	locationFilters = { }, setActiveList = () => {},
	setLocationFilters = () => { }, hierarchy = {}, setHierarchy = () => {}, handleBackHierarchy = () => {},
}) {
	const [map, setMap] = useState(null);
	const [zoom, setZoom] = useState(GLOBAL_CONSTANTS.zeroth_index);

	const lowestHierarchy = getLowestHierarchy(hierarchy);
	const requiredType = getChildHierarchy(lowestHierarchy, hierarchy);
	const type = requiredType && (requiredType !== 'port_id' && requiredType !== 'country_id')
		? requiredType.split('_')[GLOBAL_CONSTANTS.zeroth_index] : null;

	const { data: activeData = [], loading: activeLoading } = useGetSimplifiedGeometry({
		country_id   : hierarchy?.country_id,
		continent_id : hierarchy?.continent_id,
		type,
		setActiveList,
	});

	const { data: portsData = [], loading : portsLoading } = useListLocations({
		type      : 'seaport',
		id        : hierarchy?.port_id,
		region_id : hierarchy?.region_id,
		setActiveList,
	});

	const showRegions = !isEmpty(activeData) && HIERARCHY_MAPPING.region_id >= HIERARCHY_MAPPING[lowestHierarchy] - ONE;
	const showPorts = HIERARCHY_MAPPING.port_id >= HIERARCHY_MAPPING[lowestHierarchy] - ONE;
	const showLoading = loading || portsLoading || activeLoading;
	const paddingTopLeft = isFull ? GLOBAL_CONSTANTS.zeroth_index : LAYOUT_WIDTH;

	useEffect(() => {
		const timeout = setTimeout(() => { if (map)map.invalidateSize(true); }, TIME_LIMIT);
		return () => {
			clearTimeout(timeout);
		};
	}, [map, isFull]);

	useEffect(() => {
		if (map && bounds instanceof L.LatLngBounds) {
			map.fitBounds(bounds, { paddingTopLeft: [paddingTopLeft, GLOBAL_CONSTANTS.zeroth_index] });
		}
	}, [bounds, map, paddingTopLeft]);

	return (
		<CogoMaps
			style={{ height: '100vh', width: '100%' }}
			setMap={setMap}
			zoom={5}
			baseLayer={BASE_LAYER}
			maxBounds={MAX_BOUNDS}
			maxZoom={7}
			zoomPosition="topright"
		>
			<MapEvents
				setZoom={setZoom}
			/>
			<WorldGeometry
				hierarchy={hierarchy}
				map={map}
				zoom={zoom}
				data={data}
				setBounds={setBounds}
				setHierarchy={setHierarchy}
				setLocationFilters={setLocationFilters}
				locationFilters={locationFilters}
			/>
			<ActiveRegions
				showRegions={showRegions}
				activeData={activeData}
				setBounds={setBounds}
				setLocationFilters={setLocationFilters}
				map={map}
				setHierarchy={setHierarchy}
			/>
			{showPorts
			&& portsData.map((item) => {
				const position = (JSON.parse(item?.loc || item?.geometry)?.coordinates || []).reverse();
				return (
					<CircleMarker
						center={position}
						key={item?.id}
						{...MARKER_OPTIONS}
						eventHandlers={{
							click: () => {
								setLocationFilters((prev) => ({
									...prev,
									destination: {
										id: item.id, name: item?.name || item?.display_name, type: item?.type,
									},
								}));
								setHierarchy((prev) => ({ ...prev, port_id: item.id }));
								map.setView(
									position,
									MARKER_OPTIONS.radius,
									{ paddingTopLeft: [paddingTopLeft, GLOBAL_CONSTANTS.zeroth_index] },
								);
							},
						}}
					>
						<Tooltip
							direction="top"
							sticky
						>
							{item?.name}
						</Tooltip>
					</CircleMarker>
				);
			})}

			{!isEmpty(hierarchy) && (
				<ButtonIcon
					size="md"
					icon={<IcMArrowBack />}
					themeType="primary"
					className={styles.refresh_btn}
					onClick={handleBackHierarchy}
				/>
			)}

			<CustomLegend
				items={ITEMS}
				className={styles.legend}
			/>

			{showLoading && <Loader className={styles.loader} />}

		</CogoMaps>
	);
}

export default Map;
