import { Pill, Toast, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMSettings, IcMCopy } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';

import KYC_MAPPING from '../../../../constant/kycMapping';

const itemFunction = ({ setEditModal = () => {}, t = () => {} }) => ({
	renderId: (item) => {
		const { organization = {} } = item || {};
		const { serial_id = '' } = organization || {};

		return (
			<>
				#
				<span style={{ textDecoration: 'underline' }}>{serial_id}</span>
			</>
		);
	},
	renderCompanyName: (item) => {
		const { partner_id = '', organization = {} } = item || {};
		const { business_name = '', status = '' } = organization || {};
		const account_type = partner_id
			? t('saasSubscription:channel_partner') : t('saasSubscription:importer_exporter');

		return (
			<div>
				<div>{business_name}</div>
				<Pill size="sm" className="account_type" color="#e6e6fa">{account_type}</Pill>
				<Pill size="sm">{status}</Pill>
			</div>
		);
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
		const { active_subscription } = item || {};
		const { plan } = active_subscription || {};
		const { product_family } = plan || {};

		return	(
			<span>{product_family?.product_family_name || '--'}</span>
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
		const { active_subscription = {}, active = {} } = item || {};
		const activeObj = isEmpty(active_subscription) ? active : active_subscription;
		const { start_date = '', end_date = '' } = activeObj || {};

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
	renderAccountType: (item) => {
		const { active } = item || {};
		const { product_family } = active || {};

		return startCase(product_family?.product_family_name);
	},
	renderPlanName: (item) => {
		const { active } = item || {};
		const { pricing } = active || {};

		return startCase(pricing?.name);
	},
	renderKyc: (item, config) => {
		const kycStatus = item[config?.key];

		return (
			<Pill color={KYC_MAPPING[kycStatus]}>
				{startCase(kycStatus)}
			</Pill>
		);
	},
	renderOrgId: (item, config) => {
		const { id } = item || {};

		const copyLinkHandler = () => {
			navigator.clipboard.writeText(id);
			Toast.success('Copied Customer Id');
		};

		return (
			<span className="flex_box">
				{item?.[config?.key]}

				<Tooltip content={id}>
					<div className="copy_icon" onClick={copyLinkHandler} role="presentation">
						<IcMCopy />
					</div>
				</Tooltip>
			</span>
		);
	},
});
export default itemFunction;
