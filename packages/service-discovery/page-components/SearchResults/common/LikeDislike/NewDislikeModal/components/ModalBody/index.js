import { useState } from 'react';

import useGetSpotSearchRateFeedback from '../../hooks/useGetSpotSearchRateFeedback';

import DislikeRate from './components/DislikeRate';
import LoadingState from './components/LoadingState';
import RequestRate from './components/RequestRate';
import SelectServices from './components/SelectServices';
import styles from './styles.module.css';

const MAPPING = {
	request_rate : RequestRate,
	feedback     : DislikeRate,
};

function ModalBody({ rate = {}, details = {} }) {
	const [selectedSevice, setSelectedSevice] = useState({});

	const {
		// getSpotSearchRateFeedback,
		loading,
		data,
	} = useGetSpotSearchRateFeedback({ rate_card_id: rate.id });

	if (loading) {
		return <LoadingState />;
	}

	console.log('data', data);
	const { feedback_type = '', service_id = '' } = selectedSevice;

	const ActiveComponent = MAPPING[feedback_type] || DislikeRate;

	return (
		<div className={styles.container}>
			<SelectServices
				rate={rate}
				setSelectedSevice={setSelectedSevice}
				selectedSevice={selectedSevice}
				data={data}
			/>

			<div key={service_id} className={styles.form_container}>
				<ActiveComponent
					selectedSevice={selectedSevice}
					details={details}
					rate={rate}
					setSelectedSevice={setSelectedSevice}
				/>
			</div>
		</div>
	);
}

export default ModalBody;
