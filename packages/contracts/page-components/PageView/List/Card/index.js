import { Button } from '@cogoport/components';

import PortPair from './PortPair';
import styles from './styles.module.css';

function Card({ setShowDetail, item }) {
	const portPairData = item?.fcl_freight_services[0]?.service_details;
	const newPortPairs = [];
	if (
		portPairData?.length
	) {
		(portPairData || []).forEach((pair, i) => {
			if (i <= 2 && Object.keys(pair || {})) {
				newPortPairs.push(pair);
			}
		});
	}

	return (
		<div className={styles.card}>
			<div className={styles.header}>
				<div className={styles.heading}>
					<div>Contract ID #2322</div>
					{/* {item?.trade_type ? (
						<div className={styles.trade}>
							{item?.trade_type}
						</div>
					) : null} */}
				</div>
				<div className={styles.details}>
					<div className={styles.pair}>
						<div>
							No. of Containers :
						</div>
						<div className={styles.value}>
							150
						</div>
					</div>
					<div className={styles.pair}>
						<div>
							Request Date :
						</div>
						<div className={styles.value}>
							10 June  2022
						</div>
					</div>
					<div className={styles.pair}>
						<div>
							Validity :
						</div>
						<div className={styles.value}>
							{item?.validity_left_days}
							days
						</div>
					</div>
				</div>
			</div>
			<div className={styles.body}>
				<div className={styles.port_pair}>
					{(newPortPairs || []).map((portPair) => <PortPair portPair={portPair} />)}
				</div>
				<div className={styles.last}>
					{portPairData?.length > 3
						? (
							<div className={styles.extra}>
								<div>
									+
									{Number(portPairData?.length) - 3}
								</div>
								<div>more</div>
							</div>
						) : null}
					<Button
						style={{ marginBottom: '10px' }}
						size="md"
						onClick={() => { setShowDetail(item?.id); }}
						themeType="secondary"
					>
						View
					</Button>
				</div>
			</div>
		</div>
	);
}

export default Card;
