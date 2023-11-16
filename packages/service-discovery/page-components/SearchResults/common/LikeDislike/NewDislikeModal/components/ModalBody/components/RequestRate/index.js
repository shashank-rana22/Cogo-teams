import { useForm } from '@cogoport/forms';

import RequestRateComponent from './components/RequestRateComponent';
import styles from './styles.module.css';

function RequestRate({ selectedSevice = {}, details = {}, rate = {}, setSelectedSevice = () => {} }) {
	const { label = '', service_type } = selectedSevice;

	const formProps = useForm();

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<div className={styles.number}>
					<div className={styles.number_div}>1</div>
				</div>

				<div className={styles.label}>{label}</div>
			</div>

			<RequestRateComponent
				formProps={formProps}
				service_type={service_type}
				details={details}
				selectedSevice={selectedSevice}
				rate={rate}
				setSelectedSevice={setSelectedSevice}
			/>
		</div>
	);
}

export default RequestRate;
