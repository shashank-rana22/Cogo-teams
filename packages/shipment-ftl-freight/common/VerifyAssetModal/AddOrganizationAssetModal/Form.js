import { Button } from '@cogoport/components';
import { Layout } from '@cogoport/surface-modules';
import React from 'react';

import useCreateOrganizationAsset from './hooks/useCreateOrganizationAsset';
import styles from './styles.module.css';

function Form({
	fetch = () => {},
	organization_id,
	setShowInternal = () => {},
	showInternal,
}) {
	const {
		control,
		handleSubmit,
		createOrgAsset,
		formState,
		controls,
		createOrganizationAssetAPI,
	} = useCreateOrganizationAsset({
		fetch,
		organization_id,
		item    : showInternal,
		setItem : setShowInternal,
	});

	const { loading } = createOrganizationAssetAPI;

	const onSubmit = async (values) => {
		await createOrgAsset(values);
	};
	return (
		<div className={styles.container}>
			<div className={styles.layout_container}>
				<Layout fields={controls} errors={formState.errors} control={control} />
			</div>

			<div className={styles.button_container}>
				<Button
					disabled={loading}
					onClick={() => setShowInternal(false)}
					style={{ marginRight: '12px' }}
				>
					Back
				</Button>

				<Button onClick={handleSubmit(onSubmit)}>Add</Button>
			</div>
		</div>
	);
}

export default Form;
