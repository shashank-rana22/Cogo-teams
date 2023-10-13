import { Modal, Button, Tabs, TabPanel } from '@cogoport/components';
import { useRef, useState } from 'react';

import useUpdateContainerAndBlMiles from '../../../../hooks/useUpdateContainerAndBlMiles';
import FormOcean from '../../../Forms/FormOcean';
import TrackingInfo from '../TrackerDetails/TrackingInfo';

import styles from './styles.module.css';

function UpdateTracking({ showUpdate = {}, setShowUpdate = () => {}, refetchTrackingList = () => {} }) {
	const formRef = useRef(null);
	const [activeTab, setActiveTab] = useState('add_location');

	const { data = {}, show = false } = showUpdate || {};

	const { apiTrigger, createLoading } = useUpdateContainerAndBlMiles({
		refetch: () => {
			setShowUpdate({ show: false, data: {} });
			refetchTrackingList();
		},
	});

	const handleSubmitForm = ({ values }) => {
		apiTrigger({ values, showUpdate, setShowUpdate });
	};

	const handleCloseModal = () => setShowUpdate({ show: false, data: {} });

	const onSubmit = () => formRef.current.formSubmit();

	return (show ? (
		<Modal
			show={showUpdate.show}
			onClose={handleCloseModal}
			onOuterClick={handleCloseModal}
			placement="top"
			size="xl"
			className={styles.modal_container}
		>
			<Modal.Header title={`Search Value - ${data?.search_value}`} />

			<Modal.Body>
				<Tabs
					activeTab={activeTab}
					themeType="primary"
					onChange={setActiveTab}
				>
					<TabPanel name="add_location" title="Add Location">
						<FormOcean
							ref={formRef}
							handleSubmitForm={handleSubmitForm}
							showUpdate={showUpdate}
						/>
					</TabPanel>

					<TabPanel name="tracking" title="Tracking">
						<TrackingInfo id={data?.saas_container_subscription_id} />
					</TabPanel>
				</Tabs>
			</Modal.Body>

			<Modal.Footer>
				<Button onClick={handleCloseModal} themeType="secondary">Close</Button>

				{activeTab === 'add_location' ? (
					<Button
						style={{ marginLeft: 8 }}
						onClick={onSubmit}
						disabled={createLoading}
					>
						Submit
					</Button>
				) :	null}
			</Modal.Footer>
		</Modal>
	)
		: null);
}

export default UpdateTracking;
