// import Layout from '@cogo/business-modules/form/Layout';
import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import CreateForm from '../../../../../common/CreateForm';

import styles from './styles.module.css';

function QuestionsForm({
	controls,
	fields,
	errors,
	confirmEdit,
	editItem = {},
	apiLoading,
	setValues = () => {},
	getValues = () => {},
	setShowbutton = () => {},
	SaveQuestions = () => {},
	AddQuestions = () => {},
	onCancelEdit = () => {},
	handleSubmit = () => {},
	onError = () => {},
	setShowForm = { setShowForm },
}) {
	if (confirmEdit) {
		const newQuestion = getValues();

		let finalQuestion = editItem;

		const { question } = newQuestion || {};

		if (!isEmpty(question)) {
			finalQuestion = newQuestion;
		}

		setShowbutton(false);
		setShowForm(false);
		setValues(finalQuestion);
	}

	return (
		<div className={styles.container}>

			<CreateForm
				formProps={formProps}
				controls={controls}
				onSubmit={onSubmit}
				onCancel={onCancelEdit}
			/>
			<form onSubmit={handleSubmit(AddQuestions, onError)}>

				<div className={styles.save_button}>
					<Button
						className="secondary sm"
						onClick={() => {
							onCancelEdit();
						}}
						disabled={apiLoading}
						style={{ marginRight: '16px' }}
					>
						Cancel
					</Button>

					{confirmEdit ? (
						<Button
							className="primary sm"
							onClick={() => {
								SaveQuestions();
							}}
						>
							Save
						</Button>
					) : (
						<Button loading={apiLoading} className="primary sm" type="submit">
							Add
						</Button>
					)}
				</div>
			</form>
		</div>
	);
}
export default QuestionsForm;
