import { Checkbox, Radio, RadioGroup, Textarea } from '@cogoport/components';

import { billedOptions, draftOptions, miscellaneousOptions, mismatchedOptions, notBilledOptions } from './options';
import styles from './styles.module.css';

function AdditionalRemarks({ remarkData = {}, setRemarkData = () => {} }) {
	const handleCategoryChange = (fieldName) => {
		setRemarkData((prev) => ({
			...prev,
			profitability: {
				[fieldName]: true,
			},
		}));
	};

	return (
		<div>
			<h3>Rejection Reason:</h3>
			<Checkbox
				label="Profitability"
				checked={remarkData?.profitability}
				onChange={() => setRemarkData((prev) => ({
					...prev,
					profitability: prev?.profitability ? undefined : {},
				}))}
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
				onChange={() => setRemarkData((prev) => ({
					...prev,
					mismatched: prev?.mismatched ? undefined : true,
				}))}
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
				onChange={() => setRemarkData((prev) => ({
					...prev,
					miscellaneous: prev?.miscellaneous ? undefined : true,
				}))}
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
				onChange={() => setRemarkData((prev) => ({
					...prev,
					other: prev?.other ? undefined : true,
				}))}
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
