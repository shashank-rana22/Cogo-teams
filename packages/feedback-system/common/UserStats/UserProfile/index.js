import { Placeholder, Loader } from '@cogoport/components';
import { upperCase } from '@cogoport/utils';

import useGetUserDetails from '../../../hooks/useGetUserDetails';

import styles from './styles.module.css';
import UserDetails from './UserDetails';

const getNameTag = (name) => {
	const newName = name.split(' ') || [];
	let tagString = '';
	tagString += newName[0][0];
	tagString += newName[newName.length - 1][0];

	return upperCase(tagString);
};

const renderImage = (loading, data) => {
	const { picture = '', name = '' } = data;

	if (loading) {
		return (
			<div style={{
				width          : '100%',
				height         : '100%',
				display        : 'flex',
				justifyContent : 'center',
				alignItems     : 'center',
			}}
			>
				<Loader />
			</div>
		);
	}

	if (picture) { return <img src={picture} alt="loading" className={styles.img} />; }

	return <div className={styles.tag}>{getNameTag(name) || 'AB'}</div>;
};

const renderKPI = (kpi) => (
	<div>
		<div className={styles.kpi_text}>Current KPI</div>
		<div className={styles.kpi_value}>{kpi || '---'}</div>
	</div>
);

const colorScheme = (rating) => {
	switch (rating) {
		case '1':
			return '#F3B4B4';
		case '2':
			return '#FBE39F';
		case '3':
			return '#B3D5FB';
		case '4':
			return '#6fa5ab';
		case '5':
			return '#ddebc0';
		default:
			return '#B3D5FB';
	}
};

function UserProfile({ userId = '' }) {
	const { userData = {}, loading = false } = useGetUserDetails({ userId });

	const bgColorKpi = colorScheme(`${userData.rating}`);

	const showLoading = () => (
		<div className={styles.loading_container}>
			<Placeholder
				style={{
					borderRadius : '10px',
					padding      : 'auto',
					marginRight  : '24px',
				}}
				width="88%"
				height="88px"
			/>
		</div>
	);

	return (
		<div className={styles.container}>
			<div className={styles.image_container}>
				{renderImage(loading, userData)}
			</div>

			<div className={styles.user_details}>
				<UserDetails userData={userData} loading={loading} />
			</div>

			<div className={styles.kpi} style={{ background: bgColorKpi }}>
				{ loading ? showLoading() : renderKPI(userData.rating)}

			</div>
		</div>
	);
}

export default UserProfile;
