import { format } from '@cogoport/utils';

import Content from './Content';
import styles from './styles.module.css';

function Stats({ data, status }) {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.heading}>
					<div className={styles.contract_id}>
						#
						{data?.contract_reference_id}
					</div>
				</div>
				<div className={styles.details}>
					<div className={styles.pair}>
						<div>
							No. of Containers :
						</div>
						<div className={styles.value}>
							{data?.utilisation_data?.total_containers_count}
						</div>
					</div>
					<div className={styles.pair}>
						<div>
							{status === 'active' ? 'Approved Date' : 'Request Date '}
							:
						</div>
						<div className={styles.value}>
							{ format(status === 'active'
								? data?.approved_at : data?.requested_at, 'dd MMM YYYY') }
						</div>
					</div>
					<div className={styles.pair}>
						<div>
							Validity :
						</div>
						<div className={styles.value}>
							{data?.validity_left_days ? data?.validity_left_days : '-'}
							days
						</div>
					</div>
				</div>
			</div>
			<Content data={data} status={status} />
		</div>
	);
}
export default Stats;
