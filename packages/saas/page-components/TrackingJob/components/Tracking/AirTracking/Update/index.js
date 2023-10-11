import { Modal, TabPanel, Tabs, Button } from '@cogoport/components';
import { useRef, useState } from 'react';

import useUpdateAirMileStones from '../../../../hooks/useUpdateAirMileStones';
import Form from '../../../Forms/FormAir';
import styles from '../styles.module.css';
import TrackerDetails from '../TrackerDetails';

function Update({ showUpdate = {}, setShowUpdate = () => {}, triggerListAirTracking }) {
	const formRef = useRef(null);

	const [activeTab, setActiveTab] = useState('add_location');

	const refetch = () => {
		triggerListAirTracking();
	};
	const { apiTrigger, createLoading } = useUpdateAirMileStones({
		refetch: () => {
			setShowUpdate({ show: false, data: {} });
			setActiveTab('add_location');
			refetch();
		},
	});
	const handleCloseModal = () => {
		setShowUpdate({ show: false, data: {} });
		setActiveTab('add_location');
	};

	const handleSubmitForm = ({ values }) => {
		apiTrigger({ values, showUpdate, setShowUpdate });
	};

	const onSubmit = () => {
		formRef.current.formSubmit();
	};

	return showUpdate?.show
		? (
			<Modal
				show={showUpdate.show}
				onClose={handleCloseModal}
				onOuterClick={handleCloseModal}
				closeOnOuterClick
				placement="top"
				size="xl"
			>
				<Modal.Header title={`Airway Bill NO. - ${showUpdate?.data?.airway_bill_no}`} />
				<Modal.Body>
					<Tabs
						activeTab={activeTab}
						themeType="primary"
						onChange={setActiveTab}
					>
						<TabPanel name="add_location" title="Add Location">
							<Form
								refetch={refetch}
								ref={formRef}
								handleSubmitForm={handleSubmitForm}
								showUpdate={showUpdate}
								setShowUpdate={setShowUpdate}
							/>
						</TabPanel>

						<TabPanel name="tracking" title="Tracking">
							<TrackerDetails id={showUpdate?.data?.saas_air_subscription_id} trackingType="air" />
						</TabPanel>
					</Tabs>
					<div />

				</Modal.Body>

				<Modal.Footer>
					{activeTab === 'add_location' ? (
						<Button
							className={styles.btn_align}
							onClick={onSubmit}
							disabled={createLoading}
						>
							Submit
						</Button>
					) :	(
						<Button onClick={() => handleCloseModal()}>Close</Button>
					)}
				</Modal.Footer>
			</Modal>
		)
		: null;
}

export default Update;
