import { Button } from '@cogoport/components';
import { Layout } from '@cogoport/surface-modules';
import React from 'react';

import useCreateOrganizationPoc from './hooks/useCreateOrganizationPoc';
import styles from './styles.module.css';

function Form({
	fetch = () => {},
	organization_id,
	showInternal = '',
	setShowInternalInternal = () => {},
}) {
	const {
		control,
		handleSubmit,
		createOrgPoc,
		formState,
		controls,
		createOrganizationPocAPI,
	} = useCreateOrganizationPoc({
		fetch,
		organization_id,
		item    : showInternal,
		setItem : setShowInternalInternal,
	});

	const { loading } = createOrganizationPocAPI;

	return (
		<div className={styles.container}>
			<div className={styles.layout_container}>
				<Layout fields={controls} control={control} errors={formState.errors} />
			</div>

			<div className={styles.button_container}>
				<Button
					disabled={loading}
					onClick={() => setShowInternalInternal(false)}
					style={{ marginRight: '12px' }}
				>
					Back
				</Button>

				<Button onClick={handleSubmit(createOrgPoc)}>Add</Button>
			</div>
		</div>
	);
}

export default Form;
