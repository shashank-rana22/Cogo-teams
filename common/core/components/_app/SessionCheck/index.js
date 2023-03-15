import useGetAuthorizationChecked from '@cogoport/authentication/hooks/useGetAuthorizationChecked';

import styles from './styles.module.css';

function SessionCheck({ children }) {
	const { sessionInitialized } = useGetAuthorizationChecked();
	if (!sessionInitialized) {
		return (
			<div className={styles.container}>
				<img
					alt="cogoport-loading"
					src="https://media.tenor.com/rtY9m7EokSYAAAAC/cat-loading.gif"
				/>
			</div>
		);
	}
	return children;
}

export default SessionCheck;
