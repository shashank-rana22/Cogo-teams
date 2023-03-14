import Details from './Details';
import styles from './styles.module.css';

const BookingRequirements = ({
	showRequirements = false,
	setShowRequirements = () => {},
	mainServiceData = [],
	is_so1,
}) => (
	<StyledModal
		show={showRequirements}
		onClose={() => setShowRequirements(false)}
		width={1000}
	>
		<div className={styles.container}>
			<div className={styles.heading}>Booking Requirements</div>

			<Details mainServiceData={mainServiceData} is_so1={is_so1} />
		</div>
	</StyledModal>
);

export default BookingRequirements;
