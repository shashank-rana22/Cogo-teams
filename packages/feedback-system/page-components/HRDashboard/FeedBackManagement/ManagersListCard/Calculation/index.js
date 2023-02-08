import { Popover, Button } from '@cogoport/components';
import { useState } from 'react';

import CreateForm from '../../../../../common/CreateForm';
import useApproveRating from '../../../../../hooks/useApproveRating';

import styles from './styles.module.css';

function Calculation({ manager_id, getUserFeedbackList = () => {} }) {
	const [show, setShow] = useState(false);

	const { formProps, controls, loading, onSubmit } = useApproveRating({
		setShow,
		manager_id,
		getUserFeedbackList,
	});

	const onClose = () => {
		setShow(false);
	};

	const onShow = () => {
		setShow(!show);
	};

	const calculationForm = () => (
		<div className={styles.form_container}>
			<CreateForm controls={controls} formProps={formProps} onSubmit={onSubmit} onCancel={onClose} />
		</div>
	);

	return (
		<div className={styles.popover_container}>
			<Popover
				visible={show}
				placement="bottom-end"
				render={calculationForm()}
				onClickOutside={onClose}
				caret
			>
				<Button size="sm" onClick={onShow} style={{ backgroundColor: '#abcd62' }}>
					Approve
				</Button>
			</Popover>
		</div>
	);
}

export default Calculation;
