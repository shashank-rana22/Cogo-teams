import InnerTabsData from './InnerTabsData';
import SelectFilters from './SelectFilter';
import styles from './styles.module.css';

const INNER_TABS = [
	{ name: 'INITIATED', title: 'To be Audited' },
	{ name: 'AUDITED', title: 'Payment Ready' },
	{ name: 'PAYMENT_INITIATED', title: 'Payment Initiated' },
	{ name: 'PAID', title: 'Paid' },
	{ name: 'UPLOAD_HISTORY', title: 'Upload History' },
	{ name: 'COMPLETED', title: 'Payrun History' },
];
function Header({
	activePayrunTab = '',
	setActivePayrunTab = () => {},
	payrunStats = {},
	isInvoiceView = false,
	setIsInvoiceView = () => {},
	overseasData = '',
	setOverseasData = () => {},
	globalFilters = {},
	setGlobalFilters = () => {},
	selectedPayrun = null,
	setSelectedPayrun = () => {},
	checkedRow = null,
	setCheckedRow = () => {},
	itemData = {},
	activeEntity = '',
	refetch = () => {},
	selectedIds = [],
	setSelectedIds = () => {},
}) {
	return (
		<div className={styles.container}>
			<div>
				<div className={styles.tab_container}>
					{INNER_TABS.map(({ name, title }) => (
						<InnerTabsData
							key={name}
							isActive={activePayrunTab === name}
							setActivePayrunTab={setActivePayrunTab}
							name={name}
							title={title}
							payrunStats={payrunStats}
						/>
					))}
				</div>
			</div>
			<div>
				<SelectFilters
					globalFilters={globalFilters}
					setGlobalFilters={setGlobalFilters}
					isInvoiceView={isInvoiceView}
					activePayrunTab={activePayrunTab}
					setIsInvoiceView={setIsInvoiceView}
					overseasData={overseasData}
					setOverseasData={setOverseasData}
					selectedPayrun={selectedPayrun}
					setSelectedPayrun={setSelectedPayrun}
					checkedRow={checkedRow}
					setCheckedRow={setCheckedRow}
					itemData={itemData}
					activeEntity={activeEntity}
					refetch={refetch}
					selectedIds={selectedIds}
					setSelectedIds={setSelectedIds}
				/>
			</div>

		</div>
	);
}

export default Header;
