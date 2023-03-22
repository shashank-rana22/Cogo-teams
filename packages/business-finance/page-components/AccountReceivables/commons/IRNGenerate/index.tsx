import { Popover, Button } from '@cogoport/components';
import { IcMOverflowDot } from '@cogoport/icons-react';

import useGetIrnGeneration from '../../hooks/useGetIrnGeneration';
// import CC from '../../../utils/condition-constants';

type Itemdata = {
	id?: string
};
interface IRNGeneration {
	itemData?: Itemdata
	refetch?: Function
}

function IRNGenerate({ itemData = {}, refetch }: IRNGeneration) {
	const { generateIrn, loading } = useGetIrnGeneration({
		id: itemData.id,
		refetch,
	});

	// const { isConditionMatches } = useGetPermission();

	// const isIRNAllowed = isConditionMatches(CC.SEE_IRN_GENERATION);

	const content = () => (
		<div
			style={{
				display       : 'flex',
				flexDirection : 'column',
				margin        : '8px',
				width         : 'maxContent',
			}}
		>
			<Button
				className="secondary sm"
				disabled={loading}
				onClick={() => generateIrn()}
			>
				Generate IRN
			</Button>
		</div>
	);

	return (
		<Popover
			placement="left"
			render={content()}
		>

			<IcMOverflowDot
				style={{ cursor: 'pointer' }}
				width="16px"
				height="16px"
			/>

		</Popover>
	);

	return null;
}

export default IRNGenerate;
