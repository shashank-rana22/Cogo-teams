import { format, startCase } from '@cogoport/utils';

import formatPortPair from '../../../../utils/formatPortPair';

import Content from './Content';
import styles from './styles.module.css';

const mapping = {
	fcl_freight : 'containers_count',
	lcl_freight : 'weight',
	air_freight : 'weight',
};
const unitMapping = {
	fcl_freight : '',
	lcl_freight : 'Mt',
	air_freight : 'Kgs',
};

function Stats({
	data,
	handleUpdateContract,
	statsData,
	loadingUpdate,
}) {
	const portPairdata = formatPortPair({ item: data });

	let contentToShow = 0;
	(portPairdata || []).forEach((item) => { contentToShow += Number(item?.[mapping?.[item?.service_type]]); });
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
					<div className={styles.pair}>
						<div>
							{portPairdata[0]?.service_type === 'fcl_freight' ? 'No Of Containers :' : 'Weight :'}
						</div>
						<div className={styles.value}>
							{`${contentToShow} 
							${startCase([unitMapping[portPairdata[0]?.service_type]])}`}
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
