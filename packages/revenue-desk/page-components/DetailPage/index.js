/* eslint-disable no-unused-vars */
import { Pill, TabPanel, Tabs } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcCCogoassured, IcMArrowBack, IcMArrowDown, IcMArrowUp, IcMTick } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import iconMapping from '../../helpers/iconMapping';
import serviceLabelMapping from '../../helpers/serviceLabelMapping';
import useListRevenueDeskDecisions from '../../hooks/useListRevenueDeskDecisions';
import useListShipmentDocuments from '../../hooks/useListShipmentDocuments';
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

function DetailPage({ setShowDetailPage, showDetailPage: itemData, fetchShipments }) {
	const [isPillSelected, setIsPillSelected] = useState({ origin: false, destination: false });
	const [showDetail, setShowDetail] = useState(true);
	const [activeTabPanel, setActiveTabPanel] = useState('view_quotation');
	const [priceData, setPriceData] = useState(null);
	const { data:revenueDeskDecisionsData } = useListRevenueDeskDecisions({ shipmentId: itemData?.id });
	const { data: servicesData, loading } = useListShipmentServices({ shipmentId: itemData?.id });
	const { data: documents } = useListShipmentDocuments({ shipmentId: itemData?.id });
	const shipment_services = servicesData?.list || [];
	const handlePillSelected = (trade_type) => {
		setIsPillSelected((prev) => ({ ...prev, [trade_type]: !prev?.[trade_type] }));
	};

	const { discount_reason = {} } = itemData || {};
	const { tags = [], name = '', discount_value = 0 } = discount_reason || {};
	let subscriptionDiscountApplied = '';
	if ((tags || []).includes('partner_subscription')) {
		subscriptionDiscountApplied = name.split(' ')?.[GLOBAL_CONSTANTS.zeroth_index];
	}

	return (
		<div className={styles.Detail_page}>
			<div className={styles.header}>
				<div className={styles.subheader_container}>
					<div
						className={styles.heading}
						role="presentation"
						onClick={() => { setShowDetailPage(null); fetchShipments(); }}
					>
						<IcMArrowBack height="25px" width="40px" />
					</div>
					<div className={styles.subheader_section}>
						{iconMapping[itemData?.shipment_type]}
						<div className={styles.text}>
							{serviceLabelMapping[itemData?.shipment_type]}
						</div>
						<div className={styles.sid_tag}>
							SID :
							{' '}
							{itemData?.serial_id}
						</div>
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
						{itemData?.is_organic_booking ? (
							<Pill size="md" color="#e6fae8">
								Organic Booking
							</Pill>
						) : null}
						{itemData?.is_saas_subscribed ? (
							<Pill size="md" color="#e6fae8">
								Saas Subscribed
							</Pill>
						) : null}
						{subscriptionDiscountApplied ? (
							<Pill size="md" color="#e6fae8">
								{subscriptionDiscountApplied}
								{' '}
								-
								{' '}
								{discount_value}
								%
							</Pill>
						) : null}
					</div>
				</div>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<PocSopModal itemData={itemData} />
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
									servicesList={shipment_services}
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

								<TransactionInsights itemData={itemData} />

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
							<div className={styles.last_shipment}>
								<div
									role="presentation"
									className={styles.custom_pill}
									onClick={() => handlePillSelected('origin')}
								>
									Same Origin
									{isPillSelected?.origin ? <IcMTick /> : ''}
								</div>
								<div
									role="presentation"
									className={styles.custom_pill}
									onClick={() => handlePillSelected('destination')}
								>
									Same Destination
									{isPillSelected?.destination ? <IcMTick /> : ''}
								</div>
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
