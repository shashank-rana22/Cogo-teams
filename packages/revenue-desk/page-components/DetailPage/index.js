import { Pill, TabPanel, Tabs } from '@cogoport/components';
import { IcCCogoassured, IcMArrowBack, IcMArrowDown, IcMArrowUp, IcMTick } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import iconMapping from '../../helper/iconMapping';
import serviceLabelMapping from '../../helper/serviceLabelMapping';
import useListRevenueDeskDecisions from '../../hooks/useListRevenueDeskDecisions';
import useListShipmentServices from '../../hooks/useListShipmentservices';
import { DEFAULT_INDEX } from '../constants';

import CancelledShipmentCard from './CancelledShipmentCard';
import LastShipmentDetails from './LastShipmentDetails';
import PocSopModal from './PocSopModal';
import QuotationDetails from './QuotationDetails';
import RevenueList from './RevenueList';
import ServiceWiseDetails from './ServiceWiseDetails';
import ShipmentCard from './ShipmentCard';
import styles from './styles.module.css';
import TransactionInsights from './TransactionInsights';

const IMAGE_SRC = 'https://cogoport-production.sgp1.digitaloceanspaces.com/1b40f946b221e5c1c03e3563ded91913/Vector.png';
function DetailPage({ setShowDetailPage, showDetailPage: itemData }) {
	const [isPillSelected, setIsPillSelected] = useState(false);
	const [showDetail, setShowDetail] = useState(true);
	const [activeTabPanel, setActiveTabPanel] = useState('view_quotation');
	const [priceData, setPriceData] = useState(null);
	const { data:revenueDeskDecisionsData } = useListRevenueDeskDecisions({ shipmentId: itemData?.id });
	const { data: servicesData, loading } = useListShipmentServices({ shipmentId: itemData?.id });
	const shipment_services = servicesData?.list || [];
	const handlePillSelected = () => {
		setIsPillSelected((prev) => !prev);
	};

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
						<div className={styles.header_container}>
							{itemData?.importer_exporter?.business_name}
						</div>
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
								src={IMAGE_SRC}
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
					{['air_freight', 'fcl_freight'].includes(itemData?.shipment_type)
					&& (
						<TabPanel name="last_shipment_detail" title="Customer Last Shipment Details">
							<div
								role="button"
								tabIndex={0}
								className={styles.custom_pill}
								onClick={handlePillSelected}
							>
								view customers last shipment with same configuration&nbsp;
								{isPillSelected ? <IcMTick /> : ''}
							</div>
							{showDetail === true ? (
								<div>
									<LastShipmentDetails itemData={itemData} isPillSelected={isPillSelected} />
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
					)}
					{['fcl_freight', 'air_freight'].includes(
						itemData?.shipment_type,
					) && itemData?.source === 'contract' ? (
						<TabPanel name="contract" title="Contract">
							{showDetail === true ? (
								<div>
									<RevenueList itemData={itemData} />
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
						) : null}

				</Tabs>
			</div>

			<div>
				{loading ? null
					: (
						<ServiceWiseDetails
							shipmentData={itemData}
							serviceData={shipment_services}
							priceData={priceData}
							setShowDetailPage={setShowDetailPage}
							revenueDeskDecisionsData={revenueDeskDecisionsData?.[DEFAULT_INDEX] || []}
						/>
					)}
			</div>

		</div>
	);
}

export default DetailPage;
