import { useRouter } from '@cogoport/next';
import { useEffect } from 'react';

import useGetRfqRateCards from '../../hooks/useGetRfqRateCards';
import useListRfqs from '../../hooks/useListRfqs';

import BasicDetails from './BasicDetails';
import Graph from './Graph';
import Header from './Header';
import Services from './Services';
import styles from './styles.module.css';

function Details() {
	const { query } = useRouter();
	const { rfq_id = '' } = query || {};

	const { getRfqsRateCards, data = {}, loading } = useGetRfqRateCards(
		{ rfq_id, state: ['requested_for_approval', 'modified_and_sent'] },
	);
	const { getRfqsForApproval, data: listData, loading: details_loading } = useListRfqs({ id: rfq_id });

	useEffect(() => {
		getRfqsRateCards();
		getRfqsForApproval();
	}, [getRfqsRateCards, rfq_id, getRfqsForApproval]);

	const { list: list_object = {} } = data;

	const { state = '' } = listData?.list[0] || {};

	return (
		<div className={styles.container}>
			<Header loading={details_loading} requestedOn={listData?.list?.[0]} />
			<div className={styles.basic_details}>
				<BasicDetails
					details_loading={details_loading}
					data={listData}
					getRfqsForApproval={getRfqsForApproval}
				/>
				<Graph rfq_id={rfq_id} />
			</div>
			<div className={styles.rfq_list}>
				<Services
					listRfqData={listData}
					loading={loading && details_loading}
					rate_card_list_object={list_object}
					refetchRateCards={getRfqsRateCards}
					getRfqsForApproval={getRfqsForApproval}
					rfq_state={state}
				/>
			</div>
		</div>
	);
}

export default Details;
