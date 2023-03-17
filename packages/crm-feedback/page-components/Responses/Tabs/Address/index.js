import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../common/EmptyState';
import ResponseCard from '../../components/ResponseCard';
import LoadingState from '../../components/ResponseCard/LoadingState';

import styles from './styles.module.css';

function Address({ activeTab = '' }) {
	const loading = false;
	const list = [
		{
			address    : 'House No 3121, Sector 23, Gurugram, Haryana',
			city       : 'Gurugram',
			state      : 'Haryana',
			country    : 'India',
			pincode    : '122017',
			tax_number : 'ABPKJ345F',
		},
	];

	if (loading) {
		return (
			<LoadingState />
		);
	}

	if (isEmpty(list) && !loading) {
		return (
			<div className={styles.empty}>
				<EmptyState height="280px" width="auto" flexDirection="column" textSize="20px" />
			</div>

		);
	}

	return (
		<div className={styles.container}>
			{/* {(list).map((user, index) => (
				<ResponseCard
					key={user.id}
					user={user}
					index={index}
					// loading={loading}
					activeTab={activeTab}
				/>
			))} */}
			<ResponseCard activeTab={activeTab} />
		</div>
	);
}

export default Address;
