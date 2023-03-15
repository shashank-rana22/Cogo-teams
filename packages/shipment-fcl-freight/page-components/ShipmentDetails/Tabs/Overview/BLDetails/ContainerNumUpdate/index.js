import { Input, Button } from '@cogoport/components';;
import React, { useState } from 'react';

// import useContainerNumUpdate from '../../../../hooks/useContainerNumUpdate';
import styles from './styles.module.css';

function ContainerNmUpdate({
	setEditContainerNum = () => { },
	shipment_data = {},
	refetch = () => { },
}) {
	const [containerValue, setContainerValue] = useState({});

	const { handleSubmit, containerDetails, loading } = useContainerNumUpdate(
		containerValue,
		setEditContainerNum,
		shipment_data,
		refetch,
	);

	const handleChange = (e, container_id) => {
		setContainerValue({ ...containerValue, [container_id]: e.target?.value });
	};

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Update Container Number</div>

			{(containerDetails?.list || []).map((container) => (
				<div className={styles.render_container}>
					<div className={styles.container_num}>{container?.container_number}</div>

					<Input
						width="100%"
						value={containerValue[container?.id]}
						onChange={(e) => handleChange(e, container?.id)}
					/>
				</div>
			))}

			<div className={styles.button_container}>
				<Button
					className="secondary md"
					onClick={() => setEditContainerNum(false)}
					disabled={loading}
				>
					Cancel
				</Button>

				<Button
					className="primary md"
					onClick={handleSubmit}
					disabled={loading}
				>
					Submit
				</Button>
			</div>
		</div>
	);
}

export default ContainerNmUpdate;
