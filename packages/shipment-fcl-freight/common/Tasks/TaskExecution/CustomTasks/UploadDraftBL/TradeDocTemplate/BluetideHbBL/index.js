import { useForm } from '@cogoport/forms';
import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';

import Annexure from './Annexure';
import Frontside from './Frontside';
import styles from './styles.module.css';

function BluetideHBL({ mode = 'read', initialValues = {} }, ref) {
	const [addAnnexure, setaddAnnexure] = useState(false);
	const containerCountMoreThan1 = (initialValues?.containers || []).length > 1;

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

	useEffect(() => {
		setaddAnnexure(containerCountMoreThan1);
	}, [containerCountMoreThan1]);

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
					<Annexure
						initialValues={initialValues}
						mode={mode}
						control={control}
					/>
				</>
			)}
		</>
	);
}

export default forwardRef(BluetideHBL);
