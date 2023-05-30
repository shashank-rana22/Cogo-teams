import { useRouter } from '@cogoport/next';
import { useEffect } from 'react';

import useGetRfqRateCards from '../../hooks/useGetRfqRateCards';
import useListRfqs from '../../hooks/useListrfqs';

import BasicDetails from './BasicDetails';
import Graph from './Graph';
import Header from './Header';
import Services from './Services';
import styles from './styles.module.css';

function Details() {
	const { query } = useRouter();
	const { rfq_id = '' } = query || {};

	const { getRfqsRateCards, data = {}, loading } = useGetRfqRateCards({ rfq_id, state: 'requested_for_approval' });
	const { getRfqsForApproval, data: listData, loading: Detailsloading } = useListRfqs({ id: rfq_id });

	useEffect(() => {
		getRfqsRateCards();
		getRfqsForApproval();
	}, [getRfqsRateCards, rfq_id, getRfqsForApproval]);

	const { list: list_object = {} } = data;

	return (
		<div className={styles.container}>
			<Header loading={Detailsloading} requestedOn={listData?.list?.[0]} />
			<div className={styles.basic_details}>
				<BasicDetails Detailsloading={Detailsloading} data={listData} getRfqsForApproval={getRfqsForApproval} />
				{/* <Graph rfq_id={rfq_id} /> */}
			</div>
			<div className={styles.rfq_list}>
				<Services
					loading={loading}
					rate_card_list_object={list_object}
					refetchRateCards={getRfqsRateCards}
					getRfqsForApproval={getRfqsForApproval}
				/>
			</div>
		</div>
	);
}

export default Details;
