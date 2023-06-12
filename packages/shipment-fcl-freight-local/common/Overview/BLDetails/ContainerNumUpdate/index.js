import { Input, Button, Loader, Modal } from '@cogoport/components';
import { useState } from 'react';

import useUpdateShipmentContainerDetails from '../../../../hooks/useUpdateShipmentContainerDetails';

import styles from './styles.module.css';

const PAYLOAD = [];

function ContainerNmUpdate({
	setEditContainerNum = () => { },
	refetch = () => { },
	containerDetails,
}) {
	const [containerValue, setContainerValue] = useState({});

	const handleChange = (e, container_id) => {
		setContainerValue({ ...containerValue, [container_id]: e });
	};
	const afterContainerUpdate = () => {
		setEditContainerNum(false);
		refetch();
	};

	const { loading, apiTrigger } = useUpdateShipmentContainerDetails({
		refetch        : afterContainerUpdate,
		successMessage : 'Container Numbers Updated Successfully!',
	});

	const onSubmit = () => {
		Object.keys(containerValue || {}).forEach((key) => {
			const reqObj = {
				id   : key,
				data : {
					container_number: containerValue[key],
				},
			};
			PAYLOAD.push(reqObj);
		});

		apiTrigger(PAYLOAD);
	};

	const closeModal = () => setEditContainerNum(false);

	return (
		<Modal
			show
			onClose={closeModal}
			showCloseIcon={!loading}
			closeOnOuterClick={false}
			className={styles.custom_modal}
		>
			<Modal.Header title="Update Container Number" />
			<Modal.Body>
				{loading
					? <div className={styles.loader}><Loader themeType="primary" /></div>
					: (
						<div className={styles.container}>
							{(containerDetails || []).map((container) => (
								<div className={styles.render_container} key={container?.container_number}>
									<div className={styles.container_num}>{container?.container_number}</div>
									<Input
										size="sm"
										width="100%"
										value={containerValue[container?.id]}
										onChange={(e) => handleChange(e, container?.id)}
									/>
								</div>
							))}

						</div>

					)}
			</Modal.Body>
			<Modal.Footer>
				<Button
					size="md"
					themeType="secondary"
					onClick={closeModal}
					disabled={loading}
				>
					Cancel
				</Button>

				<Button
					size="md"
					onClick={onSubmit}
					disabled={loading}
				>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ContainerNmUpdate;
