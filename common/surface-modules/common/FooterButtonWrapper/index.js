import styles from './styles.module.css';

function FooterButtonWrapper(props) {
	const { children } = props;
	return (
		<div className={styles.button_wrapper}>
			{children}
		</div>
	);
}

export default FooterButtonWrapper;
