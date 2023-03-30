import { Input, Button, Loader } from '@cogoport/components';
import React, { useState } from 'react';

import useUpdateContainerDetails from '../../../../../../hooks/useUpdateContainerDetails';

import styles from './styles.module.css';

function ContainerNmUpdate({
	setEditContainerNum = () => { },
	shipmentData = {},
	refetch = () => { },
	containerDetails,
}) {
	const [containerValue, setContainerValue] = useState({});

	const handleChange = (e, container_id) => {
		setContainerValue({ ...containerValue, [container_id]: e });
	};
	const { handleSubmit, loading } = useUpdateContainerDetails({
		containerValue,
		setEditContainerNum,
		shipmentData,
		refetch,
	});

	return (
		loading ? <div className={styles.loader}><Loader themeType="primary" /></div> : (
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

				<div className={styles.button_container}>
					<Button
						size="md"
						onClick={() => setEditContainerNum(false)}
						disabled={loading}
					>
						Cancel
					</Button>

					<Button
						size="md"
						onClick={handleSubmit}
						disabled={loading}
					>
						Submit
					</Button>
				</div>
			</div>
		)
	);
}

export default ContainerNmUpdate;
