import { useRouter } from '@cogoport/next';
import { useEffect } from 'react';

import useGetRfqRateCards from '../../hooks/useGetRfqRateCards';

import BasicDetails from './BasicDetails';
import Graph from './Graph';
import Header from './Header';
import Services from './Services';
import styles from './styles.module.css';

function Details() {
	// const loading = false;
	const { query } = useRouter();
	const { rfq_id = '' } = query;

	// const loading = false;
	// const data = {};

	const { getRfqsRateCards, data = {}, loading } = useGetRfqRateCards({ rfq_id });

	// useEffect(() => {
	// 	getRfqsRateCards();
	// });

	const { list: list_object = {} } = data;

	console.log('data::', data);

	console.log('list::', list_object);

	return (
		<div className={styles.container}>
			<Header loading={loading} />
			<div className={styles.basic_details}>
				<BasicDetails loading={loading} />
				<Graph loading={loading} />
			</div>
			<div className={styles.rfq_list}>
				<Services loading={loading} rate_card_list_object={list_object} />
			</div>
		</div>
	);
}

export default Details;
