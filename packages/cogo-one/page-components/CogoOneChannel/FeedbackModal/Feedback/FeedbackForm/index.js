import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMFeedback } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import { getFieldController } from '../../../../../helpers/getFieldController';
import useAddFeedback from '../../../../../hooks/useAddFeedback';
import useRaiseTicketcontrols from '../../../../../hooks/useFeedbackControls';

import styles from './styles.module.css';

const MIN_CHARACTER_COUNT = 0;

function FeedbackForm({ getFeedbacks = () => {}, setShowAddFeedback = () => {} }) {
	const { t } = useTranslation(['myTickets']);

	const [additionalInfo, setAdditionalInfo] = useState([]);
	const [defaultTypeId, setDefaultTypeId] = useState('');
	const [subCategories, setSubCategories] = useState({
		options  : [],
		subCatId : null,
	});

	const formProps = useForm();

	const {
		handleSubmit = () => {},
		watch = () => {},
		formState = {},
		control = {},
		resetField = () => {},
		setValue = () => {},
	} = formProps || {};

	const { errors = {} } = formState || {};

	const watchCategory = watch('category');
	const watchDescription = watch('additional_information');
	const watchSubCategory = watch('sub_category');
	const watchIdType = watch('id_type');
	const watchServiceType = watch('service_type');
	const watchTradeType = watch('trade_type');
	const watchService = watch('service');

	const { options = [], subCatId = null } = subCategories || {};

	const { addFeedback, loading } = useAddFeedback({
		getFeedbacks,
		additionalInfo,
		setShowAddFeedback,
		defaultTypeId,
		subCatId,
	});

	const formattedSubCategories = (options || []).map((item) => ({
		label : item?.name,
		value : item?.name,
		subId : item?.id,
	}));

	const defaultControls = useRaiseTicketcontrols({
		setAdditionalInfo,
		watchCategory,
		setDefaultTypeId,
		resetField,
		formattedSubCategories,
		setSubCategories,
		watchSubCategory,
		setValue,
		t,
		watchTradeType,
		watchService,
		watchServiceType,
		watchIdType,
	});

	const fileUploader = defaultControls.pop();

	const controls = defaultControls?.concat(fileUploader);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.title}>
					<IcMFeedback />
					Add Feedback
				</div>

				<Button
					size="sm"
					themeType="link"
					onClick={() => setShowAddFeedback(false)}
				>
					Back
				</Button>
			</div>

			<form className={styles.form} onSubmit={handleSubmit(addFeedback)}>
				{controls.map((controlItem) => {
					const elementItem = { ...controlItem };
					const { name, label, controllerType } = elementItem || {};
					const Element = getFieldController(controllerType);

					const checkRates = !['shipment', 'rates']?.includes(watchCategory?.toLowerCase());
					const hideSid = name === 'serial_id' && checkRates;
					const hideService = name === 'service' && watchCategory?.toLowerCase() !== 'shipment';
					const hideTradeType = name === 'trade_type' && checkRates;
					const hideSubCategory = name === 'sub_category' && watchCategory !== 'Tech';
					const hideRateRequest = ['service_type', 'id_type'].includes(name)
					&& watchCategory?.toLowerCase() !== 'rates';

					if (hideService || hideTradeType || hideSubCategory || hideSid || hideRateRequest) {
						return null;
					}

					if (!Element) { return null; }

					return (
						<div
							key={controlItem.name}
							className={styles.field}
						>
							{label && controllerType !== 'checkbox'
							&& (
								<div className={styles.label}>
									<div className={styles.sub_label}>{label}</div>
									{controlItem.name === 'additional_information'
										? (
											<div className={styles.info_label}>
												{`${watchDescription?.length || MIN_CHARACTER_COUNT} / 350 characters`}
											</div>
										) : null}
								</div>
							)}
							<Element
								{...elementItem}
								size="sm"
								key={name}
								control={control}
								id={`${name}_input`}
							/>
							<div className={styles.error}>{errors?.[controlItem.name] && 'Required'}</div>
						</div>
					);
				})}
				<div className={styles.footer}>
					<Button size="md" type="submit" loading={loading}>
						Submit
					</Button>
				</div>
			</form>
		</div>
	);
}

export default FeedbackForm;
