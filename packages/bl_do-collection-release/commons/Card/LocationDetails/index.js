import { cl, ToolTip } from '@cogoport/components';
// import { format } from '@cogoport/utils';
import { useRouter } from '@cogoport/next';

import serviceNameMapping from '../../../configs/short-disply-names.json';

import styles from './styles.module.css';

export default function LocaionDetails({ item = {}, stateProps = {} }) {
	const router = useRouter();
	const isFclLocal = item?.shipment_type === 'fcl_freight_local';

	return (
		<div className={cl`${styles.container} ${styles.shipment_details}`}>
			{/* <div className={cl`${styles.container} ${styles.col}`}>
				<div
					className={styles.sid}
					onClick={() => router.push('/shipments/[id]', `/shipments/${item?.id}`)}
				>
					SID:
					{' '}
					{item?.serial_id}
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
			</div> */}

			<div className={cl`${styles.container} ${styles.col}`}>
				<div className={styles.container}>
					<div className={cl`${styles.text} ${styles.thin}`}>
						{isFclLocal && item?.trade_type === 'import' ? 'POD' : 'POL'}
					</div>
					{/* <ToolTip
						animation="shift-away"
						theme="light-border"
						content={
							isFclLocal ? item?.port?.display_name : item?.origin?.display_name
						}
					>
						<div className={cl`${styles.port_code} ${styles.primary} ${styles.sm}`}>
							{isFclLocal ? item?.port?.port_code : item?.origin?.port_code}
						</div>
					</ToolTip> */}
				</div>

				{!isFclLocal ? (
					<div className={styles.container}>
						<div className={cl`${styles.text} ${styles.thin}`}>POD</div>

					</div>
				) : null}
			</div>

			<div className={cl`${styles.container} ${styles.col}`}>
				{item?.departure ? (
					<div className={styles.container}>
						<div className={cl`${styles.text} ${styles.thin}`}>ETD</div>

						<div className={cl`${styles.text} ${styles.bold}`}>
							{/* {format(item.departure, 'dd MMM yyyy', null, true)} */}
						</div>
					</div>
				) : null}

				{item?.arrival ? (
					<div className={styles.container}>
						<div className={cl`${styles.text} ${styles.thin}`}>ETA</div>

						<div className={cl`${styles.text} ${styles.bold}`}>
							{/* {format(item.arrival, 'dd MMM yyyy', null, true)} */}
						</div>
					</div>
				) : null}
			</div>
		</div>
	);
}
