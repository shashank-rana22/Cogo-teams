import Organization from './Organization';
import styles from './styles.module.css';

function PopoverContent({ data = {}, loading }) {
	return (
		<div className={styles.overall_container}>
			<Organization data={data} loading={loading} />
		</div>
	);
}

export default PopoverContent;
