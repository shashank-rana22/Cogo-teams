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
	const DEFAULT_VALUES = {};

	const {
		control: radioControl,
		handleSubmit: radiohandleSubmit,
		formState: { errors: radioErrors },
		reset: radioReset,
		watch: radioWatch,
	} = useForm({
		defaultValues: DEFAULT_VALUES,
	});
	const closeModal = () => {
		setShowModal(false);
		setShowErrorModal(false);
		radioReset();
	};
	const { fetchCreateDataApi = () => {}, loading = false } = useBudgetAllocation({
		formData,
		setShowErrorModal,
		setShowModal,
		refetch,
		setShowAllocationCard,
		reset,
		radioReset,
	});
	const radiohandleSubmitFunction = () => {
		fetchCreateDataApi({ radioValue: radioWatch().radio });
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
							<Button onClick={() => closeModal()} className="secondary md">
								No
							</Button>
							<Button className="primary md" onClick={fetchCreateDataApi} disabled={loading}>
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
								<Button className="secondary md" onClick={closeModal}>
									Cancel
								</Button>
								<Button
									className="primary md"
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
