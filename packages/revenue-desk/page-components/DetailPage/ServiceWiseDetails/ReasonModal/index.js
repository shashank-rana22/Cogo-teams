import { Button, Modal, Radio, Textarea } from '@cogoport/components';

import { VALUE_TWO, VALUE_ZERO, VALUE_ONE } from '../../../constants';

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
		<Modal size="lg" show={modalStep === VALUE_TWO} onClose={() => setModalStep(VALUE_ZERO)} placement="center">
			<Modal.Header title="PREVIEW" />
			<Modal.Body>
				<div className={styles.modal_text}>
					*You have used Revenue Desk wallet to apply discount.
					Please provide a reason for approving this booking at this rate.
				</div>
				<Radio
					label="To improve customer relations."
					value="to_improve_customer_relations"
					onChange={() => handleOnChange('to_improve_customer_relations')}
					checked={reason === 'to_improve_customer_relations'}
				/>
				<Radio
					label="To improve supplier relations"
					value="to_improve_supplier_relations"
					onChange={() => handleOnChange('to_improve_supplier_relations')}
					checked={reason === 'to_improve_supplier_relations'}
				/>
				<Radio
					label="To honor platform rates."
					value="to_honor_platform_rates"
					onChange={() => handleOnChange('to_honor_platform_rates')}
					checked={reason === 'to_honor_platform_rates'}
				/>
				<Radio
					label="To honor contract booking."
					value="to_honor_contract_booking"
					onChange={() => handleOnChange('to_honor_contract_booking')}
					checked={reason === 'to_honor_contract_booking'}
				/>
				<Radio
					label="overall profitable but individual service loss."
					value="overall_profitable_but_individual_service_loss"
					onChange={() => handleOnChange('overall_profitable_but_individual_service_loss')}
					checked={reason === 'overall_profitable_but_individual_service_loss'}
				/>
				<div style={{ padding: '0 10px' }}>
					Remarks:
					<Textarea
						name="a4"
						size="sm"
						placeholder="Remarks"
						value={othertext}
						onChange={(val) => setOthertext(val)}
					/>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<div className={styles.btn_container}>
					<Button themeType="secondary" onClick={() => setModalStep(VALUE_ONE)}>Back</Button>
					<Button
						themeType="accent"
						disabled={!reason}
						onClick={() => updateTrigger()}
					>
						Submit

					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}
export default ReasonModal;
