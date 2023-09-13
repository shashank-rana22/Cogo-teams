import ApArSettlement from '../page-components/ApArSettlement';
import History from '../page-components/History';
import JournalVoucher from '../page-components/JournalVoucher';
import OnAccountCollection from '../page-components/OnAccountCollection';
import TdsSettlement from '../page-components/TdsSettlement';

const tabPanelMapping = (entityCode, entity) => (
	[
		{
			name      : 'ap-ar-settlement',
			title     : 'AR/AP Settlement',
			component : <ApArSettlement />,
		},
		{
			name      : 'tds-settlement',
			title     : 'TDS Settlement',
			component : <TdsSettlement />,
		},
		{
			name      : 'history',
			title     : 'History',
			component : <History />,
		},
		{
			name      : 'onAccountCollection',
			title     : 'On Account Collection',
			component : <OnAccountCollection entity={entity} />,
		},
		{
			name      : 'JournalVoucher',
			title     : 'Journal Voucher',
			component : <JournalVoucher entityCode={entityCode} />,
		},

	]);

export default tabPanelMapping;
