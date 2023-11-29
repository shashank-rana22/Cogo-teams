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

function ModalBody({ rate = {}, details = {}, refetchSearch = () => {} }) {
	const [selectedSevice, setSelectedSevice] = useState({});
	const [rateRequestedFor, setRateRequestedFor] = useState([]);
	const [unsatisfiedFeedbacks, setUnsatisfiedFeedbacks] = useState({});

	const {
		getSpotSearchRateFeedback,
		loading,
		data,
	} = useGetSpotSearchRateFeedback({ rate_card_id: rate.id });

	if (loading) {
		return <LoadingState />;
	}

	const { feedback_type = '', service_id = '' } = selectedSevice;

	const { chargeable_weight = ''	} = details;

	const propsMapping = {
		request_rate: {
			selectedSevice,
			details,
			rate,
			setSelectedSevice,
			setRateRequestedFor,
		},
		feedback: {
			selectedSevice,
			details,
			rate,
			data,
			getSpotSearchRateFeedback,
			setSelectedSevice,
			unsatisfiedFeedbacks,
			setUnsatisfiedFeedbacks,
			chargeable_weight,
			refetchSearch,
		},
	};

	const activeComponentProps = propsMapping[feedback_type] || {};

	const ActiveComponent = MAPPING[feedback_type] || DislikeRate;

	return (
		<div className={styles.container}>
			<SelectServices
				rate={rate}
				setSelectedSevice={setSelectedSevice}
				selectedSevice={selectedSevice}
				data={data}
				rateRequestedFor={rateRequestedFor}
				primary_service={details?.service_type}
				chargeable_weight={chargeable_weight}
			/>

			<div key={service_id} className={styles.form_container}>
				<ActiveComponent {...activeComponentProps} />
			</div>
		</div>
	);
}

export default ModalBody;
