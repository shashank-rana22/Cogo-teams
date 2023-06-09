import { Pill, TabPanel, Tabs } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useState } from 'react';

import iconMapping from '../../helper/iconMapping';
import serviceLabelMapping from '../../helper/serviceLabelMapping';
import useListShipmentServices from '../../hooks/useListShipmentservices';

import QuotationDetails from './QuotationDetails';
import ServiceWiseDetails from './ServiceWiseDetails';
import ShipmentCard from './ShipmentCard';
import styles from './styles.module.css';
import TransactionInsights from './TransactionInsights';

function DetailPage({ setShowDetailPage, showDetailPage: itemData }) {
	const [activeTabPanel, setActiveTabPanel] = useState('view_quotation');
	const [priceData, setPriceData] = useState({});
	const { data: servicesData, loading } = useListShipmentServices({ shipmentId: itemData?.id });

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
						{itemData?.importer_exporter?.business_name}
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
			<div className={styles.card_container}>
				<ShipmentCard itemData={itemData} priceData={priceData} />
			</div>

			<div className={styles.tabs_container}>
				<Tabs
					activeTab={activeTabPanel}
					themeType="secondary"
					onChange={setActiveTabPanel}
				>
					<TabPanel name="view_quotation" title="View Quotation">
						<div>
							<QuotationDetails
								itemData={itemData}
								setPriceData={setPriceData}
							/>
						</div>
					</TabPanel>
					<TabPanel name="transaction_insights" title="Transaction Insights">
						<div>
							{['air_freight', 'lcl_freight', 'fcl_freight'].includes(
								itemData?.shipment_type,
							) ? (
								<TransactionInsights itemData={itemData} />
								) : null}

						</div>
					</TabPanel>
					<TabPanel name="last_shipment_detail" title="Customer Last Shipment Details">
						<div>Coming Soon!</div>
					</TabPanel>
				</Tabs>
			</div>

			<div>
				{loading ? null
					: (
						<ServiceWiseDetails
							shipmentData={itemData}
							groupedShowServicesData={groupedShowServicesData}
							serviceData={servicesData?.list}
							priceData={priceData}
						/>
					)}

			</div>
		</div>
	);
}

export default DetailPage;
