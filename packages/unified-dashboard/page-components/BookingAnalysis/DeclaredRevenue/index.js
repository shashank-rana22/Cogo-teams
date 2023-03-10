import DesktopView from './DesktopView';
import MobileView from './MobileView';
import styles from './styles.module.css';

function DeclaredRevenue({
	data = [],
	months,
	currency,
	selectedFilterTab,
}) {
	return (
		<div>
			<div className={styles.desktop}>
				<DesktopView
					master={months}
					keys={data}
					selectedFilterTab={selectedFilterTab}
					currency={currency}
				/>
			</div>
			<div className={styles.mobile}>
				<MobileView
					master={months}
					keys={data}
					selectedFilterTab={selectedFilterTab}
					currency={currency}
				/>
			</div>
		</div>
	);
}

export default DeclaredRevenue;
