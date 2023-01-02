import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';

import PortPair from './PortPair';
import styles from './styles.module.css';

function Card({ item }) {
	const router = useRouter();
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
					Contract ID
					{' '}
					#
					{item?.contract_reference_id}
				</div>

				<div className={styles.details}>
					<div className={styles.pair}>
						<div>
							No. of Containers :
						</div>
						<div className={styles.value}>
							{item?.fcl_freight_services[0]?.max_containers_count}
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
						onClick={() => { router.push(`/contracts/details?id=${item?.id}`); }}
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
