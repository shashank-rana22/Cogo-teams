import styles from './styles.module.css';

function TextToShow({ isOriginHaulageRates = false, isDestinationHaulageRates = false, isHaulageAdded = false }) {
	if (isOriginHaulageRates && isDestinationHaulageRates) {
		return (
			<>
				Rate shown
				{' '}
				<span className={styles.bold}>includes Haulage</span>
				{' '}
				between
				{' '}
				<span className={styles.bold}>ICD --&gt; Seaport at origin</span>
				{' '}
				&
				{' '}
				<span className={styles.bold}>Seaport --&gt; ICD at destination</span>
			</>
		);
	}

	if (isOriginHaulageRates) {
		return (
			<>
				Rate shown
				{' '}
				<span className={styles.bold}>includes Haulage</span>
				{' '}
				between
				{' '}
				<span className={styles.bold}>ICD --&gt; Seaport at origin</span>
			</>
		);
	}

	if (isDestinationHaulageRates) {
		return (
			<>
				Rate shown
				{' '}
				<span className={styles.bold}>includes Haulage</span>
				{' '}
				between
				{' '}
				<span className={styles.bold}>Seaport --&gt; ICD at destination</span>
			</>
		);
	}

	if (!isHaulageAdded) {
		return (
			<>
				Rate shown
				{' '}
				<span className={styles.bold}>includes only ocean freight</span>
				{' '}
				between seaports, does not include Haulage between Seaport and ICD
			</>
		);
	}

	return (
		<>
			Rate shown
			{' '}
			<span className={styles.bold}>includes only ocean freight</span>
			{' '}
			between seaports. Rate for Haulage between Seaport and ICD is
			unavailable
		</>
	);
}

function HaulageText({
	details = {},
	isOriginHaulageRates = false,
	isDestinationHaulageRates = false,
}) {
	const { origin_port = {}, destination_port = {}, services = [] } = details || {};

	const isIcdPortPresent = origin_port?.is_icd || destination_port?.is_icd;

	const isHaulageAdded = services.includes('haulage_freight');

	if (!isIcdPortPresent) {
		return null;
	}

	return (
		<div className={styles.haulage_text}>
			<TextToShow
				isOriginHaulageRates={isOriginHaulageRates}
				isDestinationHaulageRates={isDestinationHaulageRates}
				isHaulageAdded={isHaulageAdded}
			/>
		</div>
	);
}

export default HaulageText;
