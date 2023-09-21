import BasicInfo from './BasicInfo.js';
import Header from './Header';
import SheetDetailsTab from './SheetDetailsTabs';
import styles from './styles.module.css';

function SheetsDetail() {
	return (
		<div className={styles.container}>
			<Header />
			<BasicInfo />
			<SheetDetailsTab />
		</div>
	);
}

export default SheetsDetail;
