import { Input, Button, Loader, Modal } from '@cogoport/components';
import React, { useState } from 'react';

import useUpdateShipmentContainerDetails from '../../../../hooks/useUpdateShipmentContainerDetails';

import styles from './styles.module.css';

function ContainerNmUpdate({
	setEditContainerNum = () => { },
	refetch = () => { },
	containerDetails,
	editContainerNum = false,
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
		const payload = [];
		Object.keys(containerValue || {}).forEach((key) => {
			const reqObj = {
				id   : key,
				data : {
					container_number: containerValue[key],
				},
			};
			payload.push(reqObj);
		});

		apiTrigger(payload);
	};

	return (
		<Modal
			show={editContainerNum}
			onClose={() => {
				setEditContainerNum(false);
			}}
		>
			<Modal.Header title="Update Container Number" />
			<Modal.Body>
				{loading
					? <div className={styles.loader}><Loader themeType="primary" /></div>
					: (
						<div className={styles.container}>
							{(containerDetails || []).map((container) => (
								<div className={styles.render_container}>
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
				<div className={styles.button_container}>
					<Button
						size="md"
						onClick={() => setEditContainerNum(false)}
						disabled={loading}
						themeType="secondary"
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
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default ContainerNmUpdate;
