import { Pill, TabPanel, Tabs } from '@cogoport/components';
import { IcCCogoassured, IcMArrowBack, IcMArrowDown, IcMArrowUp } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import iconMapping from '../../helper/iconMapping';
import serviceLabelMapping from '../../helper/serviceLabelMapping';
import useListShipmentServices from '../../hooks/useListShipmentservices';

import CancelledShipmentCard from './CancelledShipmentCard';
import LastShipmentDetails from './LastShipmentDetails';
import PocSopModal from './PocSopModal';
import QuotationDetails from './QuotationDetails';
import ServiceWiseDetails from './ServiceWiseDetails';
import ShipmentCard from './ShipmentCard';
import styles from './styles.module.css';
import TransactionInsights from './TransactionInsights';

function DetailPage({ setShowDetailPage, showDetailPage: itemData }) {
	const [showDetail, setShowDetail] = useState(true);
	const [activeTabPanel, setActiveTabPanel] = useState('view_quotation');
	const [priceData, setPriceData] = useState(null);
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
						{(itemData?.tags || []).map((i) => (
							<Pill key={i}>{startCase(i)}</Pill>
						))}
						{itemData?.is_cogo_assured ? (
							<Pill
								prefix={<IcCCogoassured />}
								size="md"
								color="#e6fae8"
							>
								Cogoport Assured
							</Pill>
						) : null}
					</div>
				</div>

				<div style={{ display: 'flex', alignItems: 'center' }}>
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
								-
							</div>
						</div>
					</div>
					<div>
						<PocSopModal itemData={itemData} />
					</div>
				</div>

			</div>
			{itemData?.state === 'cancelled' ? <CancelledShipmentCard itemData={itemData} /> : null}
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
						{showDetail === true ? (
							<div>
								<QuotationDetails
									itemData={itemData}
									setPriceData={setPriceData}
									priceData={priceData}
								/>
								<div
									role="presentation"
									className={styles.show_detail_tab}
									onClick={() => setShowDetail(false)}
								>
									Hide Details
									{' '}
									<IcMArrowUp />
								</div>
							</div>
						) : (
							<div
								role="presentation"
								className={styles.show_detail_tab}
								onClick={() => setShowDetail(true)}
							>
								Show more
								{' '}
								<IcMArrowDown />
							</div>
						)}
					</TabPanel>
					<TabPanel name="transaction_insights" title="Transaction Insights">
						{showDetail === true ? (
							<div>
								{['air_freight', 'lcl_freight', 'fcl_freight'].includes(
									itemData?.shipment_type,
								) ? (
									<TransactionInsights itemData={itemData} />
									) : null}
								<div
									role="presentation"
									className={styles.show_detail_tab}
									onClick={() => setShowDetail(false)}
								>
									Hide Details
									{' '}
									<IcMArrowUp />
								</div>
							</div>
						) : (
							<div
								role="presentation"
								className={styles.show_detail_tab}
								onClick={() => setShowDetail(true)}
							>
								Show more
								{' '}
								<IcMArrowDown />
							</div>
						)}
					</TabPanel>
					<TabPanel name="last_shipment_detail" title="Customer Last Shipment Details">
						{showDetail === true ? (
							<div>
								<LastShipmentDetails itemData={itemData} />
								<div
									role="presentation"
									className={styles.show_detail_tab}
									onClick={() => setShowDetail(false)}
								>
									Hide Details
									{' '}
									<IcMArrowUp />
								</div>
							</div>
						) : (
							<div
								role="presentation"
								className={styles.show_detail_tab}
								onClick={() => setShowDetail(true)}
							>
								Show more
								{' '}
								<IcMArrowDown />
							</div>
						)}
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
							setShowDetailPage={setShowDetailPage}
						/>
					)}
			</div>

		</div>
	);
}

export default DetailPage;
