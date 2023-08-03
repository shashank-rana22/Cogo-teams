import { Placeholder, cl } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';

import styles from '../styles.module.css';

const NO_OF_PLACEHOLDER = 6;

function OrganizationList({
	handleScroll = () => {},
	loading = false,
	list = [],
	orgDetail = {},
	setOrgDetail = () => {},
	setShowUser = () => {},
}) {
	const { id: orgId = '' } = orgDetail;

	const handleSelectOrg = ({ id, business_name }) => {
		setOrgDetail({
			id,
			name: business_name,
		});
		setShowUser(true);
	};

	return (
		<div className={styles.container} onScroll={handleScroll}>
			{(list || []).map((item) => {
				const { business_name = '', id = '' } = item || {};

				return (
					<div
						role="presentation"
						key={id}
						className={cl`${styles.content} ${orgId === id ? styles.active_org : ''}`}
						onClick={() => handleSelectOrg({ id, business_name })}
					>
						<div className={styles.name}>{business_name}</div>
						<IcMArrowNext className={styles.arrow_icon} />
					</div>
				);
			})}

			{loading && (
				[...Array(NO_OF_PLACEHOLDER).keys()].map((key) => (
					<Placeholder width="100%" height="40px" key={key} margin="6px 0" className={styles.skeleton} />
				))
			)}
		</div>
	);
}

export default OrganizationList;
