import { Button } from '@cogoport/components';
import React from 'react';

import usePostCreateEmployeeOfferLetter from '../../usePostCreateEmployeeOfferLetter';

import styles from './styles.module.css';

export default function SubmitSection({
	initialQuestion = '',
	ctcStructure = {},
	setVisible = () => {},
	detail,
	setShowCtcBreakupModal = () => {},
	setInitialQuestion = () => {},
	offerLetterApiRefetch,
	handleSubmit,
	reset,
	setError,
}) {
	const {
		loading,
		onFinalSubmit,
	} = usePostCreateEmployeeOfferLetter({ setShowCtcBreakupModal, offerLetterApiRefetch });

	const onSubmit = (values) => {
		if (initialQuestion) {
			onFinalSubmit(values, ctcStructure, initialQuestion, detail?.id);
			setVisible(false);
			setInitialQuestion('');
			reset();
		} else {
			setError(true);
		}
	};

	const onClose = () => {
		setVisible(false);
	};

	return (
		<div className={styles.popover_inner}>
			<h4>Are you sure?</h4>

			<div className={styles.sumbit}>
				<Button
					className={styles.button_submit}
					themeType="secondary"
					onClick={onClose}
					disabled={loading}
				>
					No
				</Button>

				<Button
					className={styles.button_submit}
					themeType="primary"
					onClick={handleSubmit(onSubmit)}
					loading={loading}
				>
					Yes
				</Button>
			</div>
		</div>
	);
}
