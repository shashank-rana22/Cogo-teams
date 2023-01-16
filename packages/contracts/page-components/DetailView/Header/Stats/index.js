import { format, startCase } from '@cogoport/utils';

import Content from './Content';
import styles from './styles.module.css';

function Stats({
	data,
	handleUpdateContract,
	statsData,
	loadingUpdate,
}) {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.heading}>
					{data?.contract_reference_id ? (
						<div className={styles.contract_id}>
							Contract ID #
							{data?.contract_reference_id}
						</div>
					) : null}
					<div className={styles.name}>
						{startCase(data?.contract_name)}
					</div>
				</div>
				<div className={styles.details}>
					<div className={styles.pair}>
						<div>
							{data?.status === 'active' ? 'Approved Date' : 'Request Date '}
							:
						</div>
						<div className={styles.value}>
							{format(
								data?.status === 'active' ? data?.approved_at : data?.requested_at,
								'dd MMM YYYY',
							)}
						</div>
					</div>
					{data?.status === 'active' ? (
						<div className={styles.pair}>
							<div>Validity :</div>
							<div className={styles.value}>
								{data?.validity_left_days ? data?.validity_left_days : '26'}
								days
							</div>
						</div>
					) : null}
				</div>
			</div>
			<Content
				data={data}
				handleUpdateContract={handleUpdateContract}
				statsData={statsData}
				loadingUpdate={loadingUpdate}
			/>
		</div>
	);
}
export default Stats;
