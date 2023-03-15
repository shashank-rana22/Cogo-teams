// import { useForm } from '@cogoport/forms';
import { useState } from 'react';

import CreateQuestion from '../../../../commons/CreateQuestion';

import styles from './styles.module.css';

function AddQuestionsForm() {
	// const [allKeysSaved, setAllKeysSaved] = useState(false);

	const [savedQuestionDetails, setSavedQuestionDetails] = useState([{ id: new Date().getTime(), isNew: true }]);

	const [formToShow, setFormToShow] = useState(savedQuestionDetails[0].id);

	console.log(setFormToShow, setSavedQuestionDetails);

	// const {
	// 	fields = {},
	// 	watch,
	// 	handleSubmit = () => {},
	// 	formState: { errors = {} },
	// 	reset,
	// 	setValue,
	// 	getValues,
	// 	register,
	// } = useForm();

	return (
		<div className={styles.container}>
			<div className={styles.label}>Questions</div>

			{savedQuestionDetails.map((item, index) => {
				const { id } = item;

				if (id === formToShow) {
					return <CreateQuestion index={index} />;
				}

				return null;
			})}
		</div>
	);
}

export default AddQuestionsForm;
