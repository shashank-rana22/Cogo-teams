import History from '../page-components/History';
import JournalVoucher from '../page-components/JournalVoucher';
import OnAccountCollection from '../page-components/OnAccountCollection';
import TdsSettlement from '../page-components/TdsSettlement';

const tabPanelMapping = (entityCode) => (
	[
		{
			name      : 'ap-ar-settlement',
			title     : 'AR/AP Settlement',
			component : <>--</>,
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
			component : <OnAccountCollection />,
		},
		{
			name      : 'JournalVoucher',
			title     : 'Journal Voucher',
			component : <JournalVoucher entityCode={entityCode} />,
		},

	]);

export default tabPanelMapping;
