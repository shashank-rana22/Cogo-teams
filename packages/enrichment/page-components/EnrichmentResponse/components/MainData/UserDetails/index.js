import { Placeholder } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import EmptyState from '../../../../../common/EmptyState';
import Header from '../commons/Header';

import ShowPocForm from './components/ShowPocForm';
import ShowPocList from './components/ShowPocList';
import styles from './styles.module.css';

function UserDetails({
	data = [],
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
					showForm={showForm}
					setShowForm={setShowForm}
					title="POC"
				/>

				{isEmpty(data) ? (
					<div className={styles.padd}>
						<div className={styles.main}>
							<EmptyState />
						</div>
					</div>
				) : (
					<ShowPocList
						data={data}
					/>
				)}

				<ShowPocForm
					showForm={showForm}
					setShowForm={setShowForm}
					refetchResponses={refetchResponses}
				/>

			</div>
		</div>
	);
}

export default UserDetails;
