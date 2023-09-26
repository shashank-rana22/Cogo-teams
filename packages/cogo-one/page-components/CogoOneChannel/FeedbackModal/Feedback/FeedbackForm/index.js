import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMFeedback } from '@cogoport/icons-react';

import { getFieldController } from '../../../../../helpers/getFieldController';
import useAddFeedback from '../../../../../hooks/useAddFeedback';
import useRaiseTicketcontrols from '../../../../../hooks/useFeedbackControls';

import styles from './styles.module.css';

function FeedbackForm({ getFeedbacks = () => {}, setShowAddFeedback = () => {} }) {
	const formProps = useForm();

	const {
		handleSubmit = () => {},
		watch = () => {},
		formState = {},
		control = {},
	} = formProps || {};

	const { errors = {} } = formState || {};

	const watchCategory = watch('category');

	const controls = useRaiseTicketcontrols({ watchCategory });

	const { addFeedback, loading } = useAddFeedback({
		getFeedbacks,
		setShowAddFeedback,
	});

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.title}>
					<IcMFeedback />
					Add feedback
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
