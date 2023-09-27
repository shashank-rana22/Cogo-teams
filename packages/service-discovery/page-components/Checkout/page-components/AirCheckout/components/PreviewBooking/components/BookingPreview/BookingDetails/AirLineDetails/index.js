import styles from './styles.module.css';

function AirLineDetails({ airline = {} }) {
	const { short_name = '', logo_url = '' } = airline;

	return (
		<div className={styles.container}>
			{logo_url ? (
				<img
					src={logo_url}
					alt="shipping line"
					height={30}
					width={30}
					style={{ objectFit: 'cover' }}
				/>
			) : null}

			<div className={styles.name}>{short_name}</div>
		</div>
	);
}

export default AirLineDetails;
