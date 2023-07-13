import { Placeholder } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import EmptyState from '../../../../../common/EmptyState';

import Header from './components/Header';
import ShowAddressForm from './components/ShowAddressForm';
import ShowAddressList from './components/ShowAddressList';
import styles from './styles.module.css';

function AddressDetails({
	data = {},
	refetchResponses = () => {},
	loadingResponses = false,
}) {
	const [showForm, setShowForm] = useState('');

	if (loadingResponses) {
		return (
			<div className={styles.padd}>

				<div className={styles.main}>
					<Placeholder width="100%" height="400px" />

				</div>

			</div>
		);
	}

	if (isEmpty(data)) {
		return (
			<div className={styles.padd}>
				<div className={styles.main}>
					<EmptyState />
				</div>
			</div>
		);
	}

	return (
		<div className={styles.padd}>

			<div className={styles.main}>
				<Header
					showForm={showForm}
					setShowForm={setShowForm}
				/>

				<ShowAddressForm
					showForm={showForm}
					setShowForm={setShowForm}
					refetchResponses={refetchResponses}
				/>

				<ShowAddressList
					data={data}
				/>

			</div>
		</div>
	);
}

export default AddressDetails;
