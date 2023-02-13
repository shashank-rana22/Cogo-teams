import Partners from './Partners';
// import PersonDetails from './PersonalDetails';
import Services from './Services';
import styles from './styles.module.css';
import TaggedAgent from './TaggedAgents';

function Details({
	detailsData,
	// refetch = () => {},
	// setShowMobileVerificationModal = () => {},
	// showMobileVerificationModal,
}) {
	return (

		<div className={styles.container}>
			<div className={styles.card_details}>
				<Partners detailsData={detailsData} />
			</div>

			<div className={styles.detail_container}>

				<div className={styles.card_details}>
					<Services detailsData={detailsData} />
				</div>

				<div className={styles.card_details}>
					<TaggedAgent detailsData={detailsData} />
				</div>

			</div>
		</div>

	);
}

export default Details;
