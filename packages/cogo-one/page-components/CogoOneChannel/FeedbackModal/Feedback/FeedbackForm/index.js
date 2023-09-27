import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMFeedback } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import { getFieldController } from '../../../../../helpers/getFieldController';
import useAddFeedback from '../../../../../hooks/useAddFeedback';
import useRaiseTicketcontrols from '../../../../../hooks/useFeedbackControls';

import styles from './styles.module.css';

function FeedbackForm({ getFeedbacks = () => {}, setShowAddFeedback = () => {} }) {
	const { t } = useTranslation(['myTickets']);

	const [additionalInfo, setAdditionalInfo] = useState([]);

	const formProps = useForm();

	const {
		handleSubmit = () => {},
		watch = () => {},
		formState = {},
		control = {},
	} = formProps || {};

	const { errors = {} } = formState || {};

	const watchCategory = watch('category');

	const { addFeedback, loading } = useAddFeedback({
		getFeedbacks,
		additionalInfo,
		setShowAddFeedback,
	});

	const defaultControls = useRaiseTicketcontrols({ setAdditionalInfo, watchCategory });

	const additionalControls = (additionalInfo || []).map((item) => ({
		label          : item,
		name           : item,
		controllerType : 'text',
		placeholder    : `${t('myTickets:add')} ${item?.toLowerCase()}`,
		showOptional   : false,
	}));

	const fileUploader = defaultControls.pop();

	const controls = defaultControls?.concat(additionalControls, fileUploader);

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
									&& <div className={styles.info_label}>(max 200 characters)</div>}
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
