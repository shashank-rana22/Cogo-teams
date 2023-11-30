import styles from './styles.module.css';

function Header({ title = '', subTitle = '' }) {
	return (
		<>
			<h4>{title}</h4>
			<div className={styles.sub_title}>{subTitle}</div>
		</>
	);
}

export default Header;
