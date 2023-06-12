import { Pill } from '@cogoport/components';
import { startCase, format } from '@cogoport/utils';

import iconMapping from '../../../helper/iconMapping';
import incoTermMapping from '../../../helper/incoTermMapping';
import serviceLabelMapping from '../../../helper/serviceLabelMapping';
import useGetCustomerLastShipmentDetails from '../../../hooks/useGetCustomerLastShipmentDetails';
import CargoDetails from '../../List/Card/Body/CargoDetails';
import PortDetails from '../../List/Card/Body/PortDetails';

import styles from './styles.module.css';

function LastShipmentDetails({ itemData }) {
	const { data, loading } = useGetCustomerLastShipmentDetails({ itemData });

	return (
		<div>
			{!loading ? (
				<div className={styles.container}>
					<div className={styles.header_section}>
						<div className={styles.header_left_section}>
							<Pill size="md" color="#F2F3FA">
								<div style={{ color: '#7278AD' }}>
									{startCase(data?.trade_type)
							|| startCase(incoTermMapping[data?.inco_term])}

								</div>
							</Pill>
							<Pill size="md" color="#F7FAEF">
								<div style={{ color: '#849E4C' }}>
									{data?.source === 'direct'
										? 'Sell Without Buy'
										: startCase(data?.source || '')}
								</div>
							</Pill>
						</div>
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
					</div>
					<div className={styles.body_section}>
						<div className={styles.body_left_section}>
							<PortDetails data={data} />
						</div>
						<div className={styles.body_right_section}>
							Service Provider
							<div className={styles.service_provider_text}>
								{data?.service_provider?.business_name}
							</div>
						</div>
					</div>
					<div>
						<CargoDetails data={data} />
					</div>
				</div>
			) : null}
		</div>

	);
}

export default LastShipmentDetails;
