import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMFeedback } from '@cogoport/icons-react';

import useAddFeedback from '../hooks/useAddFeedback';
import useRaiseTicketcontrols from '../hooks/useFeedbackControls';
import { getFieldController } from '../utils/getFieldController';

import styles from './styles.module.css';

const MIN_CHARACTER_COUNT = 0;

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
	const watchDescription = watch('additional_information');

	const controls = useRaiseTicketcontrols({ watchCategory });

	const { addFeedback, loading } = useAddFeedback({ getFeedbacks, setShowAddFeedback });

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.title}>
					<IcMFeedback />
					Add feedback
				</div>

				<Button size="md" themeType="link" onClick={() => setShowAddFeedback(false)}>Hide</Button>
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
