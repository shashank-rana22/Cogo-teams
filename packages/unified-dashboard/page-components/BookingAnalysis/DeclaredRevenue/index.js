import { useSelector } from '@cogoport/store';

import DesktopView from './DesktopView';
import MobileView from './MobileView';
import styles from './styles.module.css';

function DeclaredRevenue({
	data = [],
	months,
	currency,
	selectedFilterTab,
}) {
	const { general } = useSelector((state) => (state));

	// console.log(isMobile, 'isMobile');
	const isMobile = false;

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

	// return (
	// 	<div className={styles.container}>
	// 		{isMobile ? (
	// 			<MobileView
	// 				master={months}
	// 				keys={data}
	// 				selectedFilterTab={selectedFilterTab}
	// 				currency={currency}
	// 			/>
	// 		) : (
	// 			<DesktopView
	// 				master={months}
	// 				keys={data}
	// 				selectedFilterTab={selectedFilterTab}
	// 				currency={currency}
	// 			/>
	// 		)}
	// 	</div>
	// );
}

export default DeclaredRevenue;
