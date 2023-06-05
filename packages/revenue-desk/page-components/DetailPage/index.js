import { Pill } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';

import iconMapping from '../../helper/iconMapping';
import serviceLabelMapping from '../../helper/serviceLabelMapping';
import useListShipmentServices from '../../hooks/useListShipmentservices';
import PortDetails from '../List/Card/Body/PortDetails';

import Card from './Card';
import ServiceWiseDetails from './ServiceWiseDetails';
import styles from './styles.module.css';

function DetailPage({ setShowDetailPage, showDetailPage:itemData }) {
	const { data:servicesData, loading } = useListShipmentServices({ shipmentId: itemData?.id });
	const excludedServices = [
		'fcl_freight_local_service',
		'lcl_freight_local_service',
		'air_freight_local_service',
		'subsidiary_service',
	];
	const groupedShowServicesData = servicesData?.list?.reduce((acc, item) => {
		const { service_type } = item;
		if (!excludedServices.includes(service_type)) {
			if (!acc[service_type]) {
				acc[service_type] = [];
			}
			acc[service_type].push(item);
		}
		return acc;
	}, {});
	const singleServiceData = servicesData?.list[0];
	return (
		<div className={styles.Detail_page}>
			<div className={styles.header}>
				<div className={styles.subheader_container}>
					<div
						className={styles.heading}
						role="presentation"
						onClick={() => setShowDetailPage(null)}
					>
						<IcMArrowBack height="25px" width="40px" />
					</div>
					<div className={styles.subheader_section}>
						{iconMapping[itemData?.shipment_type]}
						<div className={styles.text}>
							{serviceLabelMapping[itemData?.shipment_type]}
						</div>

						<Pill
							size="md"
							color="#F9F9F9"
						>
							<div style={{ fontSize: '14px', fontWeight: '400', color: '#221F20' }}>
								SID :
								{' '}
								{itemData?.serial_id}
							</div>
						</Pill>
					</div>
					<div className={styles.port_pair_container}>
						<PortDetails data={itemData} />
					</div>
				</div>

				<div className={styles.wallet_container}>
					<div>
						<img
							src="
                    https://cogoport-production.sgp1.digitaloceanspaces.com/1b40f946b221e5c1c03e3563ded91913/Vector.png"
							alt="wallet"
						/>
					</div>
					<div className={styles.text_container}>
						<div className={styles.wallet_text}>
							Wallet Balance
						</div>
						<div className={styles.price_text}>
							USD 10000
						</div>
					</div>
				</div>
			</div>
			<div className={styles.card}>
				<Card serviceData={singleServiceData} />
			</div>
			<div>
				{loading ? null
					: (
						<ServiceWiseDetails
							groupedShowServicesData={groupedShowServicesData}
						/>
					)}

			</div>
		</div>
	);
}

export default DetailPage;
