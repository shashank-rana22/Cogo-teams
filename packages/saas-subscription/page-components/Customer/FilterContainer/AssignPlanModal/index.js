import { Button, Modal } from '@cogoport/components';

import assignPlanControl from '../../../../configuration/assignPlanControl';
import useAssignPlan from '../../../../hooks/useAssignPlan';
import { getFieldController } from '../../../../utils/getFieldController';

import styles from './styles.module.css';

function AssignPlanModal({ openPlanModal, setOpenPlanModal, refectUserList }) {
	const {
		formHook,
		submitHandler,
		loading,
		closeModal,
	} = useAssignPlan({ setOpenPlanModal, refectUserList });

	const { handleSubmit, control, formState:{ errors } } = formHook;

	return (
		<Modal show={openPlanModal} onClose={closeModal}>
			<Modal.Header title="Assign Plan" />
			<Modal.Body>
				{assignPlanControl.map((element) => {
					const { name, label, type } = element;
					const Element = getFieldController(type);
					return (
						<div key={name} className={styles.col}>
							<div className={styles.label_container}>
								<p className={styles.label}>{label}</p>
								{errors?.[name] && (
									<p className={styles.error}>
										{errors?.[name]?.message || errors?.[name]?.type}
									</p>
								)}
							</div>
							<Element control={control} {...element} />
						</div>
					);
				})}
			</Modal.Body>
			<Modal.Footer>
				<Button themeType="secondary" onClick={closeModal} disabled={loading}>Cancel</Button>
				<Button
					themeType="accent"
					className={styles.submit_btn}
					onClick={handleSubmit(submitHandler)}
					loading={loading}
				>
					Assign
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default AssignPlanModal;
