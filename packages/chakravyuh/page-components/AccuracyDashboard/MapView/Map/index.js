import { ButtonIcon, Loader } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowBack } from '@cogoport/icons-react';
import { CogoMaps, L, Tooltip } from '@cogoport/maps';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect, useRef } from 'react';

import CustomLegend from '../../../../common/Legend';
import { BASE_LAYER, LAYOUT_WIDTH, TIME_LIMIT, MAX_BOUNDS, ITEMS, ONE } from '../../../../constants/map_constants';
import useGetSimplifiedGeometry from '../../../../hooks/useGetSimplifiedGeometry';
import useListLocations from '../../../../hooks/useListLocations';
import { getChildHierarchy, getLowestHierarchy, HIERARCHY_MAPPING } from '../../../../utils/hierarchy-utils';

import ActiveRegions from './ActiveRegions';
import Point from './AnimatedPoint';
import MapEvents from './MapEvents';
import styles from './styles.module.css';
import WorldGeometry from './WorldGeometry';

const CENTER_LNG = 20;
const INITIAL_ZOOM = 2;

function Map({
	isFull = false, bounds = null, data = [], loading = false, setBounds = () => {},
	locationFilters = { }, setActiveList = () => {}, currentId = null,
	setLocationFilters = () => { }, hierarchy = {}, setHierarchy = () => {}, handleBackHierarchy = () => {},
}) {
	const [map, setMap] = useState(null);
	const [zoom, setZoom] = useState(GLOBAL_CONSTANTS.zeroth_index);
	const activeRef = useRef(null);

	const lowestHierarchy = getLowestHierarchy(hierarchy);
	const requiredType = getChildHierarchy(lowestHierarchy, hierarchy);
	const type = requiredType && (requiredType !== 'port_id' && requiredType !== 'country_id')
		? requiredType.split('_')[GLOBAL_CONSTANTS.zeroth_index] : null;

	const originId = locationFilters.origin?.id;

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
	const originPosition = locationFilters?.origin?.latitude
		? [locationFilters.origin.latitude, locationFilters.origin.longitude] : null;

	useEffect(() => {
		const timeout = setTimeout(() => { if (map)map.invalidateSize(true); }, TIME_LIMIT);
		return () => {
			clearTimeout(timeout);
		};
	}, [map, isFull]);

	useEffect(() => {
		if (!map) return;
		const paddingTopLeft = isFull ? GLOBAL_CONSTANTS.zeroth_index : LAYOUT_WIDTH;
		const paddingOptions = { paddingTopLeft: [paddingTopLeft, GLOBAL_CONSTANTS.zeroth_index] };

		if (isEmpty(hierarchy)) {
			map.setView(
				[INITIAL_ZOOM * CENTER_LNG, CENTER_LNG],
				INITIAL_ZOOM,
				paddingOptions,
			);
		} else if (bounds instanceof L.LatLngBounds) {
			map.flyToBounds(bounds, { ...paddingOptions, duration: 0.5 });
		}
	}, [bounds, map, isFull, hierarchy]);

	useEffect(() => {
		const cachedRef = activeRef?.current;
		if (map && cachedRef) {
			if (cachedRef instanceof L.GeoJSON) {
				const features = cachedRef.getLayers();
				features[GLOBAL_CONSTANTS.zeroth_index]?.openTooltip();
			} else {
				cachedRef.openTooltip();
			}
		}
		return () => {
			if (cachedRef && map) {
				if (cachedRef instanceof L.GeoJSON) {
					const features = cachedRef.getLayers();
					features[GLOBAL_CONSTANTS.zeroth_index]?.closeTooltip();
				} else {
					cachedRef.closeTooltip();
				}
			}
		};
	}, [activeRef, setBounds, currentId, map]);

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
				data={data.filter(({ id }) => id !== originId)}
				ref={activeRef}
				setBounds={setBounds}
				setHierarchy={setHierarchy}
				setLocationFilters={setLocationFilters}
				locationFilters={locationFilters}
				currentId={currentId}
			/>
			<ActiveRegions
				showRegions={showRegions}
				activeData={activeData.filter(({ id }) => id !== originId)}
				setBounds={setBounds}
				setLocationFilters={setLocationFilters}
				map={map}
				ref={activeRef}
				currentId={currentId}
				hierarchy={hierarchy}
				setHierarchy={setHierarchy}
			/>
			{showPorts
			&& portsData.map((item) => {
				const position = (JSON.parse(item?.loc || item?.geometry)?.coordinates || []).reverse();
				return (
					<Point
						key={item.id}
						position={position}
						ref={currentId === item.id ? activeRef : null}
						eventHandlers={{
							click: (e) => {
								L.DomEvent.stopPropagation(e);
								const markerBounds = new L.LatLngBounds([position]);

								setLocationFilters((prev) => ({
									...prev,
									destination: {
										id: item.id, name: item?.name || item?.display_name, type: item?.type,
									},
								}));
								setHierarchy((prev) => ({ ...prev, port_id: item.id }));
								setBounds(markerBounds);
							},
						}}
					>
						<Tooltip
							direction="top"
							sticky
						>
							{item?.name}
						</Tooltip>
					</Point>
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

			{originPosition && <Point position={originPosition} animate />}
			{showLoading && <Loader className={styles.loader} />}

		</CogoMaps>
	);
}

export default Map;
