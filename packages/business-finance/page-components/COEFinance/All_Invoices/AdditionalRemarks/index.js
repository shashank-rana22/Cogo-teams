import { Checkbox, Radio } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

function AdditionalRemarks() {
	const [remarkData, setRemarkData] = useState({
		mismatched: {
		},
		profitability : null,
		miscellaneous : null,
	});

	const filteredMismatched = Object.keys(remarkData?.mismatched);
	const isMismatchedEmpty = isEmpty(filteredMismatched);

	const handleRadioChange = (fieldName) => {
		setRemarkData((prev) => ({
			...prev,
			mismatched: {
				notBilled   : null,
				billed      : null,
				draftState  : null,
				[fieldName] : prev.mismatched[fieldName] === null ? '' : null,
			},
		}));
	};

	return (
		<div>
			<h1>AdditionalRemarks</h1>
			<Checkbox
				label="Document number mismatched"
				checked={!isMismatchedEmpty}
				onChange={() => {
					setRemarkData((prev) => ({
						...prev,
						mismatched: isMismatchedEmpty
							? { notBilled: null, billed: null, draftState: null }
							: {},
					}));
				}}
			/>

			{!isMismatchedEmpty ? (
				<div style={{ margin: '0 28px' }}>
					<Radio
						name="notBilled"
						label="Sales Invoice not billed for same service"
						checked={remarkData?.mismatched?.notBilled !== null}
						onChange={() => handleRadioChange('notBilled')}
					/>

					<Radio
						name="billed"
						label="Sales Invoice billed for less amount for same service"
						checked={remarkData?.mismatched?.billed !== null}
						onChange={() => handleRadioChange('billed')}
					/>

					<Radio
						name="draft"
						label="Sales invoice in draft state"
						checked={remarkData?.mismatched?.draftState !== null}
						onChange={() => handleRadioChange('draftState')}
					/>
				</div>
			) : null}

			<Checkbox label="Profitability" checked />
			<Checkbox label="Miscellaneous" checked />
		</div>
	);
}

export default AdditionalRemarks;
