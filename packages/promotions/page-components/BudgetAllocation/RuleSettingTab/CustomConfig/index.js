import { Button } from '@cogoport/components';
import { useState } from 'react';

import CustomConfigForm from './CustomConfigForm';
import CustomConfigList from './CustomConfigList';
import styles from './styles.module.css';

function CustomConfig({
	data = {},
	refetchList = () => {},
}) {
	const [showCustomConfigForm, setShowCustomConfigForm] = useState(false);
	const [viewAndEditConfigData, setViewAndEditConfigData] = useState(null);

	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<div className={styles.heading}>Custom Configuration</div>
				{!showCustomConfigForm && !viewAndEditConfigData ? (
					<Button
						onClick={() => {
							setShowCustomConfigForm(true);
						}}
					>
						+ Add New
					</Button>
				) : null}
			</div>

			{(viewAndEditConfigData || showCustomConfigForm) ? (
				<CustomConfigForm
					data={data}
					refetchList={refetchList}
					setShowCustomConfigForm={setShowCustomConfigForm}
					viewAndEditConfigData={viewAndEditConfigData}
					setViewAndEditConfigData={setViewAndEditConfigData}
				/>
			) : null}

			{!viewAndEditConfigData ? (
				<CustomConfigList
					data={data}
					showCustomConfigForm={showCustomConfigForm}
					setViewAndEditConfigData={setViewAndEditConfigData}
				/>
			) : null}
		</div>
	);
}
export default CustomConfig;
