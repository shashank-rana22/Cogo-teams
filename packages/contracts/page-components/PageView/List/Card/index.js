import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { format } from '@cogoport/utils';

import formatPortPair from '../../../../utils/formatPortPair';

import PortPair from './PortPair';
import styles from './styles.module.css';

function Card({ item, filters }) {
	const router = useRouter();
	const formattedData = formatPortPair({ item });
	const newFormattedData = [];
	if (
		formattedData?.length
	) {
		(formattedData || []).forEach((pair, i) => {
			if (i <= 1 && Object.keys(pair || {})) {
				newFormattedData.push(pair);
			}
		});
	}

	return (
		<div className={styles.card}>
			<div className={styles.header}>
				{item?.contract_reference_id ? (
					<div className={styles.heading}>
						Contract ID
						#
						{item?.contract_reference_id}
					</div>
				) : null}

				<div className={styles.details}>
					<div className={styles.pair}>
						<div>
							No. of Containers :
						</div>
						<div className={styles.value}>
							{item?.contract_utilisation_data?.total_containers_count}
						</div>
					</div>
					<div className={styles.pair}>
						<div>
							{filters?.status === 'active' ? 'Approved Date' : 'Request Date '}
							:
						</div>
						<div className={styles.value}>
							{ format(filters?.status === 'active'
								? item?.approved_at : item?.requested_at, 'dd MMM YYYY') }
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
				<div className={styles.sub_container}>
					<div className={styles.port_pair}>
						{(newFormattedData || []).map((portPair) => <PortPair portPair={portPair} />)}
					</div>
					{formattedData?.length > 2
						? (
							<div className={styles.extra}>
								<div>
									+
									{Number(formattedData?.length) - 2}
								</div>
								<div>more</div>
							</div>
						) : null}
				</div>
				<div className={styles.last}>
					<Button
						style={{ marginBottom: '10px' }}
						size="md"
						onClick={() => { router.push(`/contracts/details?id=${item?.id}&status=${filters?.status}`); }}
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
