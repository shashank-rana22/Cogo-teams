import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import getControls from '../controls';
import FeedBackForm from '../FeedBackForm';

import styles from './styles.module.css';
import useRequestForRate from './useRequestForRate';

const MARGIN_FIRST_BUTTON = 12;
const ZERO_MARGIN = 0;

function FeedBackModal({
	data = {},
	details = {},
	show = false,
	onClose = () => {},
	requestService = {},
	proceeedWithFeedback = true,
	rates = [],
	isMobile = false,
}) {
	const service = requestService?.service_type || details?.service_type;

	const rates_id = rates.map(
		(item) => item?.shipping_line_id || item?.airline_id,
	);

	const rates_excludes_ids = rates_id.filter(
		(value, index) => rates_id?.indexOf(value) === index,
	);

	const { control, formState:{ errors }, handleSubmit, reset } = useForm();

	const controls = getControls({
		service,
		rates_excludes_ids,
	});

	const showElements = {
		temperature : details?.container_type === 'refer',
		ventilation : details?.container_type === 'refer',
		humidity    : details?.container_type === 'refer',
	};

	const { loading = false, onSubmitFeedback = () => {} } = useRequestForRate({
		onClose,
		reset,
		details,
		data,
		requestService,
	});

	const onSubmit = (values) => {
		onSubmitFeedback(values);
	};

	const BUTTON_MAPPING = [
		{
			label     : 'Cancel',
			onClick   : onClose,
			themeType : 'secondary',
			disabled  : loading,
		},
		{
			label     : 'Submit',
			onClick   : handleSubmit(onSubmit),
			themeType : 'primary',
			loading,
		},
	];

	return (
		<Modal
			size="md"
			show={show}
			onClose={onClose}
			placement={isMobile ? 'bottom' : 'top'}
		>
			{proceeedWithFeedback ? (
				<>
					<Modal.Header title="Rate Market Intelligence" />

					<Modal.Body>
						<FeedBackForm
							controls={controls}
							control={control}
							errors={errors}
							showElements={showElements}
						/>
					</Modal.Body>

					<Modal.Footer>
						<div className={styles.buttons_container}>
							{BUTTON_MAPPING.map((buttonItem, index) => {
								const { label, ...restProps } = buttonItem;

								return (
									<Button
										key={label}
										style={{ marginRight: !index ? MARGIN_FIRST_BUTTON : ZERO_MARGIN }}
										{...restProps}
									>
										{label}
									</Button>
								);
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
								{details?.service_type === 'fcl_freight' ? (
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
