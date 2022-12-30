import Main from './Main';
import SideBar from './SideBar';
import styles from './styles.module.css';

function Body() {
	return (
		<div className={styles.body}>
			<SideBar />
			<div className={styles.big_line} />
			<Main />
		</div>
	);
}

export default Body;
