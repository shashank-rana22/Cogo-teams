import { Popover, Button } from '@cogoport/components';
import { IcMOverflowDot } from '@cogoport/icons-react';

import useGetIrnGeneration from '../../hooks/useGetIrnGeneration';

import styles from './styles.module.css';

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

	const content = () => (
		<div
			className={styles.styled_button}
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
