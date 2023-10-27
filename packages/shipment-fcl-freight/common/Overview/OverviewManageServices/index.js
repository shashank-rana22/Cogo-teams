import { Accordion } from '@cogoport/components';

import { AdditionalServiceList } from '../../AdditionalServices';
import Services from '../Services';

import styles from './styles.module.css';

function OverviewManageServices({
	isOpen = true,
	activeTab = '',
	source = '',
	isSeller = false,
	collectionPartyList = [],
}) {
	return (
		<Accordion title={<div className={styles.title}>Manage Services</div>} isOpen={isOpen}>
			{ activeTab !== 'purchase_live_invoice' ? <Services /> : null}

			<AdditionalServiceList
				source={source}
				isSeller={isSeller}
				collectionPartyList={collectionPartyList}
			/>
		</Accordion>
	);
}
export default OverviewManageServices;
