import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image, dynamic } from '@cogoport/next';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState, useMemo } from 'react';

import { getLoadingText, LOADING_TEXT_COUNT } from '../../constant/loadingText';
import useGetMapRoute from '../../hooks/useGetMapRoute';

import styles from './styles.module.css';

const CogoMaps = dynamic(() => import('./MapsComp'), { ssr: false });

const TIMEOUT = 6500;

function MapContainer({ height = '60vh', data = {}, activeTab }) {
	const { list } = data || {};

	const { t } = useTranslation(['common', 'airOceanTracking']);

	const loadingText = useMemo(() => getLoadingText({ t }), [t]);

	const [count, setCount] = useState(GLOBAL_CONSTANTS.zeroth_index);

	const { loading = false, allRoute = [] } = useGetMapRoute({ trackingInfo: list, type: activeTab });

	useEffect(() => {
		if (loading && count >= GLOBAL_CONSTANTS.zeroth_index) {
			const timeout = setTimeout(() => {
				setCount((prev) => {
					if (prev === LOADING_TEXT_COUNT) return GLOBAL_CONSTANTS.zeroth_index;
					return prev + GLOBAL_CONSTANTS.one;
				});
			}, TIMEOUT);

			return () => {
				clearTimeout(timeout);
			};
		}
		return () => {};
	}, [count, loading]);

	return (
		<div className={styles.container}>
			<CogoMaps height={height} allPoints={allRoute} type={activeTab} />
			{loading ? (
				<div className={styles.loader_container}>
					<div className={styles.loading_content}>
						<Image src={GLOBAL_CONSTANTS.image_url.tracking_loader} width={200} height={40} alt="loading" />
						<p>{loadingText[count]}</p>
					</div>
					<div className={styles.modal} />
				</div>
			) : null}
		</div>
	);
}
export default MapContainer;
