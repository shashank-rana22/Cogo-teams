import { Tabs, TabPanel, Input, ButtonIcon } from '@cogoport/components';
import { IcMAppSearch, IcMCross } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useContext } from 'react';

import PAYMENT_TYPE from '../../../../config/PAYMENT_TYPE';
import CostBookingDeskContext from '../../../../context/CostBookingDeskContext';

import styles from './styles.module.css';

function Header({
	searchValue = '',
	setSearchValue = () => {},
}) {
	const { paymentActiveTab = '', setPaymentActiveTab = () => {} } = useContext(CostBookingDeskContext);

	return (
		<div className={styles.tab_search_container}>
			<div className={styles.header_footer_part}>
				<Tabs
					themeType="tertiary"
					activeTab={paymentActiveTab}
					onChange={setPaymentActiveTab}
				>
					{PAYMENT_TYPE?.map((tab) => (
						<TabPanel
							title={tab?.title}
							key={tab?.name}
							name={tab?.name}
						/>
					))}
				</Tabs>
			</div>
			<div>
				<Input
					size="sm"
					prefix={<IcMAppSearch />}
					placeholder="Search by Shipment ID"
					onChange={setSearchValue}
					value={searchValue}
					suffix={(
						<ButtonIcon
							onClick={() => setSearchValue('')}
							size="sm"
							icon={<IcMCross />}
							disabled={isEmpty(searchValue)}
						/>
					)}
				/>
			</div>
		</div>
	);
}

export default Header;
