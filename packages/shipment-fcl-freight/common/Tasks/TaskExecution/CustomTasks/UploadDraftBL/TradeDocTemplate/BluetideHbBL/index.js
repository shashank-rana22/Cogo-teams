import { useForm } from '@cogoport/forms';
import React, { useState, forwardRef, useImperativeHandle } from 'react';

import Annexure from './Annexure';
import Frontside from './Frontside';
import styles from './styles.module.css';

function BluetideHBL({ mode = 'read', initialValues = {} }, ref) {
	const [addAnnexure, setaddAnnexure] = useState(false); // for development

	const { control, handleSubmit } = useForm({
		defaultValues: {
			containers: [{
				container_number    : '',
				marks_and_number    : '',
				package_description : '',
				gross_weight        : '',
				measurement         : '',
			}],
		},
	});

	useImperativeHandle(ref, () => ({ submit: handleSubmit }));

	return (
		<>
			<Frontside
				mode={mode}
				addAnnexure={addAnnexure}
				setaddAnnexure={setaddAnnexure}
				control={control}
				initialValues={initialValues}
			/>

			{addAnnexure && (
				<>
					<div className={styles.page_break} />
					<Annexure mode={mode} control={control} />
				</>
			)}
		</>
	);
}

export default forwardRef(BluetideHBL);
