import { Modal, Loader } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import React, { useState } from 'react';

import { EDIT_MODEL_LABELS } from '../../../../utils/constants';

import Additions from './Additions';
import PayableDays from './PayableDaysAccordion';
import styles from './styles.module.css';

function EditSalarayModelNew({
	show = false,
	onClose = () => {}, data = {},
	loading = false,
}) {
	const [showAccordion, setShowAccordion] = useState('payable');
	const { control, errors, setValue, reset, watch } = useForm();

	const handleCloseModal = () => {
		reset();
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
						/>
					))
				}

					</>

				)
					: <Loader themeType="primary" />
			}
			</Modal.Body>
		</Modal>
	);
}

export default EditSalarayModelNew;
