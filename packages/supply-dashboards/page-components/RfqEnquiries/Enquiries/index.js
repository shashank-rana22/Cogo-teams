import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { format } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useGetRfqSearches from '../hooks/useGetRfqSearches';

import CardList from './CardList';
import NegotiateRate from './NegotiateRate';
import styles from './styles.module.css';

function Enquiries() {
	const [selectedCard, setSelectedCard] = useState(null);
	const [revertCounts, setRevertCounts] = useState({});
	const { query, push } = useRouter();
	const rfqId = query?.id;

	const {
		loading,
		list:data,
		setPage,
	} = useGetRfqSearches({ rfqId });

	useEffect(() => {
		if (data) {
			const obj = {};
			setSelectedCard(data?.data[0]);
			(data?.data || []).forEach((item) => {
				obj[item?.id] = item?.negotiation_reverts_count;
			});
			setRevertCounts(obj);
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
					{data?.data[0]?.rfq_data?.serial_id}
				</div>
			</div>

			<div className={styles.subheading}>
				<div>
					LAST UPDATED:
					{' '}
					{format(data?.data[0]?.rfq_data?.updated_at, 'dd MMM yyyy')}
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
	);
}
export default Enquiries;
