import { Button, Loader } from '@cogoport/components';

import Layout from '../../../../helpers/Layout';
import getStep0Controls from '../../helpers/getStep0Controls';

import BookingPreferenceCard from './BookingPreferenceCard';
import styles from './styles.module.css';

function Step0({ data = {}, onCancel = () => {}, setStep }) {
	const {
		formProps = {}, listBookingPreferences = [],
		bookingPreferenceLoading, shipment_data,
	} = data || {};
	const { control, formState :{ errors = {} } = {}, handleSubmit } = formProps || {};
	const { source = '' } = shipment_data || {};

	const getSource = () => {
		if (source) {
			return source
				.split('_')
				.map((ele) => ele.toUpperCase())
				.join(' ');
		}
		return 'NORMAL BOOKING';
	};

	const onNext = () => {
		setStep(1);
	};

	return (
		<div>
			<div>

				{bookingPreferenceLoading ? <div><Loader /></div> : listBookingPreferences?.map((item) => (
					<BookingPreferenceCard item={item} step0_data={data} />
				))}
			</div>

			<div className={styles.custom_service_provider_container}>
				<div className={styles.sub_container}>
					<div className={styles.label}>Mode of Booking</div>
					<div className={styles.value}>{getSource()}</div>
				</div>

				<div className={styles.layout_container}>
					<Layout
						fields={getStep0Controls}
						control={control}
						errors={errors}
					/>
				</div>
			</div>
			<div className={styles.button_container}>
				<Button themeType="secondary" onClick={onCancel}>Cancel</Button>
				<Button themeType="primary" onClick={handleSubmit(onNext)}>Next</Button>
			</div>

		</div>
	);
}

export default Step0;
