import { cl, ToolTip } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import serviceNameMapping from '../../../configs/short-disply-names.json';
import ClickableDiv from '../../ClickableDiv';

import styles from './styles.module.css';

export default function ShipmentDetails({ item = {}, stateProps = {} }) {
	const router = useRouter();
	const isFclLocal = item?.shipment_type === 'fcl_freight_local';

	return (
		<div className={cl`${styles.container} ${styles.shipment_details}`}>
			<div className={cl`${styles.container} ${styles.col}`}>
				<div
					className={styles.sid}
				>
					<div>SID:</div>
					{' '}
					<ClickableDiv onClick={() => router.push('/shipments/[id]', `/shipments/${item?.id}`)}>
						<div className={styles.id}>{item?.serial_id}</div>
					</ClickableDiv>
				</div>

				<div className={cl`${styles.tag_container} ${styles.col}`}>
					<div className={cl`${styles.block} ${styles.bold} ${styles.capitalize} ${styles.border}`}>
						{serviceNameMapping[stateProps?.shipment_type]}
					</div>

					<div className={cl`${styles.block}  ${styles.border}
					 ${styles.bold} ${styles.capitalize}`}
					>
						{item?.trade_type}
					</div>
				</div>
			</div>
		</div>
	);
}
