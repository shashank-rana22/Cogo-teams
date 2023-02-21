import { isEmpty } from '@cogoport/utils';
import React, { useEffect } from 'react';

import { globeMarker } from '../../../../configurations/globe-marker';
import { pointBinData } from '../../../../configurations/point-bin-data';
import { TEXTURES, GLOBE_COLORS } from '../../../../constants/globe-properties';

import styles from './styles.module.css';

function TheGLobe(
	{
		country = {},
		globeGL = {},
		markerData = [],
		globeLoading = false,

	},
) {
	const { latitude:country_lat = 0, longitude:country_lng = 0 } = country || {};

	let Globe = () => {};
	// eslint-disable-next-line global-require
	if (typeof window !== 'undefined') Globe = require('react-globe.gl').default;

	const colorMode = 'light';

	// Globe Methods ------------------------------------------------------------------------------

	if (!isEmpty(globeGL?.current)) {
		globeGL.current.controls().autoRotate = true;
		globeGL.current.controls().autoRotateSpeed = 0.5;
		globeGL.current.renderer().alpha = true;
		globeGL.current.controls().maxDistance = globeGL.current.getGlobeRadius() * 4;
		globeGL.current.controls().minDistance = globeGL.current.getGlobeRadius() * 2.35;
	}

	// experiments
	if (!isEmpty(globeGL?.current?.scene()?.children[2]?.visible
	 	&& !isEmpty(globeGL?.current?.scene()?.children[1]?.intensity)
		 && !isEmpty(globeGL?.current?.scene()?.children[2]?.intensity))) {
		globeGL.current.scene().children[2].visible = true;
		globeGL.current.scene().children[1].intensity = 1.25;
		globeGL.current.scene().children[2].intensity = 0.25;
	}

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

	const CountryLocation = { lat: country_lat, lng: country_lng };
	// eslint-disable-next-line no-unsafe-optional-chaining
	const defaultMapCenter = { lat: 0, lng: 0, altitude: 2 };
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
				// Hexbin
				// hexBinPointsData={markerData}
				// hexAltitude={0.010}
				// hexBinResolution={4}
				// hexTopColor={() => 'rgba(114, 120, 173, 1)'}
				// hexSideColor={() => 'rgba(206, 209, 237, 1)'}
				// hexBinMerge
				// enablePointerInteraction
				// Rings
				// ringsData={pointBinData}
				// ringColor={() => 'rgba(114, 120, 173, 1)'}
				// ringMaxRadius={4}
				// ringPropagationSpeed={2}
				// ringRepeatPeriod={600}
				// html
				htmlElementsData={markerData}
				htmlTransitionDuration={2000}
				htmlElement={(d) => {
					// console.log('d', d);
					// eslint-disable-next-line no-undef
					const el = document?.createElement('div');
					el.innerHTML = globeMarker;
					el.style.color = '#FCDC00';
					el.style.width = '10px';
					el.style['pointer-events'] = 'auto';
					el.style.cursor = 'pointer';

					el.onclick = () => console.info(d);
					return el;
				}}

			/>

		</div>

	);
}

export default TheGLobe;
