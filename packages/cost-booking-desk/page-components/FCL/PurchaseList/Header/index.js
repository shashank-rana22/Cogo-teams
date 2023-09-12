import { Tabs, TabPanel, Input, ButtonIcon, Select } from '@cogoport/components';
import { IcMAppSearch, IcMCross } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useContext } from 'react';

import PAYMENT_TYPE from '../../../../config/PAYMENT_TYPE';
import CostBookingDeskContext from '../../../../context/CostBookingDeskContext';

import styles from './styles.module.css';

const ADVANCE_DOCUMENT_DEPOSIT_OPTIONS = [
	{ label: 'Requested', value: 'REQUESTED' },
	{ label: 'Approved', value: 'APPROVED' },
	{ label: 'Rejected', value: 'REJECTED' },
];

const ADVANCE_DOCUMENT_REFUND_OPTIONS = [
	{ label: 'Pending', value: 'false' },
	{ label: 'Refunded', value: 'true' },

];

function Header({
	searchValue = '',
	setSearchValue = () => {},
	modalData = {},
	setModalData = () => {},
}) {
	const { paymentActiveTab = '', setPaymentActiveTab = () => {} } = useContext(CostBookingDeskContext);

	const statusOptions = paymentActiveTab === 'payment_request' ? ADVANCE_DOCUMENT_DEPOSIT_OPTIONS
		: ADVANCE_DOCUMENT_REFUND_OPTIONS;

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
			<div className={styles.filters}>
				<div className={styles.status}>
					<Select
						value={modalData?.statusFilter}
						options={statusOptions}
						placeholder="Filter by Status"
						onChange={(e) => setModalData((prev) => ({ ...prev, statusFilter: e }))}
						isClearable
						size="sm"
						name="status"
					/>
				</div>

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
