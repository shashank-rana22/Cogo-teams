import { Button } from '@cogoport/components';
import { IcMRefresh } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useEffect } from 'react';

import ThreeDotLoader from '../../common/ThreeDotLoader';

import styles from './styles.module.css';

const UNAUTHORIZED_STATUS_CODE = 403;

export default function ShipmentPageContainer({ isGettingShipment, getShipmentStatusCode, shipment_data, children }) {
	const router = useRouter();

	useEffect(() => {
		router.prefetch(router.asPath);
	}, [router]);

	if (isGettingShipment || getShipmentStatusCode === undefined) {
		return (
			<div className={styles.loading_wrapper}>
				<ThreeDotLoader message="Loading Shipments" fontSize={18} size={45} />
			</div>
		);
	}

	if (!shipment_data && ![UNAUTHORIZED_STATUS_CODE, undefined].includes(getShipmentStatusCode)) {
		return (
			<div className={styles.shipment_not_found}>
				<div className={styles.section}>
					<h2 className={styles.error}>Something Went Wrong!</h2>

					<div className={styles.permission_message}>We are looking into it.</div>

					<Button
						onClick={() => router.reload()}
						className={styles.refresh}
					>
						<IcMRefresh />
						{' '}
						Refresh
					</Button>
				</div>
			</div>
		);
	}

	if (getShipmentStatusCode === UNAUTHORIZED_STATUS_CODE && getShipmentStatusCode !== undefined) {
		return (
			<div className={styles.shipment_not_found}>
				<div className={styles.permission_message}>
					You don&apos;t have permission to visit this page.
					<br />
					Please contact at
					{' '}
					<a href="tel:+91 7208083747">+91 7208083747</a>
				</div>
			</div>
		);
	}

	return children;
}
