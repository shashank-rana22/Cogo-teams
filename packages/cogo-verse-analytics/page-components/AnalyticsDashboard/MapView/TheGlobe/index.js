
import React, { useState, useEffect, useRef } from 'react';

// import Points from '../../../../configurations/countries_points.json';
import { TEXTURES, GLOBE_COLORS } from '../../../../constants/globe-properties';
import { isEmpty } from '@cogoport/utils';
import styles from './styles.module.css';
import { pointBinData } from '../../../../configurations/point-bin-data';

function TheGLobe({country={}}) {

	const{lat:country_lat=0,lng:country_lng=0} = country || {};
	// const [primaryCountries, setPrimaryCountries] = useState({ features: [] });

	
	let Globe = () => null
	if (typeof window !== 'undefined') Globe = require('react-globe.gl').default



	// useEffect(() => {
	// 	setPrimaryCountries(Points);
	// }, []);

	const globeGL = useRef();
	const colorMode = 'light';


	//Globe Methods ------------------------------------------------------------------------------

	const globeMethods = globeGL?.current;
	console.log("globeMethods", globeMethods)


	// Auto-rotate
	globeMethods?.controls().autoRotate = true;
	globeMethods?.controls().autoRotateSpeed = 0.3;


	//Globe Functions
	const startRotation = ()=>{
		globeMethods?.controls().autoRotateSpeed = 0.3;
	}
	const stopRotation = ()=>{
		globeMethods?.controls().autoRotateSpeed = 0;
	}

	const setLocation = (locationData= {}, rotationSpeed= 0 ) => {
		globeMethods?.pointOfView(locationData, rotationSpeed);
	}


	//Handling Rotate and point of view

	const CountryLocation = {lat:country_lat,lng:country_lng};
	const defaultMapCenter = {lat:0,lng:0};
	console.log("CountryLocation", CountryLocation);
	const pointRotationSpeed = 100;

	useEffect(()=>{
		if(!isEmpty(country)){
			setLocation(CountryLocation, pointRotationSpeed);
			stopRotation();
			return;
		}
		setLocation(defaultMapCenter, pointRotationSpeed);
		startRotation();
			
	},[country])
			

	// Camera
	globeMethods?.camera().zoom=1.2;

	//Alpha
	globeMethods?.renderer().alpha =true;
	console.log("globeMethods?.renderer() alpha", globeMethods?.renderer().getClearAlpha() )

	



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

				// hexPolygonsData={primaryCountries.features}
				// hexPolygonResolution={3}
				// hexPolygonMargin={0.5}
				// hexPolygonColor={() => `${GLOBE_COLORS[colorMode].hex}`}
				// hexPolygonCurvatureResolution={6}

				hexBinPointsData={pointBinData}
				hexAltitude={0.001}
				hexBinResolution={3}
				hexTopColor={() => "rgba(114, 120, 173, 0.2)"}
				hexSideColor={() => "rgba(114, 120, 173, 0.2)"}
				hexBinMerge={true}
				enablePointerInteraction={true}

			/>

		</div>

	);
}

export default TheGLobe;
