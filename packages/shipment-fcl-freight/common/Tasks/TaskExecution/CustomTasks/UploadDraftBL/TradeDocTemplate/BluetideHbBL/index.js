import { useForm } from '@cogoport/forms';
import React, { useState, forwardRef, useImperativeHandle } from 'react';

import Annexure from './Annexure';
import Frontside from './Frontside';
import styles from './styles.module.css';

function BluetideHBL({ mode = 'read' }, ref) {
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

	// const onSubmit = (data) => console.log({ data });

	useImperativeHandle(ref, () => ({ submit: handleSubmit }));

	return (
		<>
			<Frontside
				mode={mode}
				addAnnexure={addAnnexure}
				setaddAnnexure={setaddAnnexure}
				control={control}
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
