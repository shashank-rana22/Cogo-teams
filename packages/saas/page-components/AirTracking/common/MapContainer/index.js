import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

import { getLoadingText, LOADING_TEXT_COUNT } from '../../constant/loadingText';
import useGetMapRoute from '../../hooks/useGetMapRoute';

import styles from './styles.module.css';

import { Image, dynamic } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

const CogoMaps = dynamic(() => import('./MapsComp'), { ssr: false });

function MapContainer({ height = '60vh', data = {}, activeTab }) {
	const { list } = data || {};

	const { t } = useTranslation(['common', 'airOceanTracking']);

	const LOADING_TEXT = getLoadingText({ t });

	const [count, setCount] = useState(0);

	const { loading, allRoute } = useGetMapRoute({ trackingInfo: list, type: activeTab });

	useEffect(() => {
		if (loading && count >= 0) {
			const timeout = setTimeout(() => {
				setCount((prev) => {
					if (prev === LOADING_TEXT_COUNT) return 0;
					return prev + 1;
				});
			}, 6500);

			return () => {
				clearTimeout(timeout);
			};
		}
		return () => {};
	}, [count, loading]);

	return (
		<div className={styles.container}>
			<CogoMaps height={height} allPoints={allRoute} type={activeTab} />
			{loading && (
				<div className={styles.loader_container}>
					<div className={styles.loading_content}>
						<Image src={GLOBAL_CONSTANTS.image_url.tracking_loader} width={200} height={40} alt="loading" />
						<p>{LOADING_TEXT[count]}</p>
					</div>
					<div className={styles.modal} />
				</div>
			)}
		</div>
	);
}
export default MapContainer;
