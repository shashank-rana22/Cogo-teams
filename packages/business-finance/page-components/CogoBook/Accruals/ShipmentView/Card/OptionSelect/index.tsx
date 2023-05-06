import styles from './styles.module.css';

interface OptionSelectInterface {
	data?:{ value?:string, label?:string }
	handleSelectChange?:Function
}

function OptionSelect({ data, handleSelectChange }:OptionSelectInterface) {
	return (
		<div className={styles.space_between} onClick={() => { handleSelectChange(data?.value); }} role="presentation">
			<div className={styles.text}>{data?.label}</div>
		</div>
	);
}
export default OptionSelect;
