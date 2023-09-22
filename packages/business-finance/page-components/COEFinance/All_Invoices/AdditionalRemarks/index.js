import { Checkbox, Radio, RadioGroup, Textarea } from '@cogoport/components';

import styles from './styles.module.css';

// eslint-disable-next-line max-lines-per-function
function AdditionalRemarks({ remarkData = {}, setRemarkData = () => {} }) {
	const handleCategoryChange = (fieldName) => {
		setRemarkData((prev) => ({
			...prev,
			profitability: {
				[fieldName]: true,
			},
		}));
	};

	const notBilledOptions = [
		{
			name  : 'R1',
			value : 'Service should have bill to customer',
			label : 'Service should have bill to customer',
		},
		{
			name  : 'R2',
			value : 'Incidental service; should add to sell quotation',
			label : 'Incidental service; should add to sell quotation',
		},
		{
			name  : 'R3',
			value : 'Detention charges; should add to sell quotation',
			label : 'Detention charges; should add to sell quotation',
		},
		{
			name  : 'R4',
			value : 'Rates should be disputed as inflated by supplier',
			label : 'Rates should be disputed as inflated by supplier',
		},
	];

	const billedOptions = [
		{
			name  : 'rates',
			value : 'Rates inflated from supplier',
			label : 'Rates inflated from supplier',
		},
		{
			name  : 'sell',
			value : 'Sell-side charged less then buy quotation',
			label : 'Sell-side charged less then buy quotation',
		},
		{
			name  : 'system',
			value : 'System error from RMS Sell quotation generated wrong',
			label : 'System error from RMS Sell quotation generated wrong',
		},
		{
			name  : 'locals',
			value : 'Cogo assured bookings RMS sell quotation not generated for locals',
			label : 'Cogo assured bookings RMS sell quotation not generated for locals',
		},
	];

	const draftOptions = [
		{
			name  : 'raised',
			value : 'Invoice raised more than or equals to buy',
			label : 'Invoice raised more than or equals to buy',
		},
		{
			name  : 'partial',
			value : 'Invoice raised of partial amount of buy',
			label : 'Invoice raised of partial amount of buy',
		},
		{
			name  : 'incidental',
			value : 'Incidental charges should be mark for review/finance accepted',
			label : 'Incidental charges should be mark for review/finance accepted',
		},
	];

	const mismatchedOptions = [
		{
			name  : 'airway',
			value : 'Airway bill number',
			label : 'Airway bill number',
		},
		{
			name  : 'bill',
			value : 'Bill of lading number',
			label : 'Bill of lading number',
		},
		{
			name  : 'lorry',
			value : 'Lorry Receipt',
			label : 'Lorry Receipt',
		},
		{
			name  : 'container',
			value : 'Container number',
			label : 'Container number',
		},
	];

	const miscellaneousOptions = [
		{
			name  : 'duplicate',
			value : 'Duplicate Invoice',
			label : 'Duplicate Invoice',
		},
		{
			name  : 'exeptions',
			value : 'Invoice not billed to cogoport',
			label : 'Invoice not billed to cogoport',
		},
		{
			name  : 'uploaded',
			value : 'Invocie uploaded in wrong SID',
			label : 'Invocie uploaded in wrong SID',
		},
		{
			name  : 'revised',
			value : 'Revised invoice received and this old one should be rejected',
			label : 'Revised invoice received and this old one should be rejected',
		},
		{
			name  : 'pod',
			value : 'POD not signed/stamped ',
			label : 'POD not signed/stamped ',
		},
	];

	return (
		<div>
			<h3>Rejection Reason:</h3>
			<Checkbox
				label="Profitability"
				checked={remarkData?.profitability}
				onChange={() => {
					setRemarkData((prev) => ({
						...prev,
						profitability: prev?.profitability ? undefined : {},
					}));
				}}
			/>

			{(remarkData?.profitability) ? (
				<div style={{ margin: '0 28px' }}>
					<Radio
						name="notBilled"
						label="Sales Invoice not billed for same service"
						checked={remarkData?.profitability?.notBilled}
						onChange={() => handleCategoryChange('notBilled')}
					/>

					<div className={styles.sub_category}>
						{(remarkData?.profitability?.notBilled)
							? (
								<RadioGroup
									options={notBilledOptions}
									onChange={(val) => setRemarkData((prev) => ({
										...prev,
										profitability: {
											notBilled: val,
										},
									}))}
									value={typeof (remarkData?.profitability?.notBilled) === 'string'
										? (remarkData?.profitability?.notBilled) : undefined}
								/>
							)
							: undefined}
					</div>

					<Radio
						name="billed"
						label="Sales Invoice billed for less amount for same service"
						checked={remarkData?.profitability?.billed}
						onChange={() => handleCategoryChange('billed')}
					/>

					<div className={styles.sub_category}>
						{(remarkData?.profitability?.billed)
							? (
								<RadioGroup
									options={billedOptions}
									onChange={(val) => setRemarkData((prev) => ({
										...prev,
										profitability: {
											billed: val,
										},
									}))}
									value={typeof (remarkData?.profitability?.billed) === 'string'
										? (remarkData?.profitability?.billed) : undefined}
								/>
							)
							: undefined}
					</div>

					<Radio
						name="draft"
						label="Sales invoice in draft state"
						checked={remarkData?.profitability?.draft}
						onChange={() => handleCategoryChange('draft')}
					/>

					<div className={styles.sub_category}>
						{(remarkData?.profitability?.draft)
							? (
								<RadioGroup
									options={draftOptions}
									onChange={(val) => setRemarkData((prev) => ({
										...prev,
										profitability: {
											draft: val,
										},
									}))}
									value={typeof (remarkData?.profitability?.draft) === 'string'
										? (remarkData?.profitability?.draft) : undefined}
								/>
							)
							: undefined}
					</div>

					<Radio
						name="draft"
						label="CN generated against sales invoice for same service"
						checked={remarkData?.profitability === 'CN generated against sales invoice for same service'}
						onChange={() => setRemarkData((prev) => ({
							...prev,
							profitability: 'CN generated against sales invoice for same service',
						}))}
					/>

					<Radio
						name="draft"
						label="Receivable outstanding for customer on same SID."
						checked={remarkData?.profitability === 'Receivable outstanding for customer on same SID.'}
						onChange={() => setRemarkData((prev) => ({
							...prev,
							profitability: 'Receivable outstanding for customer on same SID.',
						}))}
					/>

					<Radio
						name="draft"
						label="Over due payments for customer"
						checked={remarkData?.profitability === 'Over due payments for customer'}
						onChange={() => setRemarkData((prev) => ({
							...prev,
							profitability: 'Over due payments for customer',
						}))}
					/>

				</div>
			) : undefined}

			<Checkbox
				label="Document number mismatched"
				checked={remarkData?.mismatched}
				onChange={() => {
					setRemarkData((prev) => ({
						...prev,
						mismatched: prev?.mismatched ? undefined : true,
					}));
				}}
			/>

			<div className={styles.category}>
				{(remarkData?.mismatched)
					? (
						<RadioGroup
							options={mismatchedOptions}
							onChange={(val) => setRemarkData((prev) => ({
								...prev,
								mismatched: val,
							}))}
							value={typeof (remarkData?.mismatched) === 'string'
								? (remarkData?.mismatched) : undefined}
						/>
					)
					: undefined}
			</div>

			<Checkbox
				label="Miscellaneous"
				checked={remarkData?.miscellaneous}
				onChange={() => {
					setRemarkData((prev) => ({
						...prev,
						miscellaneous: prev?.miscellaneous ? undefined : true,
					}));
				}}
			/>

			<div className={styles.category}>
				{(remarkData?.miscellaneous)
					? (
						<RadioGroup
							options={miscellaneousOptions}
							onChange={(val) => setRemarkData((prev) => ({
								...prev,
								miscellaneous: val,
							}))}
							value={typeof (remarkData?.miscellaneous) === 'string'
								? (remarkData?.miscellaneous) : undefined}
						/>
					)
					: undefined}
			</div>

			<Checkbox
				label="Other"
				checked={remarkData?.other}
				onChange={() => {
					setRemarkData((prev) => ({
						...prev,
						other: prev?.other ? undefined : true,
					}));
				}}
			/>

			{remarkData?.other ? (
				<Textarea
					value={typeof (remarkData?.other) === 'string'
						? (remarkData?.other) : undefined}
					onChange={(e) => setRemarkData((prev) => ({
						...prev,
						other: e,
					}))}
					style={{ height: '100px', margin: '12px 0' }}
				/>
			) : undefined}

		</div>
	);
}

export default AdditionalRemarks;
