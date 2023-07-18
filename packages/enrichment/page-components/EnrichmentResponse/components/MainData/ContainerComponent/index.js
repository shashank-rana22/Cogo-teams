import { useState } from 'react';

import LoadingState from '../../../../../common/LoadingState';
import Header from '../../../commons/Header';

import List from './components/List';
import ResponseForm from './components/ResponseForm';
import styles from './styles.module.css';

function ContainerComponent({
	data = [],
	refetchResponses = () => {},
	loadingResponses = false,
	actionType = '',
	activeTab = '',
}) {
	const [showForm, setShowForm] = useState('');

	if (loadingResponses) {
		return (
			<LoadingState height="100px" />
		);
	}

	return (
		<div className={styles.padd}>

			<div className={styles.main}>
				<Header
					actionType={actionType}
					activeTab={activeTab}
					setShowForm={setShowForm}
				/>

				<List data={data} activeTab={activeTab} />

				<ResponseForm
					showForm={showForm}
					setShowForm={setShowForm}
					refetchResponses={refetchResponses}
					activeTab={activeTab}
				/>

			</div>
		</div>
	);
}

export default ContainerComponent;
