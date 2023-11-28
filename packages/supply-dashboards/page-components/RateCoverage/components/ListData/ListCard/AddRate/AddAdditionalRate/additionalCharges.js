import { Button, Modal } from '@cogoport/components';
import { IcCFcrossInCircle, IcCFtick } from '@cogoport/icons-react';
import { useState } from 'react';

import Layout from '../../../../../../RfqEnquiries/Layout';
import useCreateAdditionalRates from '../../../../../hooks/useCreateAdditionalRates';
import useDeleteFreightRateFeedbacks from '../../../../../hooks/useDeleteFreightRateFeedbacks';

import styles from './styles.module.css';

function AdditionalCharges({
	payload = {},
	charge = {},
	setAdditionalCharge = () => {},
	setChargeAdded = () => {},
	additionalService = {},
	message = {},
	containerDetails = {},
	filter = {},
	data = {},
	source = '',
	triggeredFrom = '',
	feedbackData = [],
}) {
	const [feedbackModal, setFeebBackModal] = useState(false);
	const {
		fields,
		errors,
		handleSubmit,
		handleData,
		onError,
		loading,
		control,
		showElements,
	} = useCreateAdditionalRates({
		triggeredFrom,
		payload,
		charge,
		setAdditionalCharge,
		setChargeAdded,
		additionalService,
		message,
		containerDetails,
		filter,
		data,
		source,
		setFeebBackModal,
		feedbackModal,
		feedbackData,
	});

	const service = charge.split(':')[1];
	const { deleteFeedbackRequest = () => {} } = useDeleteFreightRateFeedbacks(service);

	const idArray = (feedbackData || []).map((item) => item.id);

	const handelTick = async () => {
		const resp = await deleteFeedbackRequest({ id: idArray });
		if (resp === 200) {
			setChargeAdded((prev) => [...prev, `${charge}${message}`]);
			setAdditionalCharge(null);
		}
	};

	const handelCancel = () => {
		setFeebBackModal(feedbackModal);
		setAdditionalCharge(false);
		setChargeAdded((prev) => [...prev, `${charge}${message}`]);
		setAdditionalCharge(null);
	};

	return (
		<div className={styles.layout_container}>
			<div>
				<Layout
					control={control}
					fields={fields}
					errors={errors}
					showElements={showElements}
				/>
			</div>
			<div className={styles.flex_container}>
				<Button
					onClick={() => {
						setAdditionalCharge(false);
					}}
					themeType="secondary"
					style={{ marginRight: 10 }}
				>
					SKIP
				</Button>
				<Button
					onClick={handleSubmit(handleData, onError)}
					disabled={loading}
					themeType="accent"
				>
					SAVE
				</Button>
			</div>
			<Modal size="md" show={feedbackModal} onClose={() => setFeebBackModal(!feedbackModal)} placement="top">
				<Modal.Body>
					<div className={styles.modal_body}>
						<div className={styles.font_style}>
							You Have Total
							{' '}
							{feedbackData?.length}
							{' '}
							similar Feedbacks. Do you want to delete it?
						</div>
						<div className={styles.icon}>
							<IcCFcrossInCircle height={40} width={40} onClick={handelCancel} />
							<IcCFtick
								onClick={handelTick}
								style={{ marginLeft: '20px' }}
								height={40}
								width={40}
							/>
						</div>
					</div>
				</Modal.Body>
			</Modal>

		</div>
	);
}
export default AdditionalCharges;
