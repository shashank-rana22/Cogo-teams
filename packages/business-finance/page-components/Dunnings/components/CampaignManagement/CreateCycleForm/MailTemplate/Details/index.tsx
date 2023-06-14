import styles from './styles.module.css';

interface Props {
	text?:string,
	isBody?:boolean,
}

function Details({
	text = '',
	isBody = false,
}:Props) {
	if (!isBody) {
		return <div className={styles.section}>{text}</div>;
	}

	return (
		<div className={styles.section}>
			<h5>Pre-rendered HTML</h5>
		</div>
	);
}

export default Details;
