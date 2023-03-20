import LeftSection from './components/LeftSection';
// import RightSection from './components/RightSection';
import styles from './styles.module.css';

function Ongoing() {
	return (
		<div className={styles.main_container}>
			<div className={styles.left_container}>
				<LeftSection />
			</div>
			<div className={styles.right_container}>
				{/* <RightSection /> */}
			</div>
		</div>
	);
}

export default Ongoing;
