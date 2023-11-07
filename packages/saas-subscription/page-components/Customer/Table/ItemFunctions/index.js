import { Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMSettings } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

const itemFunction = ({ setEditModal = () => {}, t = () => {} }) => ({
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
		const { currency = 'INR', period_unit = 'month' } = plan_pricing || {};

		const currencySymbol = GLOBAL_CONSTANTS.currency_symbol[currency] || '';

		return	(
			<div>
				<div>{display_name}</div>

				<Pill size="sm" color="blue">
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
	renderValidity: (item) => {
		const { active_subscription = {} } = item || {};
		const { start_date = '', end_date = '' } = active_subscription || {};

		return (

			<span>
				{start_date ? formatDate({
					date       : start_date,
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yy'],
					formatType : 'date',
				}) : ' '}

				{end_date ? (
					` - 
					${formatDate({
						date       : end_date,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yy'],
						formatType : 'date',
					})}`

				) : ' -'}
			</span>

		);
	},
	// renderKycStatus : (item, config)=>{
	// 	return
	// }
});
export default itemFunction;
