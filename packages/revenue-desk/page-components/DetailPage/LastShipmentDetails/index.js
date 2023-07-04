import { Pill, Placeholder } from '@cogoport/components';
import { startCase, format } from '@cogoport/utils';

import EmptyState from '../../../EmptyState';
import iconMapping from '../../../helper/iconMapping';
import incoTermMapping from '../../../helper/incoTermMapping';
import serviceLabelMapping from '../../../helper/serviceLabelMapping';
import useGetCustomerLastShipmentDetails from '../../../hooks/useGetCustomerLastShipmentDetails';
import { DEFAULT_INDEX } from '../../constants';
import CargoDetails from '../../List/Card/Body/CargoDetails';
import PortDetails from '../../List/Card/Body/PortDetails';

import styles from './styles.module.css';

function LastShipmentDetails({ itemData, isPillSelected }) {
	const { data:shipmentData, loading } = useGetCustomerLastShipmentDetails({ itemData, isPillSelected });
	const data = shipmentData?.[DEFAULT_INDEX];
	return (
		<div>
			{(loading || ((shipmentData || [])?.length)) ? (
				<div className={styles.container}>
					<div className={styles.header_section}>
						<div className={styles.header_left_section}>
							{loading ? <Placeholder height="25px" width="100px" margin="0 5px" /> : (
								<Pill size="md" color="#F2F3FA">
									<div style={{ color: '#7278AD' }}>
										{startCase(data?.trade_type)
						|| startCase(incoTermMapping[data?.inco_term])}

									</div>
								</Pill>
							)}
							{loading ? <Placeholder height="25px" width="100px" /> : (
								<Pill size="md" color="#F7FAEF">
									<div style={{ color: '#849E4C' }}>
										{data?.source === 'direct'
											? 'Sell Without Buy'
											: startCase(data?.source || '')}
									</div>
								</Pill>
							)}
						</div>
						{loading ? (
							<div className={styles.loading_right_section}>
								<Placeholder height="25px" width="50px" margin="0 5px" />
								<Placeholder height="25px" width="100px" margin="0 5px" />
								<Placeholder height="25px" width="200px" />
							</div>
						) : (
							<div className={styles.header_right_section}>
								<div className={styles.sid_section}>
									{iconMapping[data?.shipment_type]}
									<div className={styles.text}>
										{serviceLabelMapping[data?.shipment_type]}
									</div>

									<Pill
										size="md"
										color="#F9F9F9"
									>
										<div style={{ fontSize: '14px', fontWeight: '400', color: '#221F20' }}>
											SID :
											{' '}
											{data?.serial_id}
										</div>
									</Pill>
								</div>
								<div className={styles.date_text}>
									Created on -
									{' '}
									{format(data?.created_at, 'dd MMM yyyy')}
								</div>
							</div>
						)}
					</div>
					<div className={styles.body_section}>
						<div className={styles.body_left_section}>
							{loading ? (
								<div className={styles.loading_right_section}>
									<div>
										<Placeholder height="25px" width="50px" margin="5px 5px" />
										<Placeholder height="25px" width="100px" margin="0 5px" />
									</div>
									<Placeholder height="20px" width="30px" margin="0 5px" />
									<div>
										<Placeholder height="25px" width="50px" margin="5px 5px" />
										<Placeholder height="25px" width="100px" margin="0 5px" />
									</div>

								</div>
							) : <PortDetails data={data} />}

						</div>
						<div className={styles.body_right_section}>
							Service Provider :
							<div className={styles.service_provider_text}>
								{loading ? <Placeholder height="25px" width="300px" margin="0 5px" />
									: <div>{data?.service_provider?.business_name}</div>}

							</div>
						</div>
					</div>
					<div>
						{loading ? (
							<div className={styles.loading_section}>
								<Placeholder height="25px" width="100px" margin="10px 20px" />
								<Placeholder height="25px" width="100px" margin="10px 20px" />
								<Placeholder height="25px" width="100px" margin="10px 20px" />
								<Placeholder height="25px" width="100px" margin="10px 20px" />
								<Placeholder height="25px" width="100px" margin="10px 20px" />
							</div>
						) : <CargoDetails data={data} />}
					</div>
				</div>
			) : (
				<EmptyState
					isSmall
					heading={`This is the Customer's First Shipment in 
			${startCase(itemData?.shipment_type)}`}
				/>
			)}
		</div>

	);
}

export default LastShipmentDetails;
