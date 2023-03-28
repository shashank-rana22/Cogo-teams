import { Toast, Button, Checkbox } from '@cogoport/components';
import { useForm, InputController } from '@cogoport/forms';
import React from 'react';

import styles from './styles.module.css';

const FEEDBACK_MAPPING = {
	true  : 'liked',
	false : 'disliked',
};

function DisLikeBox({
	loading,
	trigger,
	setIsLiked,
	is_positive,
	setCheckboxA,
	setCheckboxQ,
	checkboxA,
	checkboxQ,
	data = {},
	setShow = () => {},
	setload = () => {},
	fetch = () => {},
}) {
	const {
		handleSubmit,
		formState: { errors },
		control,
	} = useForm();

	const onSubmit = async (values) => {
		setload(false);

		let remark = values?.remark;
		if (checkboxA) {
			remark = `Answer not satisfactory. ${remark}`;
		}
		if (checkboxQ) {
			remark = `Question not satisfactory. ${remark}`;
		}

		let payload = {
			faq_answer_id : data?.answers?.[0]?.id,
			is_positive   : false,
			remark,
			status        : 'active',
		};
		if (data?.answers?.[0]?.faq_feedbacks?.[0]?.is_positive) {
			payload = {
				id            : data?.answers?.[0]?.faq_feedbacks?.[0]?.id,
				faq_answer_id : data?.answers?.[0]?.id,
				is_positive   : false,
				remark,
				status        : 'active',
			};
		}

		try {
			await trigger({
				data: payload,
			});
			setIsLiked('disliked');
			setShow(false);
			fetch();
		} catch (error) {
			Toast.error(error?.message);
		}
	};

	const onClose = () => {
		setIsLiked(FEEDBACK_MAPPING[is_positive] || '');
		setShow(false);
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.modal_header}>Please provide the reason for your dislike</div>

			<div>
				<div className={styles.checkbox_group}>
					<Checkbox
						className="primary lg"
						checked={checkboxQ}
						onChange={() => {
							setCheckboxQ(!checkboxQ);
						}}
					/>
					<div className={styles.tag}>Question not satisfactory</div>
				</div>

				<div className={styles.checkbox_group}>
					<Checkbox
						className="primary lg"
						checked={checkboxA}
						onChange={() => {
							setCheckboxA(!checkboxA);
						}}
					/>
					<div className={styles.tag}>Answer not satisfactory</div>
				</div>
			</div>

			<div className={styles.remark}>
				<div className={styles.title}>Remarks</div>
				<InputController
					control={control}
					name="remark"
					type="text"
					placeholder="Enter remark here"
					rules={{ required: 'Remark is required' }}
				/>
				{errors.remark && (
					<span className={styles.error}>{errors.remark.message}</span>
				)}
			</div>

			<div className={styles.button_box}>
				<Button
					size="sm"
					themeType="secondary"
					onClick={onClose}
					className={styles.close_btn}
				>
					Close
				</Button>
				<Button
					type="submit"
					size="sm"
					themeType="primary"
					className={styles.submit_btn}
					loading={loading}
				>
					Submit
				</Button>
			</div>
		</form>
	);
}

export default DisLikeBox;
