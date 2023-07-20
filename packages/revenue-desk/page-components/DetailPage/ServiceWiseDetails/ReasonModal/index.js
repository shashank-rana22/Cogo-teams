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
	const options = [
		{
			label : 'To improve customer relations.',
			value : 'to_improve_customer_relations',
		},
		{
			label : 'To improve supplier relations',
			value : 'to_improve_supplier_relations',
		},
		{
			label : 'To honor platform rates.',
			value : 'to_honor_platform_rates',
		},
		{
			label : 'To honor contract booking.',
			value : 'to_honor_contract_booking',
		},
		{
			label : 'overall profitable but individual service loss.',
			value : 'overall_profitable_but_individual_service_loss',
		},
	];
	return (
		<Modal size="lg" show={modalStep === VALUE_TWO} onClose={() => setModalStep(VALUE_ZERO)} placement="center">
			<Modal.Header title="PREVIEW" />
			<Modal.Body>
				<div className={styles.modal_text}>
					*You have used Revenue Desk wallet to apply discount.
					Please provide a reason for approving this booking at this rate.
				</div>
				{options.map((option) => (
					<Radio
						key={option.value}
						label={option.label}
						value={option.value}
						onChange={() => handleOnChange(option.value)}
						checked={reason === option.value}
					/>
				))}
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
