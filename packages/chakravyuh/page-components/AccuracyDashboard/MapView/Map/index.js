import { ButtonIcon, Loader } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowBack } from '@cogoport/icons-react';
import { CogoMaps, GeoJSON, L, Tooltip } from '@cogoport/maps';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect, useRef } from 'react';
import ReactDOMServer from 'react-dom/server';

import CustomLegend from '../../../../common/Legend';
import MapTooltip from '../../../../common/MapTooltip';
import {
	BASE_LAYER, LAYOUT_WIDTH, TIME_LIMIT,
	MAX_BOUNDS, ITEMS, SECOND_IDX,
} from '../../../../constants/map_constants';
import { formatBigNumbers } from '../../../../utils/formatBigNumbers';
import { getLowestHierarchy, HIERARCHY_MAPPING } from '../../../../utils/hierarchy-utils';
import { getPolygonStyleProps } from '../../../../utils/map-utils';
// import useGetSimplifiedGeometry from '../../../../hooks/useGetSimplifiedGeometry';
// import ActiveRegions from './ActiveRegions';
import { COLORS } from '../../Heading/BirdsEyeView';

import Point from './AnimatedPoint';
import styles from './styles.module.css';
import WorldGeometry from './WorldGeometry';

const CENTER_LNG = 20;
const INITIAL_ZOOM = 2;
const K = 0.0001;

function Map({
	data = [],
	bounds = null,
	hierarchy = {},
	isFull = false,
	loading = false,
	activeList = [],
	currentId = null,
	accuracyMapping = {},
	setBounds = () => {},
	locationFilters = { },
	setHierarchy = () => {},
	setActiveList = () => {},
	setLocationFilters = () => {},
	accuracyLoading = false,
	handleBackHierarchy = () => {},
	filterBy = '',
}) {
	const [map, setMap] = useState(null);
	const activeRef = useRef(null);

	const minCount = Math.min(...Object.values(accuracyMapping));
	const maxCount = Math.max(...Object.values(accuracyMapping));
	const range = (minCount === maxCount && !!maxCount)
		? maxCount / COLORS.length
		: K + (maxCount - minCount) / COLORS.length;
	const lowestHierarchy = getLowestHierarchy(hierarchy);
	// const requiredType = getChildHierarchy(lowestHierarchy, hierarchy);
	// const type = requiredType && (requiredType !== 'port_id' && requiredType !== 'country_id')
	// 	? requiredType.split('_')[GLOBAL_CONSTANTS.zeroth_index] : null;

	const originId = locationFilters.origin?.id;

	// const { data: activeData = [], loading: activeLoading } = useGetSimplifiedGeometry({
	// 	country_id   : hierarchy?.country_id,
	// 	continent_id : hierarchy?.continent_id,
	// 	type,
	// });

	// const showRegions = !isEmpty(activeData)
	// 						&& HIERARCHY_MAPPING.region_id >= HIERARCHY_MAPPING[lowestHierarchy] - SECOND_IDX;
	const showPorts = HIERARCHY_MAPPING[lowestHierarchy] <= SECOND_IDX;
	const showLoading = loading;
	const originPosition = locationFilters?.origin?.latitude
		? [locationFilters.origin.latitude, locationFilters.origin.longitude] : null;
	const originLocation = [...data]
		.filter(({ id }) => id === locationFilters.origin.id)?.[GLOBAL_CONSTANTS.zeroth_index];

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
		const paddingTopLeft = isFull ? GLOBAL_CONSTANTS.zeroth_index : LAYOUT_WIDTH;
		const paddingOptions = { paddingTopLeft: [paddingTopLeft, GLOBAL_CONSTANTS.zeroth_index] };

		if (map && cachedRef) {
			if (cachedRef instanceof L.GeoJSON) {
				const features = cachedRef.getLayers();
				const firstFeature = features[GLOBAL_CONSTANTS.zeroth_index];
				firstFeature.openTooltip();
				map.flyToBounds(firstFeature.getBounds(), { ...paddingOptions, maxZoom: 3 });
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
	}, [activeRef, isFull, setBounds, currentId, map]);

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
				filterBy={filterBy}
				key={accuracyLoading}
				minCount={minCount}
				maxCount={maxCount}
				range={range}
			/>
			{/* <ActiveRegions
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
			/> */}
			{showPorts
			&& activeList.map((item) => {
				const position = [item.destination_latitude, item.destination_longitude];
				const fillColor = COLORS[Math.floor((accuracyMapping[item.destination_id] - minCount) / range)];
				const value = filterBy.includes('accuracy')
					? (accuracyMapping[item.destination_id] || GLOBAL_CONSTANTS.zeroth_index).toFixed(INITIAL_ZOOM)
					: formatBigNumbers(accuracyMapping[item.destination_id]);
				const { color, accuracy } = getPolygonStyleProps(accuracyMapping[item.destination_id]);

				return (
					<Point
						key={item.destination_id}
						position={position}
						ref={currentId === item.destination_id ? activeRef : null}
						className={filterBy.includes('accuracy') ? styles[accuracy] : styles[`color_${fillColor}`]}
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
							<MapTooltip
								display_name={item.destination_name}
								color={filterBy.includes('accuracy') ? color : fillColor}
								value={value}
								value_key=""
								value_suffix={filterBy.includes('accuracy') ? '%' : ''}
							/>
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
			{showLoading && (
				<div className={styles.loader_container}>
					<Loader className={styles.loader} />
				</div>
			)}
			{!isEmpty(originLocation)
				&& (
					<GeoJSON
						key={originLocation?.id}
						data={JSON.parse(originLocation.geometry)}
						onEachFeature={(feature, layer) => {
							layer?.setStyle({
								weight      : 1.5,
								fillOpacity : 0,
								opacity     : 0.7,
								color       : '#424242',
							});

							layer.bindTooltip(
								ReactDOMServer.renderToString(
									<MapTooltip
										display_name={originLocation?.name}
									/>,
								),
								{ sticky: true, direction: 'top' },
							);
						}}
					/>
				)}

		</CogoMaps>
	);
}

export default Map;
