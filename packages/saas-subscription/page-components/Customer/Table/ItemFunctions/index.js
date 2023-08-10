import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMSettings } from '@cogoport/icons-react';

const itemFunction = ({ setEditModal }) => ({
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
		const { plan = {} } = active_subscription || {};
		const { display_name = '' } = plan || {};
		return <span>{display_name}</span>;
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
		return	<span>{partner_id ? 'Channel Partner' : 'Importer Exporter'}</span>;
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
