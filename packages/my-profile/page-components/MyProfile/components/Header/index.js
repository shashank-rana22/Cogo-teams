import Greetings from '../greetings';

import styles from './styles.module.css';

function Header({
	detailsData,
	setRefetch = () => {},
	partner_user_id = '',
}) {
	return (
		<>
			<div className={styles.main_heading}>My Profile</div>

			<Greetings
				detailsData={detailsData}
				setRefetch={setRefetch}
				partner_user_id={partner_user_id}
			/>
		</>
	);
}
export default Header;
