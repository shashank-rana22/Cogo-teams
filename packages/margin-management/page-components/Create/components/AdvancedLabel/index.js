import { IcMArrowDoubleDown, IcMArrowDoubleUp } from '@cogoport/icons-react';

function AdvancedLabel({ showAdvancedForm = false }) {
	return (
		<div>
			{showAdvancedForm ? (
				<>
					<IcMArrowDoubleUp
						height={16}
						width={16}
						style={{ marginRight: '8px' }}
					/>
					Hide Advanced options
				</>
			) : (
				<>
					<IcMArrowDoubleDown
						height={16}
						width={16}
						style={{ marginRight: '8px' }}
					/>
					Show Advanced options
				</>
			)}
		</div>
	);
}

export default AdvancedLabel;
