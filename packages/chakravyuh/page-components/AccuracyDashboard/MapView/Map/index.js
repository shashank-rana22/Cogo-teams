import { ButtonIcon, Loader } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowBack } from '@cogoport/icons-react';
import { CogoMaps, L, Tooltip } from '@cogoport/maps';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect, useRef } from 'react';

import CustomLegend from '../../../../common/Legend';
import { BASE_LAYER, LAYOUT_WIDTH, TIME_LIMIT, MAX_BOUNDS, ITEMS, ONE } from '../../../../constants/map_constants';
import useGetSimplifiedGeometry from '../../../../hooks/useGetSimplifiedGeometry';
import { getChildHierarchy, getLowestHierarchy, HIERARCHY_MAPPING } from '../../../../utils/hierarchy-utils';

import ActiveRegions from './ActiveRegions';
import Point from './AnimatedPoint';
import styles from './styles.module.css';
import WorldGeometry from './WorldGeometry';

const CENTER_LNG = 20;
const INITIAL_ZOOM = 2;

function Map({
	isFull = false,
	bounds = null,
	data = [],
	loading = false,
	setBounds = () => {},
	locationFilters = { },
	currentId = null,
	activeList = [],
	accuracyMapping = {},
	setActiveList = () => {},
	setLocationFilters = () => { },
	hierarchy = {},
	setHierarchy = () => {},
	handleBackHierarchy = () => {},
}) {
	const [map, setMap] = useState(null);
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
	});

	const showRegions = !isEmpty(activeData) && HIERARCHY_MAPPING.region_id >= HIERARCHY_MAPPING[lowestHierarchy] - ONE;
	const showPorts = HIERARCHY_MAPPING.port_id + ONE >= HIERARCHY_MAPPING[lowestHierarchy];

	const showLoading = loading || activeLoading;
	const originPosition = locationFilters?.origin?.latitude
		? [locationFilters.origin.latitude, locationFilters.origin.longitude] : null;

	const getFilteredData = (dataToProcess) => dataToProcess.filter(({ id }) => id !== originId
				&& (activeList.some(({ destination_id }) => id === destination_id)
				|| Object.values(hierarchy).some((val) => id === val)));

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
			<WorldGeometry
				map={map}
				ref={activeRef}
				currentId={currentId}
				setBounds={setBounds}
				hierarchy={hierarchy}
				setHierarchy={setHierarchy}
				data={getFilteredData(data)}
				setActiveList={setActiveList}
				accuracyMapping={accuracyMapping}
				setLocationFilters={setLocationFilters}
			/>
			<ActiveRegions
				ref={activeRef}
				setBounds={setBounds}
				currentId={currentId}
				hierarchy={hierarchy}
				showRegions={showRegions}
				setHierarchy={setHierarchy}
				setActiveList={setActiveList}
				accuracyMapping={accuracyMapping}
				setLocationFilters={setLocationFilters}
				activeData={getFilteredData(activeData)}
			/>
			{showPorts
			&& activeList.map((item) => {
				const position = [item.destination_latitude, item.destination_longitude];
				return (
					<Point
						key={item.destination_id}
						position={position}
						ref={currentId === item.destination_id ? activeRef : null}
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
									setActiveList([]);
								}
							},
						}}
					>
						<Tooltip
							direction="top"
							sticky
						>
							{item?.destination_name}
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
