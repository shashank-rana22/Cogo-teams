import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';

import Annexure from './Annexure';
import Frontside from './Frontside';
import styles from './styles.module.css';
import useDefaultValues from './useDefaultValues';

const CONTAINERS_MIN_LENGTH_FOR_ANNEXURE = 1;

function BluetideHBL({ mode = 'read', initialValues = {}, watermark = null }, ref) {
	const [addAnnexure, setaddAnnexure] = useState(false);
	const containerCountMoreThan1 = (initialValues?.containers || []).length > CONTAINERS_MIN_LENGTH_FOR_ANNEXURE;

	const { customDefaultValues } = useDefaultValues(initialValues);

	const defaultValues = { ...customDefaultValues, ...initialValues?.containers?.[GLOBAL_CONSTANTS.zeroth_index] };

	const { control, handleSubmit } = useForm({ defaultValues });

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
				watermark={watermark}
			/>
			{addAnnexure && (
				<>
					<div className={styles.page_break} />
					<Annexure
						initialValues={customDefaultValues}
						mode={mode}
						control={control}
						watermark={watermark}
					/>
				</>
			)}
		</>
	);
}

export default forwardRef(BluetideHBL);
