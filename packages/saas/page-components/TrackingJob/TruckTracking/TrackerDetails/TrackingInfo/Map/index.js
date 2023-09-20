import { isEmpty } from '@cogoport/utils';
import { useEffect, useMemo, useState } from 'react';

import useGetMapRoute from '../../../../hooks/useGetMapRoute';

import styles from './styles.module.css';

import { Image, dynamic } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const CogoMaps = dynamic(() => import('./MapComps'), { ssr: false });

function Map({
	data = {},
	trackingType = 'ocean',
	height = '80vh',
	points = [],
	trackingInfo = [],
	currContainerDetails = {},
}) {
	const [currentRoute, setCurrentRoute] = useState([]);

	const payloadMapping = useMemo(() => ({
		ocean : trackingInfo,
		air   : !isEmpty(data) ? [data] : [],
	}), [data, trackingInfo]);

	const { loading, allRoute = [] } = useGetMapRoute({
		trackingInfo : payloadMapping[trackingType],
		type         : trackingType,
	});

	useEffect(() => {
		if (!isEmpty(currContainerDetails)) {
			const currentTrackingInfo = allRoute.filter(
				(info) => info?.containerNo === currContainerDetails?.container_no
					|| info?.airWayNo === currContainerDetails?.airway_bill_no,
			)[0];

			setCurrentRoute(currentTrackingInfo?.route);
		}
	}, [allRoute, currContainerDetails]);

	return (
		<div className={styles.container}>
			<div className={isEmpty(points) ? styles.blur_screennnnn : ''}>
				<CogoMaps height={height} pointsArr={currentRoute} type={trackingType} />
			</div>
			{loading && (
				<div className={styles.loader_container}>
					<div className={styles.loading_content}>
						<Image src={GLOBAL_CONSTANTS.image_url.loading} width={100} height={100} alt="loading" />
					</div>
					<div className={styles.modal} />
				</div>
			)}
			{/* {isEmpty(points) && (
				<div className={styles.empty_state}>
					<h3>Unable to load map for this shipment</h3>
				</div>
			)} */}
		</div>
	);
}
export default Map;
