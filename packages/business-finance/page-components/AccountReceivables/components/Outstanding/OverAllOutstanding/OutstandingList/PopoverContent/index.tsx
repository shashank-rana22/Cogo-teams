import Organization from './Organization';
import styles from './styles.module.css';

interface Props {
	data: object,
	loading: boolean
}
function PopoverContent({ data = {}, loading }: Props) {
	return (
		<div className={styles.overall_container}>
			<Organization data={data} loading={loading} />
		</div>
	);
}

export default PopoverContent;
