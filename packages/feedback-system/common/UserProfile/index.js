import useGetUserDetails from '../../hooks/useGetUserDetails';

import styles from './styles.module.css';
import UserDetails from './UserDetails';

function UserProfile({ userId = '' }) {
	const { userData = {}, loading } = useGetUserDetails({ userId });

	const picture =	'https://cogoport-production.sgp1.digitaloceanspaces.com/6ffab48edc909122ff786b97204f1e30/DSC_0032.jpg';

	return (
		<div className={styles.container}>
			<div className={styles.image_container}>
				<img src={picture} alt="loading" className={styles.img} />
			</div>

			<div className={styles.user_details}>
				<UserDetails userData={userData} loading={loading} />
			</div>
		</div>
	);
}

export default UserProfile;
