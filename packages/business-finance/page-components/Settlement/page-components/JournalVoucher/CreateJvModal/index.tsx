import { Button, Modal } from '@cogoport/components';
import {
	AsyncSelectController,
	DatepickerController,
	InputController,
	// SelectController,
	TextAreaController,
	useForm,
} from '@cogoport/forms';
import getCurrencyOptions from '@cogoport/globalization/utils/getCurrencyOptions';
import React from 'react';

import { EMPTY_LINE_ITEMS } from '../../../Constants';

import LineItemDetails from './LineItemDetails';
import styles from './styles.module.css';

function CreateJvModal({ show, onClose = () => { } }) {
	const { control, watch } = useForm({
		defaultValues:
			{ line_items: [{ EMPTY_LINE_ITEMS }] },
	});

	return (
		<Modal size="xl" show={show} onClose={onClose} placement="center">
			<Modal.Header title="Create JV Modal" />
			<Modal.Body className={styles.modal_data}>
				<div className={styles.flex}>
					<div className={`${styles.selectcontainer} ${styles.marginright}`}>
						<div className={styles.label}>Site/Entity</div>
						<AsyncSelectController
							control={control}
							name="entityCode"
							asyncKey="list_cogo_entity"
							placeholder="Sales Entity"
						/>
					</div>
					<div className={`${styles.selectcontainer} ${styles.marginright}`}>
						<div className={styles.label}>JV Category</div>
						<AsyncSelectController
							control={control}
							name="category"
							asyncKey="journal_category"
							placeholder="JV Category"
						/>
					</div>
					<div className={`${styles.selectcontainer} ${styles.marginright}`}>
						<div className={styles.label}>Currency</div>
						<AsyncSelectController
							control={control}
							name="currency"
							options={getCurrencyOptions()}
							placeholder="Select Currency"
						/>
					</div>
					<div className={`${styles.datecontainer} ${styles.marginright}`}>
						<div className={styles.label}>Accounting Date</div>
						<DatepickerController
							control={control}
							name="accountingDate"
							placeholder="Accounting Date"
						/>
					</div>
					<div className={`${styles.selectcontainer} ${styles.marginright}`}>
						<div className={styles.label}>Journal</div>
						<AsyncSelectController
							control={control}
							name="journal"
							asyncKey="journal_code"
							placeholder="Select Journal"
						/>
					</div>
					<div className={`${styles.inputcontainer} ${styles.marginright}`}>
						<div className={styles.label}>Enter Exchange Rate</div>
						<InputController
							control={control}
							name="exchangeRate"
							placeholder="Exchange Rate"
							type="number"
						/>
					</div>
					<div className={`${styles.inputcontainer} ${styles.marginright}`}>
						<div className={styles.label}>Ledger Currency</div>
						<InputController
							control={control}
							name="ledCurrency"
							placeholder="Ledger Currency"
							type="number"
						/>
					</div>
				</div>
				<div className={`${styles.textareacontroller} ${styles.marginright}`}>
					<div className={styles.label}>Description</div>
					<TextAreaController
						control={control}
						name="description"
						placeholder="JV Description"
					/>
				</div>
				<div className={styles.statflex}>
					<div className={styles.stat}>
						<div className={styles.statlabel}>Description</div>
						<div className={styles.value}>Value</div>
					</div>
					<div className={styles.stat}>
						<div className={styles.statlabel}>Description</div>
						<div className={styles.value}>Value</div>
					</div>
					<div className={styles.stat}>
						<div className={styles.statlabel}>Description</div>
						<div className={styles.value}>Value</div>
					</div>
				</div>
				<LineItemDetails control={control} />
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={onClose}>Cancel</Button>
				<Button onClick={onClose}>Create Jv</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default CreateJvModal;
