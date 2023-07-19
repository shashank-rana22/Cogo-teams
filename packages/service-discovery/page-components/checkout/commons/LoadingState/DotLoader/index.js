import styles from './styles.module.css';

function DotLoader({ dotsLegth = 6 }) {
	return (
		<div className={styles.wave}>
			{[...Array(dotsLegth).keys()].map((key) => (
				<span key={key} className={styles.dot} />
			))}
		</div>
	);
}

export default DotLoader;
