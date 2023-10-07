import { Checkbox, Radio, RadioGroup, Textarea } from '@cogoport/components';
import { useState } from 'react';

import { billedOptions, draftOptions, miscellaneousOptions, mismatchedOptions, notBilledOptions } from './options';
import styles from './styles.module.css';
import formatReason from './utilityFunctions';

const NOT_BILLED_LABEL = 'Charges not billed for same service in sales invoice';
const BILLED_LABEL = 'Charges billed with less amount for same service in sales invoice';
const DRAFT_LABEL = 'Sales invoice in draft state';

function AdditionalRemarks({ remarkData = {}, setRemarkData = () => {}, modalData = '' }) {
	const [active, setActive] = useState('');
	const { notBilled = '', billed = '', draft = '' } = remarkData?.profitability || {};
	const chosenProfitabilityReason = notBilled || billed || draft || remarkData?.profitability || '';
	const chosenMismatchedReason = remarkData?.mismatched || '';
	const chosenMiscReason = remarkData?.miscellaneous || '';

	const handleCategoryChange = (fieldName) => {
		setRemarkData((prev) => ({ ...prev, profitability: { [fieldName]: true } }));
	};

	return (
		<div>
			<div className={styles.heading}>
				{`Please select the reason to ${(modalData || '').toLowerCase()}:`}
			</div>
			<Checkbox
				label={`Profitability ${formatReason({ reason: chosenProfitabilityReason })}`}
				checked={remarkData?.profitability}
				onChange={() => {
					setRemarkData((prev) => ({ ...prev, profitability: prev?.profitability ? undefined : {} }));
					setActive('profitability');
				}}
			/>

			{(remarkData?.profitability && active === 'profitability') ? (
				<div style={{ margin: '0 28px' }}>
					<Radio
						name="notBilled"
						label={NOT_BILLED_LABEL}
						checked={remarkData?.profitability?.notBilled}
						onChange={() => handleCategoryChange('notBilled')}
					/>

					<div className={styles.sub_category}>
						{(remarkData?.profitability?.notBilled) ? (
							<RadioGroup
								options={notBilledOptions}
								onChange={(val) => {
									setRemarkData((prev) => ({
										...prev,
										profitability: {
											notBilled:
										`${NOT_BILLED_LABEL} - ${val}`,
										},
									}));
									setActive('');
								}}
								value={typeof (remarkData?.profitability?.notBilled) === 'string'
									? (remarkData?.profitability?.notBilled) : undefined}
							/>
						)
							: undefined}
					</div>

					<Radio
						name="billed"
						label={BILLED_LABEL}
						checked={remarkData?.profitability?.billed}
						onChange={() => handleCategoryChange('billed')}
					/>

					<div className={styles.sub_category}>
						{(remarkData?.profitability?.billed) ? (
							<RadioGroup
								options={billedOptions}
								onChange={(val) => {
									setRemarkData((prev) => ({
										...prev,
										profitability: {
											billed:
										`${BILLED_LABEL} - ${val}`,
										},
									}));
									setActive('');
								}}
								value={typeof (remarkData?.profitability?.billed) === 'string'
									? (remarkData?.profitability?.billed) : undefined}
							/>
						)
							: undefined}
					</div>

					<Radio
						name="draft"
						label={DRAFT_LABEL}
						checked={remarkData?.profitability?.draft}
						onChange={() => handleCategoryChange('draft')}
					/>

					<div className={styles.sub_category}>
						{(remarkData?.profitability?.draft) ?	(
							<RadioGroup
								options={draftOptions}
								onChange={(val) => {
									setRemarkData((prev) => ({
										...prev,
										profitability: {
											draft:
										`${DRAFT_LABEL} - ${val}`,
										},
									}));
									setActive('');
								}}
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
						onChange={() => {
							setRemarkData((prev) => ({
								...prev,
								profitability: 'CN generated against sales invoice for same service',
							}));
							setActive('');
						}}
					/>

					<Radio
						name="draft"
						label="Receivable outstanding for customer on same SID."
						checked={remarkData?.profitability === 'Receivable outstanding for customer on same SID.'}
						onChange={() => {
							setRemarkData((prev) => ({
								...prev,
								profitability: 'Receivable outstanding for customer on same SID.',
							}));
							setActive('');
						}}
					/>

					<Radio
						name="draft"
						label="Over due payments for customer"
						checked={remarkData?.profitability === 'Over due payments for customer'}
						onChange={() => {
							setRemarkData((prev) => ({ ...prev, profitability: 'Over due payments for customer' }));
							setActive('');
						}}
					/>

				</div>
			) : undefined}

			<Checkbox
				label={formatReason({
					reason         : chosenMismatchedReason,
					isMainCategory : true,
				}) || 'Document number mismatched'}
				checked={remarkData?.mismatched}
				onChange={() => {
					setRemarkData((prev) => ({ ...prev, mismatched: prev?.mismatched ? undefined : true }));
					setActive('mismatched');
				}}
			/>

			<div className={styles.category}>
				{(remarkData?.mismatched && active === 'mismatched') ? 	(
					<RadioGroup
						options={mismatchedOptions}
						onChange={(val) => {
							setRemarkData((prev) => ({
								...prev,
								mismatched: `Document number mismatched - ${val}`,
							}));
							setActive('');
						}}
						value={typeof (remarkData?.mismatched) === 'string'
							? (remarkData?.mismatched) : undefined}
					/>
				)
					: undefined}
			</div>

			<Checkbox
				label={`Miscellaneous ${formatReason({ reason: chosenMiscReason })}`}
				checked={remarkData?.miscellaneous}
				onChange={() => {
					setRemarkData((prev) => ({ ...prev, miscellaneous: prev?.miscellaneous ? undefined : true }));
					setActive('misc');
				}}
			/>

			<div className={styles.category}>
				{(remarkData?.miscellaneous && active === 'misc') ? 	(
					<RadioGroup
						options={miscellaneousOptions}
						onChange={(val) => {
							setRemarkData((prev) => ({
								...prev,
								miscellaneous: val,
							}));
							setActive('');
						}}
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
					setRemarkData((prev) => ({ ...prev, other: prev?.other ? undefined : true }));
					setActive('');
				}}
			/>

			{(remarkData?.other || typeof remarkData?.other === 'string') ? (
				<Textarea
					value={typeof (remarkData?.other) === 'string' ? (remarkData?.other) : undefined}
					onChange={(e) => setRemarkData((prev) => ({ ...prev, other: e }))}
					style={{ height: '100px', margin: '12px 0' }}
				/>
			) : undefined}

		</div>
	);
}

export default AdditionalRemarks;
