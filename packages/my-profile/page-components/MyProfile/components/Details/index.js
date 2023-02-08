import Partners from './Partners';
import PersonDetails from './PersonalDetails';
import Services from './Services';
import styles from './styles.module.css';
import TaggedAgent from './TaggedAgents';

function Details({
	detailsData,
	refetch = () => {},
	setShowMobileVerificationModal = () => {},
	showMobileVerificationModal,
}) {
	return (
		<div className={styles.card_container}>
			<div className={styles.card_details}>
				<PersonDetails
					detailsData={detailsData}
					refetch={refetch}
					showMobileVerificationModal={showMobileVerificationModal}
					setShowMobileVerificationModal={setShowMobileVerificationModal}
				/>
			</div>

			<div className={styles.card_details}>
				<Partners detailsData={detailsData} />
			</div>

			<div className={styles.card_details}>
				<Services detailsData={detailsData} />
			</div>

			<div className={styles.card_details}>
				<TaggedAgent detailsData={detailsData} />
			</div>
		</div>
	);
}

export default Details;
