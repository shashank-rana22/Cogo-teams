import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useCallback, useMemo } from 'react';

import { globeMarker } from '../../../../configurations/globe-marker';
import { TEXTURES, GLOBE_COLORS } from '../../../../constants/globe-properties';

import styles from './styles.module.css';

function TheGLobe(
	{
		country = {},
		globeGL = {},
		markerData = [],
		circleTab = '',
		date = {},

	},
) {
	const globeRef = globeGL;
	const first_coordinate = markerData[0] || {};
	const { latitude:country_lat = 0, longitude:country_lng = 0 } = country || {};

	const countryLocation = useMemo(() => (
		{ lat: country_lat, lng: country_lng, altitude: 1.8 }), [country_lat, country_lng]);
	const defaultMapCenter = useMemo(() => ({ lat: 0, lng: 78, altitude: 1.8 }), []);
	const pointRotationSpeed = 100;
	const countryMobileCode = country?.mobile_country_code || '';

	let Globe = () => {};
	// eslint-disable-next-line global-require
	if (typeof window !== 'undefined') Globe = require('react-globe.gl').default;

	const colorMode = 'light';
	useEffect(() => {
		if (!isEmpty(globeRef?.current)) {
			globeRef.current.controls().autoRotate = true;
			globeRef.current.controls().autoRotateSpeed = 0.5;
			globeRef.current.renderer().alpha = true;
			globeRef.current.controls().maxDistance = globeRef.current.getGlobeRadius() * 4;
			globeRef.current.controls().minDistance = globeRef.current.getGlobeRadius() * 2.35;
		}
	}, [globeRef]);

	useEffect(() => {
		if (!isEmpty(globeRef?.current?.scene()?.children[2]?.visible
			&& !isEmpty(globeRef?.current?.scene()?.children[1]?.intensity)
			&& !isEmpty(globeRef?.current?.scene()?.children[2]?.intensity))) {
			globeRef.current.scene().children[1].intensity = 1.25;
			globeRef.current.scene().children[2].intensity = 0.25;
		}
	}, [globeRef, countryMobileCode, circleTab, date]);

	const startRotation = useCallback(() => {
		if (!isEmpty(globeRef?.current)) {
			globeRef.current.controls().autoRotateSpeed = 0.5;
		}
	}, [globeRef]);

	const stopRotation = useCallback(() => {
		if (!isEmpty(globeRef?.current)) {
			globeRef.current.controls().autoRotateSpeed = 0;
		}
	}, [globeRef]);

	const setLocation = useCallback((locationData = {}, rotationSpeed = 0) => {
		if (!isEmpty(globeRef?.current)) {
			globeRef.current.pointOfView(locationData, rotationSpeed);
		}
	}, [globeRef]);

	setLocation(first_coordinate, pointRotationSpeed);

	useEffect(() => {
		if (!isEmpty(country)) {
			setLocation(countryLocation, pointRotationSpeed);
			stopRotation();
		} else {
			setLocation(defaultMapCenter, pointRotationSpeed);
			startRotation();
		}
	}, [country, countryLocation, defaultMapCenter, setLocation, startRotation, stopRotation, countryMobileCode]);

	const markerSize = () => {
		if (markerData?.length > 1200) {
			return '7px';
		} if (markerData?.length > 2000) {
			return '3px';
		}
		return '10px';
	};

	const markers = markerData?.length > 3000 ? markerData.slice(0, 3000) : markerData;

	const htmlMarkerProps = {
		htmlElementsData       : markers,
		htmlTransitionDuration : 2000,
		htmlElement            : () => {
			const el = document?.createElement('div');
			el.innerHTML = globeMarker;
			el.style.color = 'rgba(252, 220, 0, 1)';
			el.style.width = markerSize();
			el.style['pointer-events'] = 'auto';
			el.style.cursor = 'default';
			return el;
		},
	};

	return (
		<div className={styles.globe_container}>

			<Globe
				width={480}
				height={480}
				ref={globeRef}
				waitForGlobeReady
				backgroundColor={GLOBE_COLORS[colorMode].bg}
				atmosphereColor={GLOBE_COLORS[colorMode].atmos}
				animateIn
				showAtmosphere
				atmosphereAltitude={0.1}
				globeImageUrl={TEXTURES[colorMode].two}
				{...htmlMarkerProps}

			/>

		</div>

	);
}

export default TheGLobe;
