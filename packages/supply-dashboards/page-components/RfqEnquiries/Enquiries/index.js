import { Tabs, TabPanel } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { format } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useGetRfqSearches from '../hooks/useGetRfqSearches';

import CardList from './CardList';
import NegotiateRate from './NegotiateRate';
import Remarks from './Remarks';
import ShipmentDetails from './ShipmentDetails';
import styles from './styles.module.css';

function Enquiries() {
	const ZERO_VALUE = 1;
	const [selectedCard, setSelectedCard] = useState(null);
	const [revertCounts, setRevertCounts] = useState({});
	const [activeTab, setActiveTab] = useState('shipmemt_details');
	const { query, push } = useRouter();
	const rfqId = query?.id;

	const {
		loading,
		list:data,
		setPage,
	} = useGetRfqSearches({ rfqId });

	useEffect(() => {
		if (data) {
			const OBJ = {};
			setSelectedCard(data?.data[ZERO_VALUE]);
			(data?.data || []).forEach((item) => {
				OBJ[item?.id] = item?.negotiation_reverts_count;
			});
			setRevertCounts(OBJ);
		}
	}, [data]);

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
					{data?.data[ZERO_VALUE]?.rfq_data?.serial_id}
				</div>
			</div>

			<div className={styles.subheading}>
				<div>
					LAST UPDATED:
					{' '}
					{format(data?.data[ZERO_VALUE]?.rfq_data?.updated_at, 'dd MMM yyyy')}
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
									// showMore={showMore}
									loading={loading}
									selectedCard={selectedCard}
								/>
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
