import { ButtonIcon, cl, Loader } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowBack } from '@cogoport/icons-react';
import { CogoMaps, GeoJSON, L } from '@cogoport/maps';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useEffect, useRef } from 'react';
import ReactDOMServer from 'react-dom/server';

import CustomLegend from '../../../../common/Legend';
import MapTooltip from '../../../../common/MapTooltip';
import {
	BASE_LAYER, LAYOUT_WIDTH, TIME_LIMIT,
	MAX_BOUNDS, ITEMS,
} from '../../../../constants/map_constants';
import { formatBigNumbers } from '../../../../utils/formatBigNumbers';
import { COLORS } from '../../Heading/BirdsEyeView';

import ActivePorts from './ActivePorts';
import Point from './AnimatedPoint';
import styles from './styles.module.css';
import WorldGeometry from './WorldGeometry';

const CENTER_LNG = 20;
const INITIAL_ZOOM = 2;
const ACTIVE_SIZE = 14;
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
		: K + (maxCount - minCount) / (COLORS.length - 1);
	const originId = locationFilters.origin?.id;
	const showLoading = loading || accuracyLoading;
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
				minCount={minCount}
				maxCount={maxCount}
				range={range}
			/>
			<ActivePorts
				ref={activeRef}
				activeList={activeList}
				accuracyMapping={accuracyMapping}
				filterBy={filterBy}
				hierarchy={hierarchy}
				minCount={minCount}
				maxCount={maxCount}
				range={range}
				currentId={currentId}
				setBounds={setBounds}
				setLocationFilters={setLocationFilters}
				setHierarchy={setHierarchy}
			/>
			{!isEmpty(hierarchy) && (
				<ButtonIcon
					size="md"
					icon={<IcMArrowBack />}
					themeType="primary"
					className={styles.refresh_btn}
					onClick={handleBackHierarchy}
				/>
			)}
			{originPosition && (
				<Point
					position={originPosition}
					animate
					size={[ACTIVE_SIZE, ACTIVE_SIZE]}
				/>
			)}
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
			{filterBy.includes('accuracy') ? (
				<CustomLegend
					items={ITEMS}
					className={styles.legend}
				/>
			)
				: (
					<div className={cl`${styles.legend} ${styles.legend_container}`}>
						<div className={styles.count_legend}>
							{(!!maxCount && Math.abs(maxCount) !== Infinity) && COLORS.map((color, idx) => (
								<p key={color}>
									{formatBigNumbers(minCount + (range * idx))}
								</p>
							))}
						</div>
					</div>
				)}
		</CogoMaps>
	);
}

export default Map;
