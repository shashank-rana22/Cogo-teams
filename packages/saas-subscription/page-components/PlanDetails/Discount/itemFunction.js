import { Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

const getItemFunction = ({ setDiscountModal }) => ({
	renderEdit: (itemData) => (
		<Button
			size="sm"
			themeType="link"
			onClick={() => setDiscountModal({ open: true, info: itemData })}
		>
			Edit
		</Button>
	),
	renderName: (itemData, config) => (
		<span>{startCase(itemData[config.key])}</span>
	),
});

export default getItemFunction;
