import { isEmpty } from '@cogoport/utils';
import React, { useEffect, useRef } from 'react';

import { pointBinData } from '../../../../configurations/point-bin-data';
import { TEXTURES, GLOBE_COLORS } from '../../../../constants/globe-properties';

import styles from './styles.module.css';

function TheGLobe({ country = {} }) {
	const { lat:country_lat = 0, lng:country_lng = 0 } = country || {};

	let Globe = () => {};
	// eslint-disable-next-line global-require
	if (typeof window !== 'undefined') Globe = require('react-globe.gl').default;

	const globeGL = useRef(null);

	const colorMode = 'light';

	// Globe Methods ------------------------------------------------------------------------------

	if (!isEmpty(globeGL.current)) {
		globeGL.current.controls().autoRotate = true;
		globeGL.current.controls().autoRotateSpeed = 0.3;

		globeGL.current.camera().zoom = 1.2;

		globeGL.current.renderer().alpha = true;
	}

	// Globe Functions

	const startRotation = () => {
		if (!isEmpty(globeGL.current)) {
			globeGL.current.controls().autoRotateSpeed = 0.3;
		}
	};
	const stopRotation = () => {
		if (!isEmpty(globeGL.current)) {
			globeGL.current.controls().autoRotateSpeed = 0;
		}
	};
	const setLocation = (locationData = {}, rotationSpeed = 0) => {
		if (!isEmpty(globeGL.current)) {
			globeGL.current.pointOfView(locationData, rotationSpeed);
		}
	};

	// Handling Rotate and point of view

	const CountryLocation = { lat: country_lat, lng: country_lng };
	const defaultMapCenter = { lat: 0, lng: 0 };
	const pointRotationSpeed = 100;

	useEffect(() => {
		if (!isEmpty(country)) {
			setLocation(CountryLocation, pointRotationSpeed);
			stopRotation();
			return;
		}
		setLocation(defaultMapCenter, pointRotationSpeed);

		startRotation();
	}, [country]);

	console.log('globeGL?.current', globeGL);

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
				atmosphereAltitude={0.10}
				globeImageUrl={TEXTURES[colorMode].two}
				hexBinPointsData={pointBinData}
				hexAltitude={0.001}
				hexBinResolution={3}
				hexTopColor={() => 'rgba(114, 120, 173, 0.2)'}
				hexSideColor={() => 'rgba(114, 120, 173, 0.2)'}
				hexBinMerge
				enablePointerInteraction

			/>

		</div>

	);
}

export default TheGLobe;
