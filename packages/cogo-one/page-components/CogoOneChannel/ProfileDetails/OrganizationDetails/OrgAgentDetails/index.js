import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function OrgAgentDetails({ agent, orgLoading }) {
	const { email, mobile_country_code, mobile_number, name } = agent || {};
	return (
		<div className={styles.container}>
			{orgLoading ? (
				<div>
					<Placeholder height="20px" width="270px" margin="0px 0px 10px 0px" />
					<Placeholder height="20px" width="270px" margin="0px 0px 10px 0px" />
					<Placeholder height="20px" width="270px" margin="0px 0px 10px 0px" />
				</div>
			) : (
				<>
					<div className={styles.content}>
						<div className={styles.agent_type}>Name : </div>
						<div className={styles.name}>{name}</div>
					</div>
					<div className={styles.content}>
						<div className={styles.type}>Email : </div>
						<div className={styles.name}>{email}</div>
					</div>
					<div className={styles.content}>
						<div className={styles.type}>Mobile No : </div>
						<div className={styles.name}>
							{mobile_country_code}
							{' '}
							{' '}
							{mobile_number}
						</div>
					</div>
				</>
			)}
		</div>
	);
}
export default OrgAgentDetails;
