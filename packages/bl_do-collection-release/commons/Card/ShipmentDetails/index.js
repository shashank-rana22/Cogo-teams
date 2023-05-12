import { cl } from '@cogoport/components';
import { IcMFfcl, IcMFlcl, IcMFlocalCharges } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useCallback } from 'react';

import serviceNameMapping from '../../../configs/short-disply-names.json';
import ClickableDiv from '../../ClickableDiv';

import styles from './styles.module.css';

const iconMapping = {
	fcl_freight : IcMFfcl,
	lcl_freight : IcMFlcl,
	fcl_local   : IcMFlocalCharges,
};

export default function ShipmentDetails({ item = {}, stateProps = {} }) {
	const router = useRouter();

	const handleClick = useCallback(() => {
		const path = router.asPath.split('/');
		const newPathname = `${path[1]}/shipments/${item.id}`;
		window.location.replace(newPathname);
	}, [router.asPath, item.id]);

	const Element = iconMapping[stateProps.shipment_type || 'fcl_freight'];

	return (
		<div className={cl`${styles.container} ${styles.shipment_details}`}>
			<div className={cl`${styles.container} ${styles.col}`}>
				<div
					className={styles.sid}
				>
					SID :
					<ClickableDiv onClick={handleClick}>
						<div className={styles.id}>
							{' '}
							{item?.serial_id}
						</div>
					</ClickableDiv>
				</div>

				<div className={cl`${styles.tag_container} ${styles.col}`}>
					<div>
						{' '}
						<Element width={24} height={24} fill="red" />
					</div>
					<div className={styles.red}>
						{serviceNameMapping[stateProps?.shipment_type]}
					</div>
				</div>
			</div>
		</div>
	);
}
