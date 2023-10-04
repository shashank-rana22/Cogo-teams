import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { startCase } from '@cogoport/utils';

import useUpdateCogooneSchedule from '../../../../../../hooks/useUpdateCogooneSchedule';
import combineDateAndTime from '../../../../../../utils/combineDateAndTime';

import EditSchedules from './EditSchedules';
import styles from './styles.module.css';

function ActionModal({
	actionModal = {}, getEvents = () => {},
	month = '', handleClose = () => {}, handleUpdatedState = () => {}, activeTab = '', handleCallApi = () => {},
}) {
	const { status = false, value = {}, actionStatus = '' } = actionModal || {};
	const { category = '', subject = '', schedule_id = '', id = '' } = value || {};

	const {
		control,
		handleSubmit,
		formState : { errors = {} },
		setValue,
		watch,
	} = useForm({
		defaultValues: {
			start_date : new Date(),
			end_date   : new Date(),
			start_time : new Date(),
			end_time   : new Date(),
		},
	});

	const INFO_MAPPING = {
		completed: `Are you sure you want to marks as completed this
		${startCase(category)} ?`,
		inactive: `Are you sure you want to marks as inactive this ${startCase(subject)}
		${startCase(category)} ?`,
		edit: <EditSchedules value={value} control={control} errors={errors} watch={watch} setValue={setValue} />,
	};

	const { loading = false, updateCogooneSchedule = () => {} } = useUpdateCogooneSchedule({
		handleClose,
		getEvents,
		month,
		handleUpdatedState,
		activeTab,
		handleCallApi,
	});

	const onSubmit = (val = {}) => {
		const { end_date, end_time, start_date, start_time } = val || {};

		let payload = {};

		if (actionStatus !== 'edit') {
			payload = {
				schedule_id : activeTab === 'schedules' ? schedule_id : undefined,
				calendar_id : activeTab === 'calendars' ? id : undefined,
				status      : actionStatus,
			};
		} else {
			payload = {
				schedule_id,
				schedule_start : combineDateAndTime({ time: start_time, date: start_date }),
				schedule_end   : combineDateAndTime({ time: end_time, date: end_date }),
			};
		}
		updateCogooneSchedule({ payload });
	};

	return (
		<Modal
			size="sm"
			show={status}
			onClose={handleClose}
			placement="center"
			className={styles.container}
		>
			<Modal.Header title={actionStatus === 'edit' ? 'Update Schedule' : null} />
			<Modal.Body>
				{INFO_MAPPING[actionStatus]}
			</Modal.Body>
			<Modal.Footer>
				<Button size="md" themeType="tertiary" onClick={handleClose}>Cancel</Button>
				<Button
					size="md"
					loading={loading}
					onClick={handleSubmit(onSubmit)}
				>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ActionModal;
