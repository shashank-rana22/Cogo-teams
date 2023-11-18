import { Tabs, TabPanel, Toggle } from '@cogoport/components';
import { IcMArrowBack, IcMArrowDown, IcMArrowUp } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { format, isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import EmptyState from '../../../common/EmptyState';
import useGetRfqSearches from '../hooks/useGetRfqSearches';
import useListShipmentPlans from '../hooks/useGetShipmentPlan';

import CardList from './CardList';
import NegotiateRate from './NegotiateRate';
import Remarks from './Remarks';
import ShipmentDetails from './ShipmentDetails';
import ShipmentPlan from './ShipmentPlan';
import styles from './styles.module.css';

function Enquiries() {
	const ZEROVALUE = 0;
	const [relevantToUser, setRelevantToUser] = useState(true);
	const [selectedCard, setSelectedCard] = useState(null);
	const [revertCounts, setRevertCounts] = useState({});
	const [showMore, setShowMore] = useState(true);
	const [activeTab, setActiveTab] = useState('shipmemt_details');
	const { query, push } = useRouter();
	const rfqId = query?.id;

	const {
		loading,
		list:data,
		setPage,
	} = useGetRfqSearches({ rfqId, relevantToUser });

	const { data: shipmentplanData, listShipmentPlans } = useListShipmentPlans({ selectedCard });
	const { list } = shipmentplanData || [];

	const negotiation_remarks = data?.data[ZEROVALUE]?.negotiation_remarks;
	const onChange = () => {
		setRelevantToUser((prev) => !prev);
	};
	useEffect(() => {
		if (data) {
			const OBJ = {};
			setSelectedCard(data?.data[ZEROVALUE]);
			(data?.data || []).forEach((item) => {
				OBJ[item?.id] = item?.negotiation_reverts_count;
			});
			setRevertCounts(OBJ);
		}
	}, [data]);

	useEffect(() => {
		if (activeTab === 'shipment_plan') {
			listShipmentPlans();
		}
	}, [activeTab, listShipmentPlans]);

	return (
		<div className={styles.enquirypage}>
			<div className={styles.header}>
				<div
					className={styles.heading}
					role="presentation"
					onClick={() => push('/supply/dashboards/rfq-enquiries')}
				>
					{' '}
					<IcMArrowBack style={{ marginRight: '6px' }} />
					RFQ ID:
					{' '}
					{data?.data[ZEROVALUE]?.rfq_data?.serial_id}
				</div>
				<div className={styles.toggle_section}>
					<Toggle
						size="md"
						name="revelant_to_user"
						value={!relevantToUser}
						onChange={onChange}
						onLabel="All"
						offLabel="Revelant To Me"
					/>

				</div>
			</div>

			<div className={styles.subheading}>
				<div>
					LAST UPDATED:
					{' '}
					{format(data?.data[ZEROVALUE]?.rfq_data?.updated_at, 'dd MMM yyyy')}
				</div>
			</div>
			<div className={styles.enquiries}>
				<div className={styles.cardlist}>
					<CardList
						data={data}
						loading={loading}
						selectedCard={selectedCard}
						setSelectedCard={setSelectedCard}
						setPage={setPage}
						revertCounts={revertCounts}
					/>
				</div>
				<div className={styles.details}>
					<div className={styles.details_card}>
						<Tabs
							activeTab={activeTab}
							themeType="secondary"
							onChange={setActiveTab}
						>
							<TabPanel
								name="shipmemt_details"
								title="Shipment Details"
							>
								<ShipmentDetails selectedCard={selectedCard} />
							</TabPanel>

							<TabPanel name="remarks" title="Remarks">
								<Remarks
									showMore={showMore}
									loading={loading}
									selectedCard={selectedCard}
								/>

								{showMore
										&& negotiation_remarks !== null
										&& negotiation_remarks?.length >= ZEROVALUE && (
											<div
												role="presentation"
												className={styles.bottom}
												onClick={() => setShowMore(!showMore)}
											>
												Show More
												<IcMArrowDown />
											</div>
								)}

								{!showMore
										&& negotiation_remarks !== null
										&& negotiation_remarks?.length >= ZEROVALUE && (
											<div
												role="presentation"
												className={styles.bottom}
												onClick={() => setShowMore(!showMore)}
											>
												Show Less
												<IcMArrowUp />
											</div>
								)}
							</TabPanel>

							<TabPanel name="shipment_plan" title="Shipment Plan">
								<div
									className={styles.shipment_details}
								>
									{isEmpty(list) ? <EmptyState />
										: (list || []).map((value) => (
											<ShipmentPlan
												value={value}
												key={value?.id}
											/>
										))}
								</div>
							</TabPanel>

						</Tabs>
					</div>
					{selectedCard ? (
						<div className={styles.form}>
							<NegotiateRate
								selectedCard={selectedCard}
								setRevertCounts={setRevertCounts}
							/>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}
export default Enquiries;
