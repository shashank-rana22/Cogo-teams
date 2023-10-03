import { Button, Legend } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

const getStatusMapping = ({ t }) => ({
	true  : { label: t('saasSubscription:status_active'), color: 'green', key: 'active' },
	false : { label: t('saasSubscription:status_inactive'), color: 'red', key: 'in_active' },
});

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
	renderStatus: (itemData, config) => {
		const STATUS_MAPPING = getStatusMapping({ t });
		return (
			<Legend
				hasBackground={false}
				direction="horizontal"
				items={[STATUS_MAPPING[itemData[config.key]]]}
			/>
		);
	},
});

export default getItemFunction;
