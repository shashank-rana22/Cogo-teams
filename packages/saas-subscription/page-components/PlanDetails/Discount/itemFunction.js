import { Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

const getItemFunction = ({ setDiscountModal, t }) => ({
	renderEdit: (itemData) => (
		<Button
			size="sm"
			themeType="link"
			onClick={() => setDiscountModal({ open: true, info: itemData })}
		>
			{t('saasSubscription:edit_btn')}
		</Button>
	),
	renderName: (itemData, config) => (
		<span>{startCase(itemData[config.key])}</span>
	),
});

export default getItemFunction;
