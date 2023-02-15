import { dynamic } from '@cogoport/next';
import React, { useState, useEffect, useRef } from 'react';

import Points from '../../../../configurations/countries_points.json';
import { TEXTURES, GLOBE_COLORS } from '../../../../constants/globe-properties';

import styles from './styles.module.css';

function TheGLobe() {
	const [countries, setCountries] = useState({ features: [] });
	const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

	useEffect(() => {
		setCountries(Points);
	}, []);

	const globeGL = useRef();
	const colorMode = 'light';

	return (
		<div className={styles.globe_container}>

			<Globe
				width="500px"
				height="500px"
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
