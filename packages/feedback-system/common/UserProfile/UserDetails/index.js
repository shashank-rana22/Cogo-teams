import { Placeholder } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function UserDetails({ userData = {}, loading = false }) {
	const { name, email, mobile_number, department, manager } = userData || {};

	const showLoading = () => (
		<div style={{ margin: '16px' }}>
			<Placeholder margin="0px 0px 16px" width="70%" height="30px" />
		</div>
	);

	const showLoading1 = () => (
		<div style={{ margin: '16px' }}>
			<Placeholder margin="0px 0px 16px" width="60%" height="20px" />
			<Placeholder margin="0px 0px 16px" width="50%" height="20px" />
			<Placeholder margin="0px 0px 16px" width="60%" height="20px" />
			<Placeholder margin="0px 0px 16px" width="50%" height="20px" />
		</div>
	);

	return (
		<div className={styles.container}>
			<p className={styles.name}>
				{loading ? showLoading() : startCase(name)}
			</p>

			<div className={styles.details_container}>
				{loading && showLoading1()}

				{!loading && (
					<>
						<div className={styles.text_container}>
							<p className={styles.details}>E-mail</p>

							<p className={styles.data}>{email}</p>
						</div>
						<div className={styles.text_container}>
							<p className={styles.details}>Mo. No.</p>

							<p className={styles.data}>{mobile_number}</p>
						</div>
						<div className={styles.text_container}>
							<p className={styles.details}>Department</p>

							<p className={styles.data}>{startCase(department)}</p>
						</div>

						<div className={styles.text_container}>
							<p className={styles.details}>Manager</p>
							<p className={styles.data}>{startCase(manager?.name)}</p>
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default UserDetails;
