import { isEmpty } from '@cogoport/utils';
import React, { useEffect } from 'react';

import { globeMarker } from '../../../../configurations/globe-marker';
// import { pointBinData } from '../../../../configurations/point-bin-data';
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
	const first_coordinate = markerData[0] || {};
	const { latitude:country_lat = 0, longitude:country_lng = 0 } = country || {};

	const CountryLocation = { lat: country_lat, lng: country_lng, altitude: 1.8 };
	const defaultMapCenter = { lat: 0, lng: 78, altitude: 1.8 };
	const pointRotationSpeed = 100;
	const CountryMobileCode = country?.mobile_country_code || '';

	let Globe = () => {};
	// eslint-disable-next-line global-require
	if (typeof window !== 'undefined') Globe = require('react-globe.gl').default;

	const colorMode = 'light';

	// Globe Methods ------------------------------------------------------------------------------

	useEffect(() => {
		if (!isEmpty(globeGL?.current)) {
			globeGL.current.controls().autoRotate = true;
			globeGL.current.controls().autoRotateSpeed = 0.5;
			globeGL.current.renderer().alpha = true;
			globeGL.current.controls().maxDistance = globeGL.current.getGlobeRadius() * 4;
			globeGL.current.controls().minDistance = globeGL.current.getGlobeRadius() * 2.35;
		}
	}, [globeGL?.current]);

	useEffect(() => {
		// experiments
		if (!isEmpty(globeGL?.current?.scene()?.children[2]?.visible
			&& !isEmpty(globeGL?.current?.scene()?.children[1]?.intensity)
			&& !isEmpty(globeGL?.current?.scene()?.children[2]?.intensity))) {
			globeGL.current.scene().children[1].intensity = 1.25;
			globeGL.current.scene().children[2].intensity = 0.25;
		}
	}, [globeGL?.current, CountryMobileCode, circleTab, date]);

	// Globe Functions

	const startRotation = () => {
		if (!isEmpty(globeGL?.current)) {
			globeGL.current.controls().autoRotateSpeed = 0.5;
		}
	};
	const stopRotation = () => {
		if (!isEmpty(globeGL?.current)) {
			globeGL.current.controls().autoRotateSpeed = 0;
		}
	};
	const setLocation = (locationData = {}, rotationSpeed = 0) => {
		if (!isEmpty(globeGL?.current)) {
			globeGL.current.pointOfView(locationData, rotationSpeed);
		}
	};

	// Handling Rotate and point of view

	setLocation(first_coordinate, pointRotationSpeed);

	useEffect(() => {
		if (!isEmpty(country)) {
			setLocation(CountryLocation, pointRotationSpeed);
			stopRotation();
		} else {
			setLocation(defaultMapCenter, pointRotationSpeed);
			startRotation();
		}
	}, [CountryMobileCode]);

	const markerSize = () => {
		if (markerData?.length > 800) {
			return '5px';
		} if (markerData?.length > 4000) {
			return '3px';
		}
		return '10px';
	};

	const markers = markerData?.length > 5000 ? markerData.slice(0, 5000) : markerData;

	const hexBinProps = {
		hexBinPointsData         : markers,
		hexAltitude              : 0.002,
		hexBinResolution         : 3,
		hexTopColor              : () => 'rgba(214, 179, 0, 1)',
		hexSideColor             : () => 'rgba(252, 220, 0, 1)',
		hexBinMerge              : true,
		enablePointerInteraction : true,
	};
	const htmlMarkerProps = {
		htmlElementsData       : markers,
		htmlTransitionDuration : 2000,
		htmlElement            : () => {
			// eslint-disable-next-line no-undef
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
				ref={globeGL}
				waitForGlobeReady
				backgroundColor={GLOBE_COLORS[colorMode].bg}
				atmosphereColor={GLOBE_COLORS[colorMode].atmos}
				animateIn
				showAtmosphere
				atmosphereAltitude={0.1}
				globeImageUrl={TEXTURES[colorMode].two}
				// {...hexBinProps}
				{...htmlMarkerProps}

			/>

		</div>

	);
}

export default TheGLobe;
