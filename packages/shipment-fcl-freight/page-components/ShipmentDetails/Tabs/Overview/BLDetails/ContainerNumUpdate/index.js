import { Input, Button, Loader } from '@cogoport/components';
import React, { useState } from 'react';

import useUpdateContainerNumber from '../../../../../../hooks/useUpdateContainerNumber';

import styles from './styles.module.css';

function ContainerNmUpdate({
	setEditContainerNum = () => { },
	shipmentData = {},
	refetch = () => { },
}) {
	const [containerValue, setContainerValue] = useState({});

	const { handleSubmit, containerDetails, loading } = useUpdateContainerNumber(
		containerValue,
		setEditContainerNum,
		shipmentData,
		refetch,
	);

	const handleChange = (e, container_id) => {
		setContainerValue({ ...containerValue, [container_id]: e });
	};

	return (
		loading ? <div className={styles.loader}><Loader themeType="primary" /></div> : (
			<div className={styles.container}>
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
		)
	);
}

export default ContainerNmUpdate;
