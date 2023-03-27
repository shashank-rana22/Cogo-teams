import { format, startCase } from '@cogoport/utils';

import Line from '../../../../common/Line';
import formatPortPair from '../../../../utils/formatPortPair';
import ServiceDetail from '../../../PageView/List/Card/ServiceDetail';

import Content from './Content';
import styles from './styles.module.css';

function Stats({
	data,
	handleUpdateContract,
	statsData,
	loadingUpdate,
}) {
	const portPairdata = formatPortPair({ item: data });

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.heading}>
					<div className={styles.contract_details}>
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
					<div className={styles.business_name}>
						Business Name:
						<div className={styles.org_name}>
							{startCase(data?.importer_exporter?.business_name)}
						</div>
					</div>
				</div>
				<div className={styles.details}>
					<div className={styles.pair}>
						<div>
							{data?.status === 'active' ? 'Approved Date' : 'Requested Date '}
							:
						</div>
						<div className={styles.value}>
							{format(
								data?.status === 'active' ? data?.approved_at : data?.requested_at,
								'dd MMM YYYY',
							)}
						</div>
					</div>
					<div className={styles.service_details}>
						{data.services.map((service, index) => (
							<>
								<ServiceDetail
									item={data}
									service={service}
									formattedData={portPairdata}
								/>
								{index < data.services.length - 1 ? <Line /> : null}
							</>
						))}
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
