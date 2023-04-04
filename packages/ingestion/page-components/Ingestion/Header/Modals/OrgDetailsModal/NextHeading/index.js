import styles from './styles.module.css';

function LeadDiv() {
	return (
		<div className={styles.heading}>
			Please provide more details about Lead
		</div>
	);
}

function CpDiv() {
	return (
		<div className={styles.heading}>
			Please provide more details about Channel Partner
		</div>
	);
}

function IeDiv() {
	return (
		<div className={styles.heading}>
			Please provide more details about Importer Exporter
		</div>
	);
}

export {
	LeadDiv,
	CpDiv,
	IeDiv,
};
