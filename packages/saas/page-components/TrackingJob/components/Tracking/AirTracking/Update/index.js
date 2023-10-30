import { Modal, TabPanel, Tabs, Button } from '@cogoport/components';
import { dynamic } from '@cogoport/next';
import { useRef, useState } from 'react';

import useUpdateAirMileStones from '../../../../hooks/useUpdateAirMileStones';
import FormAir from '../../../Forms/FormAir';
import styles from '../styles.module.css';

const TrackingInfo = dynamic(() => import('../TrackerDetails/TrackingInfo'), { ssr: false });

function Update({ showUpdate = {}, setShowUpdate = () => {}, triggerListAirTracking }) {
	const formRef = useRef(null);

	const [activeTab, setActiveTab] = useState('add_location');

	const { apiTrigger, createLoading } = useUpdateAirMileStones({
		refetch: () => {
			setShowUpdate({ show: false, data: {} });
			setActiveTab('add_location');
			triggerListAirTracking();
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
				className={styles.update_container}
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
							<FormAir
								refetch={triggerListAirTracking}
								ref={formRef}
								handleSubmitForm={handleSubmitForm}
								showUpdate={showUpdate}
								setShowUpdate={setShowUpdate}
							/>
						</TabPanel>

						<TabPanel name="tracking" title="Tracking">
							<TrackingInfo id={showUpdate?.data?.saas_air_subscription_id} />
						</TabPanel>
					</Tabs>

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
