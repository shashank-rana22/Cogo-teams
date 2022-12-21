import styles from './styles.module.css'
import { Button } from '@cogoport/components';

const ConfirmPrefrences = ({
	setShow = () => {},
	handleSave = () => {},
	loading,
	// setShowBookingOption = () => {},
}) => {
	const handleClick = () => {
		handleSave();
		setShow(false);
	};
	return (
		<>
			<div className={styles.container}>
				<div className = {styles.text}>SAVE PREFERENCES</div>

				<div className = {styles.description}>
					Are you sure you want to save the preferences? You won’t be able to
					edit them later.
				</div>

				<div className={styles.buttonsContainer}>
					<div className={styles.secondaryButton}> <Button  onClick={() => setShow(false)}>Back</Button> </div>
					<div className={styles.primaryButton}><Button  onClick={handleClick} disabled={loading}> 
						{loading ? 'Saving' : 'SAVE'}
					</Button>
					</div>
				</div>
			</div>
		</>
	);
};
export default ConfirmPrefrences;