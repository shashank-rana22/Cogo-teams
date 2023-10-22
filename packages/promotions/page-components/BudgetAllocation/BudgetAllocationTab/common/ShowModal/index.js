import { Modal, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useState } from 'react';

import Layout from '../../../../../common/Layout';
import RadioControls from '../../controls/budget-allocation-radio';
import useBudgetAllocation from '../../hooks/useBudgetAllocation';

import styles from './styles.module.css';

function ShowModal({
	showModal = false,
	setShowModal = () => {},
	setShowAllocationCard = () => {},
	formData = {},
	refetch = () => {},
	reset = () => {},
}) {
	const [showErrorModal, setShowErrorModal] = useState(false);
	console.log('shoemodal');

	console.log(formData);
	const {
		control: radioControl,
		handleSubmit: radiohandleSubmit,
		formState: { errors: radioErrors },
		reset: radioReset,
	} = useForm();

	const closeModal = () => {
		setShowModal(false);
		setShowErrorModal(false);
		radioReset();
	};

	const budgetAllocationRefetch = () => {
		setShowErrorModal(false);
		setShowModal(false);
		refetch();
		setShowAllocationCard((state) => !state);
		reset();
		radioReset();
	};

	const { fetchCreateDataApi = () => {}, loading = false } = useBudgetAllocation({
		refetch: budgetAllocationRefetch,
	});

	const radiohandleSubmitFunction = (data) => {
		let payload = { ...formData, role_ids: [formData.role_ids] };
		if (data?.radio === 'allocate_budget_after_completion_of_active_budget') {
			payload = { ...payload, overlap_save: 'activate_later' };
		}
		if (data?.radio === 'deactivate_the_active_budget_and_allocate') {
			payload = { ...payload, overlap_save: 'activate_now' };
		}
		fetchCreateDataApi({ payload });
	};

	return (
		showModal ? (
			<Modal show showCloseIcon onClose={closeModal}>
				<Modal.Header
					title={`Are you sure you want to allocate this budget worth 
					${formData.budget_amount} $ on a ${formData.frequency}ly basis?`}
				/>
				<Modal.Footer>
					{!showErrorModal ? (
						<div className={styles.button_flex}>
							<Button onClick={() => closeModal()} disabled={loading}>
								No
							</Button>
							<Button
								onClick={radiohandleSubmit(radiohandleSubmitFunction)}
								disabled={loading}
							>
								Yes
							</Button>
						</div>
					) : (
						<div className={styles.styled_flex}>
							<div className={styles.styled_div}>
								<div className={styles.error_text}>
									Error: There is already a budget allocated to this user.
								</div>
								<Layout controls={RadioControls} control={radioControl} errors={radioErrors} />
								{radioErrors.radio ? (
									<div className={styles.align_left}>Select any one option</div>
								) : null}
							</div>
							<div className={styles.button_flex}>
								<Button onClick={closeModal}>
									Cancel
								</Button>
								<Button
									onClick={radiohandleSubmit(radiohandleSubmitFunction)}
									disabled={loading}
								>
									Confirm
								</Button>
							</div>
						</div>
					)}
				</Modal.Footer>
			</Modal>
		) : null);
}
export default ShowModal;
