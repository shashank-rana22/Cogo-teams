import styles from './styles.module.css';

type POCObject = {
	salesAgent?: string,
	kamAgent?: string
};

interface POCDetails {
	pocDetails?: POCObject
}

interface POCInterface {
	data?: POCDetails
}

function Poc({ data }: POCInterface) {
	const { pocDetails } = data || {};

	return (
		<div className={styles.container}>
			<div className={styles.sub_container}>
				Sales Agent -
				<span style={{ fontWeight: 600 }}>{pocDetails?.salesAgent}</span>
			</div>

			<div className={styles.sub_container}>
				KAM Agent -
				<span style={{ fontWeight: 600 }}>{pocDetails?.kamAgent}</span>
			</div>
		</div>
	);
}
export default Poc;
