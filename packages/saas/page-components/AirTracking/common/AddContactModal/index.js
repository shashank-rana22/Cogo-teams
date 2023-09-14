import { Modal, ButtonIcon, Button, cl } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import getAddContactControls from '../../configuration/addContactControls';
import useCreateContact from '../../hooks/useCreateContact';

import styles from './styles.module.css';

import getField from '@/packages/forms/Controlled';

function AddContactModal({
	addContact = false, setAddContact = () => {}, fetchContactList = () => {},
	activeTab = 'ocean',
}) {
	const { t } = useTranslation(['common', 'airOceanTracking']);

	const addContactControls = getAddContactControls({ t });

	const { formHook, loading, createContact, closeHandler } = useCreateContact({
		setAddContact,
		fetchContactList,
		activeTab,
	});
	const { control, formState: { errors }, handleSubmit, register } = formHook || {};

	const onSubmit = (data) => {
		createContact({ data, src: 'contactModal' });
	};

	return (
		<Modal show={addContact} onClose={closeHandler} closeOnOuterClick>
			<div className={styles.header}>
				<h3 className={styles.title}>{t('airOceanTracking:air_ocean_tracking_add_contact_label')}</h3>
				<ButtonIcon size="md" icon={<IcMCross />} themeType="primary" onClick={closeHandler} />
			</div>
			<div className={styles.body}>
				<div className={styles.row}>
					{addContactControls.map((config) => {
						const { name, type, label, rules } = config;
						const Element = getField(type);
						const isMobileNo = type === 'mobile_number';

						return (
							<div key={name} className={cl`${styles.col} ${styles?.[name]}`}>
								<p className={styles.label}>{label}</p>
								<Element
									{...config}
									control={control}
									mobileSelectRef={isMobileNo ? register(name, rules).ref : undefined}
								/>
								<p className={styles.errors}>{errors?.[name]?.message || errors?.[name]?.type}</p>
							</div>
						);
					})}
				</div>

			</div>
			<div className={styles.footer}>
				<Button type="button" themeType="secondary" onClick={closeHandler} disabled={loading}>
					{t('airOceanTracking:air_ocean_tracking_cancel_button_label')}
				</Button>
				<Button
					type="button"
					themeType="primary"
					className={styles.submit_btn}
					onClick={handleSubmit(onSubmit)}
					loading={loading}
				>
					{t('airOceanTracking:air_ocean_tracking_add_button_label')}
				</Button>
			</div>
		</Modal>
	);
}

export default AddContactModal;
