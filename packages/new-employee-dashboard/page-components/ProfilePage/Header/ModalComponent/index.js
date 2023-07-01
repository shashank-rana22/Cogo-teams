import { Input } from '@cogoport/components';

import getElementController from '../../../../configs/getElementController';
import getControls from '../../../../utils/ctc-modal-form-controls';

import styles from './styles.module.css';

const DEFAULT_VALUE = 0;
const TOFIXED_NUMBER = 2;

function ModalComponent({
	ctcStructure,
	initialQuestion,
	setInitialQuestion,
	control,
	error,
}) {
	const finalControls = getControls(initialQuestion);

	return (
		<div>
			<div className={styles.header_field}>
				<div className={styles.control_label}>
					Input Target Annual Gross Salary (Fixed component)
				</div>
				<div className={styles.field_heading}>
					<Input
						placeholder="Set Offered CTC"
						value={initialQuestion}
						onChange={(e) => {
							setInitialQuestion(e);
						}}
						type="number"
						className={styles.field}
					/>
					{error ? <div className={styles.error}>Required field</div> : null}
				</div>
			</div>

			<div className={styles.table_container}>
				<div className={styles.heading}>
					<h4 style={{ width: '60%' }}>Components</h4>
					<h4 style={{ width: '20%' }}>Annual Salary</h4>
					<h4 style={{ width: '20%' }}>Monthly Salary</h4>
				</div>

				{Object.entries(ctcStructure).map(([key, value]) => {
					const { heading, yearlyValue, monthlyValue } = value;
					return (
						<div className={styles.list} key={key}>
							<div style={{ width: '60%' }}>{heading ?? '___'}</div>
							<div style={{ width: '20%' }}>
								{Number(yearlyValue || DEFAULT_VALUE).toFixed(TOFIXED_NUMBER) ?? '___'}
							</div>
							<div style={{ width: '20%' }}>
								{(Number(monthlyValue || DEFAULT_VALUE).toFixed(TOFIXED_NUMBER)) ?? '___'}
							</div>
						</div>
					);
				})}
			</div>

			{finalControls.map((controlItem) => {
				const { yearly, monthly } = controlItem;

				const Element = getElementController(controlItem?.yearly.type);

				if (!Element) return null;

				return (
					<div key={yearly.name} className={styles.control_container}>
						<span className={styles.label}>{yearly.label}</span>
						<div style={{ marginRight: '4px', width: '40%' }}>
							<Element
								{...yearly}
								size="sm"
								key={yearly.name}
								control={control}
								className={styles.field_controller}
							/>
						</div>

						<div style={{ marginRight: '4px', width: '40%' }}>
							<Element
								{...monthly}
								size="sm"
								key={monthly.name}
								control={control}
								className={styles.field_controller}
							/>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default ModalComponent;
