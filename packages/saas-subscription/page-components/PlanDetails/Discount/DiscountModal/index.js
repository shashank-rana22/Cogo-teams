import { cl, Modal, Button, Pill } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import usePlanDiscount from '../../../../hooks/usePlanDiscount';
import { getFieldController } from '../../../../utils/getFieldController';

import styles from './styles.module.css';

function ModalHeader({ service_name = '', config_type = '', isCreate = false }) {
	const { t } = useTranslation(['saasSubscription']);
	return (
		<div className={styles.modal_header}>
			<h3 className={styles.modal_title}>{t('saasSubscription:discount')}</h3>
			{!isCreate ? (
				<div>
					<Pill size="sm" color="red">{startCase(service_name)}</Pill>
					<Pill size="sm" color="orange">{startCase(config_type)}</Pill>
				</div>
			) : null}
		</div>
	);
}

function DiscountModal({ discountModal, setDiscountModal, setFeatureModal }) {
	const { t } = useTranslation(['saasSubscription']);

	const { info, isCreate = false } = discountModal || {};

	const {
		loading, formHook, submitHandler,
		discountControls,
	} = usePlanDiscount({ discountModal, setFeatureModal, setDiscountModal });

	const { control, handleSubmit } = formHook;

	const closeModalHandler = () => {
		setDiscountModal({ open: false });
	};

	return (
		<Modal show={discountModal.open} onClose={closeModalHandler} closeOnOuterClick>
			<Modal.Header title={<ModalHeader {...info} isCreate={isCreate} />} />

			<div className={styles.modal_body}>
				<div className={styles.form_container}>

					{discountControls.map((config) => {
						const { name, label, type, rules, showEle = true, showOptional = true } = config;

						const Element = getFieldController(type);

						if (!showEle) return null;

						return (
							<div key={name} className={cl`${styles.col} ${styles[config.name]}`}>

								<div className={styles.label_container}>
									<p>{label}</p>

									{(isEmpty(rules) && showOptional)
										? <p className={styles.opt_text}>(Optional)</p>
										: null}
								</div>
								<Element control={control} {...config} />
							</div>
						);
					})}
				</div>
			</div>

			<Modal.Footer>
				<Button
					themeType="secondary"
					onClick={closeModalHandler}
					disabled={loading}
				>
					{t('saasSubscription:cancel')}
				</Button>

				<Button
					className={styles.submit_btn}
					loading={loading}
					onClick={handleSubmit(submitHandler)}
				>
					{t('saasSubscription:submit')}
				</Button>
			</Modal.Footer>

		</Modal>
	);
}

export default DiscountModal;
