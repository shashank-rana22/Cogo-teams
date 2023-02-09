import { upperCase } from '@cogoport/utils';

import useGetUserDetails from '../../hooks/useGetUserDetails';

import styles from './styles.module.css';
import UserDetails from './UserDetails';

const getNameTag = (name) => {
	const newName = name.split(' ') || [];
	let tagString = '';
	tagString += newName[0][0];
	tagString += newName[newName.length - 1][0];

	return upperCase(tagString);
};

function UserProfile({ userId = '' }) {
	const { userData = {}, loading } = useGetUserDetails({ userId });
	const { picture = '', name = '' } = userData;

	return (
		<div className={styles.container}>
			<div className={styles.image_container}>
				{ picture ? <img src={picture} alt="loading" className={styles.img} />
					: <div className={styles.tag}>{getNameTag(name)}</div> }
			</div>

			<div className={styles.user_details}>
				<UserDetails userData={userData} loading={loading} />
			</div>
		</div>
	);
}

export default UserProfile;
