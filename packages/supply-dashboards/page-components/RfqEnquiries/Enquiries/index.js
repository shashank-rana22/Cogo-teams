import { IcMArrowBack } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useGetRfqSearches from '../hooks/useGetRfqSearches';

import CardList from './CardList';
import NegotiateRate from './NegotiateRate';
import styles from './styles.module.css';

function Enquiries({ rfq, setRfq }) {
	const [selectedCard, setSelectedCard] = useState(null);
	const {
		loading,
		list:data,
		setPage,
	} = useGetRfqSearches({ rfq });

	useEffect(() => {
		if (data) {
			setSelectedCard(data?.data[0]?.id);
		}
	}, [data]);
	return (
		<div className={styles.enquirypage}>
			<div className={styles.heading} role="presentation" onClick={() => setRfq(null)}>
				{' '}
				<IcMArrowBack style={{ marginRight: '6px' }} />
				RFQ ID:
				{' '}
				{rfq?.rfq_id}
			</div>
			<div className={styles.subheading}>
				<div>
					LAST UPDATED:
					{' '}
					{format(rfq?.updated_at, 'dd MMM yyyy')}
				</div>
			</div>
			<div className={styles.enquiries}>
				<div className={styles.cardlist}>
					<CardList
						data={data}
						loading={loading}
						rfq={rfq}
						selectedCard={selectedCard}
						setSelectedCard={setSelectedCard}
						setPage={setPage}
					/>

				</div>
				<div className={styles.form}>
					<NegotiateRate />
				</div>
			</div>
		</div>
	);
}
export default Enquiries;
