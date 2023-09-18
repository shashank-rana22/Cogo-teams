import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Container, Loader, MapUnable } from './styles';

const CogoMaps = dynamic(() => import('./MapsComp'), { ssr: false });

function Map({ milestoneData = {} }) {
	const [curvePoints, setCurvePoints] = useState([]);

	const [mapPoints, setMapPoints] = useState([]);

	const origin = milestoneData.origin_location || {};
	const destination = milestoneData.destination_location || {};

	useEffect(() => {
		const originLength = Object.keys(origin).length;
		const destinationlength = Object.keys(destination).length;
		if (originLength > 0 && destinationlength > 0) {
			setMapPoints([
				{
					departureLatitude: origin?.latitude,
					departureLongitude: origin?.longitude,
					arrivalLatitude: destination?.latitude,
					arrivalLongitude: destination?.longitude,
				},
			]);
		}
	}, [JSON.stringify(origin), JSON.stringify(destination)]);

	useEffect(() => {
		if (Array.isArray(mapPoints) && mapPoints.length > 0) {
			mapPoints.map((pt) => {
				if (
					![
						pt.arrivalLatitude,
						pt.arrivalLongitude,
						pt.departureLatitude,
						pt.departureLongitude,
					].includes(null) &&
					![
						pt.arrivalLatitude,
						pt.arrivalLongitude,
						pt.departureLatitude,
						pt.departureLongitude,
					].includes(undefined)
				) {
					setCurvePoints(milestoneData.lat_log);
					return true;
				}
				return false;
			});
		} else if (mapPoints.length === 0) {
			setCurvePoints([]);
		}
	}, [JSON.stringify(mapPoints)]);

	return (
		<Container>
			<CogoMaps
				plotPoints={curvePoints}
				origin={origin}
				destination={destination}
			/>
			{curvePoints.length === 0 && (
				<Loader>
					<MapUnable>Unable to load map for this shipment</MapUnable>
				</Loader>
			)}
		</Container>
	);
}

export default Map;
