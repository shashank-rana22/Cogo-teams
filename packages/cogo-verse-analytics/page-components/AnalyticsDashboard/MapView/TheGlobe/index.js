
import React, { useState, useEffect, useRef } from 'react';

import Points from '../../../../configurations/countries_points.json';
import { TEXTURES, GLOBE_COLORS } from '../../../../constants/globe-properties';

import styles from './styles.module.css';

function TheGLobe() {
	const [countries, setCountries] = useState({ features: [] });

	let Globe = () => null
	if (typeof window !== 'undefined') Globe = require('react-globe.gl').default



	useEffect(() => {
		setCountries(Points);
	}, []);

	const globeGL = useRef();
	const colorMode = 'light';

	const globeMethods = globeGL?.current;

	// Auto-rotate
	globeMethods?.controls().autoRotate = true;
	globeMethods?.controls().autoRotateSpeed = 0.35;

	//Camera
	console.log('camera',globeMethods?.camera());
	globeMethods?.camera().zoom=1.2;
	



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
				globeImageUrl={TEXTURES[colorMode].one}
				hexPolygonsData={countries.features}
				hexPolygonResolution={3}
				hexPolygonMargin={0.5}
				hexPolygonColor={() => `${GLOBE_COLORS[colorMode].hex}`}
				hexPolygonCurvatureResolution={6}

			/>

		</div>

	);
}

export default TheGLobe;
