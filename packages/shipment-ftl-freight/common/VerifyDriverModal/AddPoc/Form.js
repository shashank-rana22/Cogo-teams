import Button from '@cogoport/components';
import { Layout } from '@cogoport/surface-modules';
import React from 'react';

import useCreateOrganizationPoc from './hooks/useCreateOrganizationPoc';
import styles from './styles.module.css';
// import { ButtonContainer, Container, LayoutContainer } from './styles';

function Form({
	fetch = () => {},
	organization_id,
	setShow = () => {},
	show,
}) {
	const {
		fields,
		handleSubmit,
		createOrgPoc,
		formState,
		controls,
		createOrganizationPocAPI,
	} = useCreateOrganizationPoc({
		fetch,
		organization_id,
		item    : show,
		setItem : setShow,
	});

	const { loading } = createOrganizationPocAPI;

	return (
		<div className={styles.container}>
			<div className={styles.layout_container}>
				<Layout controls={controls} errors={formState.errors} fields={fields} />
			</div>

			<div className={styles.button_container}>
				<Button
					disabled={loading}
					onClick={() => setShow(false)}
					className="secondary md"
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
