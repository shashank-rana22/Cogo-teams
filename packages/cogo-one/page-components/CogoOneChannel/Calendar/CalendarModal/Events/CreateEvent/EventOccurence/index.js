import { Modal, Button, Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { startCase } from '@cogoport/utils';

import eventOccurenceControls from '../../../../../../../configurations/event-occurence-controls';
import { getFieldController } from '../../../../../../../utils/getFieldController';

import styles from './styles.module.css';

function EventOccurence({
	setEventOccurence = () => {},
	eventOccurence = {},
}) {
	const {
		showModal = false,
		// eventData = {},
		frequencyType = '',
	} = eventOccurence || {};

	const {
		control,
		handleSubmit,
		// watch,
		formState : { errors = {} },
		reset,
	} = useForm({
		defaultValues: {
			start_date : new Date(),
			end_date   : new Date(),
		},
	});

	const controls = eventOccurenceControls[frequencyType];

	const onSave = (val) => {
		reset();

		setEventOccurence((prev) => ({
			...prev,
			eventData : val,
			showModal : false,
		}));
		Toast.success('Saved!!!.');
	};

	const handleClose = () => {
		reset();
		setEventOccurence((p) => ({
			...p,
			eventData : {},
			showModal : false,
		}));
	};

	return (
		<Modal
			show={showModal}
			onClose={handleClose}
			closeOnOuterClick={handleClose}
			placement="top"
			size="sm"
			animate
			scroll={false}
		>
			<Modal.Header title={`Set recurrence - ${startCase(frequencyType)}`} />
			<Modal.Body>
				<div className={styles.container}>
					{(controls || []).map((itm) => {
						const { label = '', name = '', controlType = '' } = itm || {};
						const Element = getFieldController(controlType);

						if (!Element) {
							return null;
						}

						return (
							<div className={styles.content} key={name}>
								<div className={styles.each_control}>
									<div className={styles.label}>{label}</div>
									<Element
										control={control}
										{...itm}
										error={errors?.[name]}
									/>
								</div>
								<div className={styles.error_text}>
									{errors?.[name] && (errors?.[name]?.message || 'This is Required')}
								</div>
							</div>
						);
					})}
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					themeType="secondary"
					size="md"
					onClick={handleClose}
					className={styles.cancel_button}
				>
					Cancel
				</Button>
				<Button themeType="primary" size="md" onClick={handleSubmit(onSave)}>Save</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default EventOccurence;
