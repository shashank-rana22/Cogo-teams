import { Modal, Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import useUpdateCogooneSchedule from '../../../../../../hooks/useUpdateCogooneSchedule';

import styles from './styles.module.css';

function ActionModal({
	actionModal = {}, setActionModal = () => {}, getEvents = () => {},
	month = '',
}) {
	const { status = false, value = {}, actionStatus = '' } = actionModal || {};
	const { category = '', subject = '' } = value || {};

	const INFO_MAPPING = {
		completed: `Are you sure you want to marks as completed this
		${startCase(category)}
		?`,
		inactive: `Are you sure you want to marks as inactive this ${startCase(subject)}
		${startCase(category)}
		?`,
	};

	const handleClose = () => {
		setActionModal((prevEventDetails) => ({
			...prevEventDetails,
			status       : false,
			value        : {},
			actionStatus : '',
		}));
	};

	const { loading = false, updateCogooneSchedule = () => {} } = useUpdateCogooneSchedule({
		actionModal,
		handleClose,
		getEvents,
		month,
	});

	const handleSubmit = () => {
		updateCogooneSchedule();
	};

	return (
		<Modal
			size="sm"
			show={status}
			onClose={handleClose}
			placement="center"
			className={styles.container}
		>
			<Modal.Header />
			<Modal.Body>
				{INFO_MAPPING[actionStatus]}
			</Modal.Body>
			<Modal.Footer>
				<Button size="md" themeType="tertiary" onClick={handleClose}>Cancel</Button>
				<Button size="md" loading={loading} onClick={handleSubmit}>Submit</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ActionModal;
