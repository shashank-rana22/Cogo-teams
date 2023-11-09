import { Button, Modal } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';

import FormItem from '../../../../common/FormItem';
import getPersonalDetailControls from '../../../../configurations/personalDetailControls';

import styles from './styles.module.css';

function PersonalDetailsModal({ detailModal = {}, setDetailModal }) {
	const { info, openModal } = detailModal;

	const { t } = useTranslation(['cargoInsurance']);
	const personalDetailControls = getPersonalDetailControls({ t });

	const formhook = useForm();
	const { setValue } = formhook;

	useEffect(() => {
		if (!isEmpty(info)) {
			setValue('firstName', info?.insuredFirstName);
			setValue('lastName', info?.insuredLastName);
			setValue('email', info?.email);
			setValue('phoneNo', info?.phoneNo);
		}
	}, [info, setValue]);

	return (
		<Modal show={openModal} onClose={() => setDetailModal({ openModal: false })} placement="top-right" size="sm">
			<Modal.Header title={t('cargoInsurance:poc_edit')} />

			<div className={styles.modal_body}>
				<FormItem formhook={formhook} controls={personalDetailControls} />
			</div>

			<Modal.Footer>
				<Button
					themeType="secondary"
					className={styles.cancel_btn}
					onClick={() => setDetailModal({ openModal: false })}
				>
					{t('cargoInsurance:cancel')}
				</Button>

				<Button themeType="accent">{t('cargoInsurance:save')}</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default PersonalDetailsModal;
