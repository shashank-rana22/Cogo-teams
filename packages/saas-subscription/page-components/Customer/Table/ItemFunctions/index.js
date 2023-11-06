import { Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMSettings } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

const itemFunction = ({ setEditModal, t }) => ({
	renderId: (item) => {
		const { organization = {} } = item || {};
		const { serial_id = '' } = organization || {};
		return <span>{serial_id}</span>;
	},
	renderCompanyName: (item) => {
		const { organization = {} } = item || {};
		const { business_name = '' } = organization || {};
		return <span>{business_name}</span>;
	},
	renderPlan: (item) => {
		const { active_subscription = {} } = item || {};
		const { plan = {}, plan_pricing = {} } = active_subscription || {};

		const { display_name = '' } = plan || {};
		const { currency = 'USD', period_unit = 'month' } = plan_pricing || {};

		const currencySymbol = GLOBAL_CONSTANTS.currency_symbol[currency] || '';

		return	(
			<div>
				<div>{display_name}</div>

				<Pill size="sm" color="yellow">
					{currencySymbol}
					{currency}
				</Pill>

				<Pill size="sm" color="orange">
					{startCase(period_unit)}
					ly
				</Pill>
			</div>
		);
	},
	renderEndDate: (item) => {
		const { active_subscription = {} } = item || {};
		const { end_date = '' } = active_subscription || {};
		return (
			<span>
				{end_date ? formatDate({
					date       : end_date,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
					formatType : 'date',
				}) : '--'}
			</span>
		);
	},
	renderFamily: (item) => {
		const { partner_id = '' } = item || {};
		return	(
			<span>
				{partner_id
					? t('saasSubscription:channel_partner') : t('saasSubscription:importer_exporter')}
			</span>
		);
	},
	renderEdit: (item) => (
		<span>
			<IcMSettings
				width={16}
				height={16}
				style={{ cursor: 'pointer' }}
				onClick={() => setEditModal(() => ({ info: item, open: true }))}
			/>
		</span>
	),
});
export default itemFunction;
