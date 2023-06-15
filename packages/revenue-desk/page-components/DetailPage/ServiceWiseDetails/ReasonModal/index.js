import { Button, Checkbox, Modal, Textarea } from '@cogoport/components';

import styles from './styles.module.css';

function ReasonModal({ modalStep, setModalStep, updateTrigger, reason, setReason, othertext, setOthertext }) {
	const handleOnChange = (val) => {
		if (reason === val) {
			setReason(null);
		} else {
			setReason(val);
		}
	};
	return (
		<Modal size="lg" show={modalStep === 2} onClose={() => setModalStep(0)} placement="center">
			<Modal.Header title="PREVIEW" />
			<Modal.Body>
				<div className={styles.modal_text}>
					*You have used Revenue Desk wallet to apply discount.
					Please provide a reason for approving this booking at this rate.
				</div>
				<Checkbox
					label="To improve customer relations."
					value="to_improve_customer_relations"
					onChange={() => handleOnChange('to_improve_customer_relations')}
					checked={reason === 'to_improve_customer_relations'}
				/>
				<Checkbox
					label="To improve supplier relations"
					value="to_improve_supplier_relations"
					onChange={() => handleOnChange('to_improve_supplier_relations')}
					checked={reason === 'to_improve_supplier_relations'}
				/>
				<Checkbox
					label="To honor platform rates."
					value="to_honor_platform_rates"
					onChange={() => handleOnChange('to_honor_platform_rates')}
					checked={reason === 'to_honor_platform_rates'}
				/>
				<Checkbox
					label="To honor contract booking."
					value="to_honor_contract_booking"
					onChange={() => handleOnChange('to_honor_contract_booking')}
					checked={reason === 'to_honor_contract_booking'}
				/>
				<Checkbox
					label="overall profitable but individual service loss."
					value="overall_profitable_but_individual_service_loss"
					onChange={() => handleOnChange('overall_profitable_but_individual_service_loss')}
					checked={reason === 'overall_profitable_but_individual_service_loss'}
				/>
				<Checkbox
					label="Other"
					value="other"
					onChange={() => handleOnChange('other')}
					checked={reason === 'other'}
				/>
				{reason === 'other' && (
					<div style={{ padding: '0 10px' }}>
						<Textarea
							name="a4"
							size="sm"
							placeholder="Other Reason"
							value={othertext}
							onChange={(val) => setOthertext(val)}
						/>

					</div>
				)}
			</Modal.Body>
			<Modal.Footer>
				<div className={styles.btn_container}>
					<Button themeType="secondary" onClick={() => setModalStep(1)}>Back</Button>
					<Button themeType="accent" onClick={() => updateTrigger()}>Submit</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}
export default ReasonModal;
