import RowElement from './RowElement';
import styles from './styles.module.css';

function TableLayout() {
	return (
		<div className={styles.body}>
			<div className={styles.header}>
				<div>VARIABLES</div>
				<div>CURRENT_WEIGHTAGE</div>
				<div>EDIT_WEIGHTAGE</div>
			</div>

			{/* {[1,2,3,4,5].map((item) => ( */}
			<RowElement />
			{/* ))} */}
		</div>
	);
}

export default TableLayout;
