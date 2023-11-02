import { Modal, Button, Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { startCase } from '@cogoport/utils';

import eventOccurenceControls from '../../../../../../../configurations/event-occurence-controls';
import { getFieldController } from '../../../../../../../utils/getFieldController';

import styles from './styles.module.css';

function EventOccurence({
	setEventOccurence = () => {},
	eventOccurence = {},
	startDateField = {},
	validity_start = {},
	validity_end = {},
	id = '',
	recurrence_rule = {},
}) {
	const {
		showModal = false,
		frequencyType = '',
	} = eventOccurence || {};

	const { days_of_week = [], date_of_month = 0, month_of_year = 0, repeat_after = 0 } = recurrence_rule || {};

	const {
		control,
		handleSubmit,
		watch,
		formState : { errors = {} },
		reset,
	} = useForm({
		defaultValues: {
			start_date       : id ? new Date(validity_start) : startDateField,
			end_date         : id ? new Date(validity_end) : startDateField,
			weekly_repeat_on : days_of_week,
			month_on_date    : date_of_month,
			yearly_month     : month_of_year,
			yearly_on_date   : date_of_month,
			custom_on_date   : repeat_after,
		},
	});
	const controls = eventOccurenceControls({ frequencyType, startDateField, watch });

	const onSave = (val) => {
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
