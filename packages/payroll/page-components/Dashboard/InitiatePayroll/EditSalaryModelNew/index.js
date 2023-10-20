import { Button, Modal, Loader } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useState } from 'react';

import useUpdateSalaryDetails from '../../../../hooks/useUpdateSalaryDetails';
import { EDIT_MODEL_LABELS } from '../../../../utils/constants';

import Additions from './Additions';
import PayableDays from './PayableDaysAccordion';
import styles from './styles.module.css';

function EditSalarayModelNew({
	show = false,
	onClose = () => {}, data = {}, id = '', employee_id = '', loading = false,
	getEmployeePayrolls = () => {},
}) {
	const [showAccordion, setShowAccordion] = useState('payable');
	const { control, errors, setValue, handleSubmit, reset, watch } = useForm();
	const [deletedValues, setDeletedValues] = useState({ additions: [], deductions: [] });

	const { updateSalaryDetails } = useUpdateSalaryDetails();

	const handleCloseModal = () => {
		reset();
		onClose();
	};

	const onSubmit = async (values) => {
		const payload = {
			id,
			employee_id,
			payable_days : values.payable_days,
			additions    : [
				...values.additions,
				...deletedValues?.additions || [],
			],
			deductions: [
				...values.deductions,
				...deletedValues?.deductions || [],
			],
		};
		await updateSalaryDetails({ payload });
		await getEmployeePayrolls();
		onClose();
	};

	return (
		<Modal size="xl" show={show} onClose={handleCloseModal} placement="center" className={styles.modal_container}>
			<Modal.Header title={(
				<div className={styles.styled_header}>
					Edit Salary
				</div>
			)}
			/>
			<Modal.Body styles={styles.modal_body}>
				{
				loading ? (
					<>
						<PayableDays
							showAccordion={showAccordion}
							control={control}
							errors={errors}
							setShowAccordion={setShowAccordion}
							title="payable"
							payable_days={data?.payable_days}
							setValue={setValue}
						/>
						{
					EDIT_MODEL_LABELS.map((item) => (
						<Additions
							key={item.title}
							showAccordion={showAccordion}
							control={control}
							errors={errors}
							setShowAccordion={setShowAccordion}
							title={item.title}
							subTitle={item.subTitle}
							data={data}
							total={item.total}
							watch={watch}
							setValue={setValue}
							setDeletedValues={setDeletedValues}
						/>
					))
				}

					</>

				)
					: <Loader themeType="primary" />
			}
			</Modal.Body>
			<Modal.Footer className={styles.modal_footer}>
				<Button
					size="md"
					themeType="secondary"
					className={styles.cancel_modal_btn}
					onClick={handleCloseModal}
				>
					Cancel
				</Button>

				<Button
					size="md"
					themeType="Accent"
					className={styles.proceed_modal_btn}
					onClick={handleSubmit(onSubmit)}
				>
					Save Changes
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default EditSalarayModelNew;
