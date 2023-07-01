import useGetAuthorizationChecked from '@cogoport/authentication/hooks/useGetAuthorizationChecked';

import styles from './styles.module.css';

function SessionCheck({ children, firestoreToken }) {
	const { sessionInitialized } = useGetAuthorizationChecked({ firestoreToken });
	if (!sessionInitialized) {
		return (
			<div className={styles.container}>
				<img
					alt="cogoport-loading"
					src="https://cdn.cogoport.io/cms-prod/cogo_public/vault/original/cogoport-loading.gif"
				/>
			</div>
		);
	}
	return children;
}

export default SessionCheck;
