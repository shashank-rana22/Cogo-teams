import { Button } from '@cogoport/components';
import { useState } from 'react';

import useUpdateOrganizationService from '../../../../hooks/useUpdateOrganizationService';

import ModalComp from './ModalComp';
import styles from './styles.module.css';

function Footer({ organization_id = '', service = '', handleSubmit = () => {} }) {
	const [showModal, setShowModal] = useState(false);
	const [title, setTitle] = useState('');
	const { apiTrigger:submitForm = () => {} } = useUpdateOrganizationService();
	const onSubmit = (values) => {
		const { cooling_days = '', credit_amount = '', credit_currency = '', credit_days = '' } = values;

		submitForm({
			data: {
				cooling_days,
				credit_amount,
				credit_currency,
				credit_days,
				delete_rest_expertise : false,
				organization_id,
				service,
				status                : 'active',
			},
		});
	};
	return (
		<div className={styles.flex}>
			{showModal ? (
				<ModalComp
					title={title}
					show={showModal}
					setShow={setShowModal}
					submitForm={submitForm}
					organization_id={organization_id}
					service={service}
				/>
			) : null}
			<Button
				themeType="secondary"
				size="lg"
				onClick={() => { setShowModal(true); setTitle('information'); }}
				className={styles.button}
			>
				MORE INFORMATION REQUIRED
			</Button>
			<Button
				className={styles.button}
				themeType="secondary"
				size="lg"
				onClick={() => { setShowModal(true); setTitle('reject'); }}
			>
				REJECT
			</Button>
			<Button themeType="primary" size="lg" onClick={handleSubmit(onSubmit)}>
				ACCEPT
			</Button>
		</div>
	);
}
export default Footer;
