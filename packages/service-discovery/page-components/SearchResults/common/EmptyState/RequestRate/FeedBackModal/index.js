import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React from 'react';

import getControls from '../controls';
import FeedBackForm from '../FeedBackForm';

import styles from './styles.module.css';
import useRequestForRate from './useRequestForRate';
// import useGetPriorityAirlineOptions from './useGetPriorityAirlineOptions';

function FeedBackModal({ data = {}, show, onClose = () => {}, proceeedWithFeedback }) {
	// const { priorityAirlineOptions, airlineOptions } = useGetPriorityAirlineOptions();

	const { control, formState:{ errors }, handleSubmit, reset } = useForm();

	const controls = getControls(data?.service_type);

	const { loading, onSubmitFeedback } = useRequestForRate({
		onClose,
		reset,
		data,
	});

	const onSubmit = (values) => {
		onSubmitFeedback(values);
	};

	const renderButton = ({
		btnText = '',
		isFirstBtn = false,
		onClick = () => {},
		themeType,
		size,
		isSubmitBtn = false,
	}) => (
		<Button
			type="button"
			size={size || 'md'}
			themeType={themeType || 'primary'}
			onClick={onClick}
			style={{ marginRight: isFirstBtn ? 12 : 0 }}
			disabled={loading}
			loading={isSubmitBtn && loading}
		>
			{btnText}
		</Button>
	);

	return (
		<Modal
			size="md"
			show={show}
			onClose={onClose}
			placement="center"
		>
			{proceeedWithFeedback ? (
				<>
					<Modal.Header title="Rate Market Intelligence" />
					<Modal.Body>
						<FeedBackForm
							controls={controls}
							control={control}
							errors={errors}
						/>
					</Modal.Body>
					<Modal.Footer>
						<div className={styles.buttons_container}>

							{renderButton({
								btnText    : 'Cancel',
								onClick    : onClose,
								isFirstBtn : true,
								themeType  : 'secondary',
							})}

							{renderButton({
								btnText     : 'Submit',
								onClick     : handleSubmit(onSubmit),
								isSubmitBtn : true,
							})}
						</div>
					</Modal.Footer>
				</>
			) : (
				<>
					<Modal.Header title="Add The Mandatory Additional Services First" />
					<Modal.Body>
						<div>
							<li>
								The Services Include:-
								<ul>Origin Transportation</ul>
								{data?.service_type === 'fcl_freight' ? (
									<ul>Origin Fcl Customs</ul>
								) : (
									<ul>Origin Air Customs</ul>
								)}
							</li>
						</div>
					</Modal.Body>
				</>
			)}
		</Modal>
	);
}

export default FeedBackModal;
