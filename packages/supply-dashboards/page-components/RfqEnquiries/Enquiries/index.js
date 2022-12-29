import { IcMArrowBack } from '@cogoport/icons-react';
import { format } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useGetSpotSearches from '../hooks/useGetSpotSearches';

import CardList from './CardList';
import styles from './styles.module.css';

function Enquiries({ rfq, setRfq }) {
	const [selectedCard, setSelectedCard] = useState(null);
	const {
		loading,
		page,
		filters,
		list: { data, total },
		hookSetters,
		refetch,
	} = useGetSpotSearches({ enquiryFilters: rfq });

	useEffect(() => {
		if (data) {
			setSelectedCard(data[0]);
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
						refetch={refetch}
						total={total}
						hookSetters={hookSetters}
						filters={filters}
						page={page}
						loading={loading}
						rfq={rfq}
						selectedCard={selectedCard}
						setSelectedCard={setSelectedCard}
					/>

				</div>
				<div className={styles.form} />
			</div>
		</div>
	);
}
export default Enquiries;
