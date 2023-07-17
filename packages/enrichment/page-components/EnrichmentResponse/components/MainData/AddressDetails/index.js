import { Placeholder } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import EmptyState from '../../../../../common/EmptyState';
import Header from '../commons/Header';

import ShowAddressForm from './components/ShowAddressForm';
import ShowAddressList from './components/ShowAddressList';
import styles from './styles.module.css';

function AddressDetails({
	data = {},
	actionType = '',
	refetchResponses = () => {},
	loadingResponses = false,
}) {
	const [showForm, setShowForm] = useState(false);

	if (loadingResponses) {
		return (
			<div className={styles.padd}>

				<div className={styles.main}>
					<Placeholder width="100%" height="400px" />

				</div>

			</div>
		);
	}

	return (
		<div className={styles.padd}>

			<div className={styles.main}>
				<Header
					setShowForm={setShowForm}
					title="Address"
					actionType={actionType}
				/>

				{isEmpty(data) ? (
					<div className={styles.padd}>
						<div className={styles.main}>
							<EmptyState />
						</div>
					</div>
				) : (
					<ShowAddressList
						data={data}
					/>
				)}

				<ShowAddressForm
					showForm={showForm}
					setShowForm={setShowForm}
					refetchResponses={refetchResponses}
				/>

			</div>
		</div>
	);
}

export default AddressDetails;
