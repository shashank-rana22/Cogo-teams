import { Button, Modal, Tabs, TabPanel } from '@cogoport/components';
import { useState } from 'react';

import assignPlanControl from '../../../../configuration/assignPlanControl';
import useAssignPlan from '../../../../hooks/useAssignPlan';
import { getFieldController } from '../../../../utils/getFieldController';

import CreatePlan from './CreatePlan';
import styles from './styles.module.css';

function AssignPlanModal({ openPlanModal, setOpenPlanModal, refectUserList }) {
	const { formHook, submitHandler, loading, closeModal } = useAssignPlan({
		setOpenPlanModal,
		refectUserList,
	});
	const [activeTab, setActiveTab] = useState('select');
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = formHook;

	return (
		<Modal show={openPlanModal} onClose={closeModal} size="lg">
			<Modal.Header title="Assign Plan" />
			<Tabs
				activeTab={activeTab}
				fullWidth
				themeType="secondary"
				onChange={setActiveTab}
			>
				<TabPanel name="select" title="Select Existing Plan">
					<Modal.Body>
						{(assignPlanControl || []).map((element) => {
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
						<Button
							themeType="secondary"
							type="button"
							onClick={closeModal}
							disabled={loading}
						>
							Cancel
						</Button>
						<Button
							themeType="accent"
							type="button"
							className={styles.submit_btn}
							onClick={handleSubmit(submitHandler)}
							loading={loading}
						>
							Assign
						</Button>
					</Modal.Footer>
				</TabPanel>

				<TabPanel name="create" title="Create New Plan">
					<CreatePlan closeModal={closeModal} />
				</TabPanel>
			</Tabs>
		</Modal>
	);
}

export default AssignPlanModal;
