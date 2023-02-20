import { isEmpty } from '@cogoport/utils';
import React, { useEffect } from 'react';

import { pointBinData } from '../../../../configurations/point-bin-data';
import { TEXTURES, GLOBE_COLORS } from '../../../../constants/globe-properties';

import styles from './styles.module.css';

function TheGLobe(
	{
		country = {},
		globeLoading = false,
		pointsList = {},
		globeGL = {},
	},
) {
	console.log('pointsList', pointsList);
	const { latitude:country_lat = 0, longitude:country_lng = 0 } = country || {};

	let Globe = () => {};
	// eslint-disable-next-line global-require
	if (typeof window !== 'undefined') Globe = require('react-globe.gl').default;

	// console.log('globeGL scene', globeGL?.current?.scene());

	const colorMode = 'light';

	// Globe Methods ------------------------------------------------------------------------------

	if (!isEmpty(globeGL.current)) {
		globeGL.current.controls().autoRotate = true;
		globeGL.current.controls().autoRotateSpeed = 0.5;
		globeGL.current.renderer().alpha = true;
		globeGL.current.controls().maxDistance = globeGL.current.getGlobeRadius() * 4;
		globeGL.current.controls().minDistance = globeGL.current.getGlobeRadius() * 2.25;
	}

	// experiments
	// console.log('globeGL?.current?.scene()?.children', globeGL?.current?.scene()?.children, !isEmpty(globeGL?.current?.scene()?.children));
	// if (!isEmpty(globeGL?.current?.scene()?.children)) {
	// 	console.log('I came in');
	// 	globeGL.current.scene().children[2].visible = true;
	// 	globeGL.current.scene().children[1].intensity = 1.25;
	// 	globeGL.current.scene().children[2].intensity = 0.25;
	// }

	// Globe Functions

	const startRotation = () => {
		if (!isEmpty(globeGL.current)) {
			globeGL.current.controls().autoRotateSpeed = 0.5;
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

	const markerSvg = `<svg viewBox="-4 0 36 36">
    <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
    <circle fill="#8F7700" cx="14" cy="14" r="7"></circle>
  </svg>`;

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
				// hexBinPointsData={pointBinData}
				// hexAltitude={0.010}
				// hexBinResolution={3}
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
				htmlElementsData={pointBinData}
				htmlElement={(d) => {
					// console.log('d', d);
					// eslint-disable-next-line no-undef
					const el = document?.createElement('div');
					el.innerHTML = markerSvg;
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
