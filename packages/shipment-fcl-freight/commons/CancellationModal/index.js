import { Button } from '@cogoport/components';
import React from 'react';

// import Layout from '../../Layout';
import getShowElements from '../../utils/revenueDeskUtils/getShowElements';

import styles from './styles.module.css';

function CancellationModal({
	formValues = {},
	fields = {},
	modifiedControls = [],
	errors = {},
}) {
	const showElements = getShowElements(formValues);

	return (
		<div className={styles.container}>
			<div className={styles.form}>
				{/* <Layout
					fields={fields}
					controls={modifiedControls}
					errors={errors}
					themeType="admin"
					showElements={showElements}
				/> */}
			</div>
			<div className={styles.line} />
		</div>
	);
}

export default CancellationModal;
