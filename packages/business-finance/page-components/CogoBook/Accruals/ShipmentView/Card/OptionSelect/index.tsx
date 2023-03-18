import styles from './styles.module.css';

function OptionSelect({ data, handleSelectChange }) {
	return (
		<div className={styles.space_between} onClick={() => { handleSelectChange(data?.value); }} role="presentation">
			<div className={styles.text}>{data?.label}</div>
		</div>
	);
}
export default OptionSelect;
