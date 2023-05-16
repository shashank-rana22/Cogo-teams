import { Placeholder } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { useRouter } from 'next/router';

import styles from './styles.module.css';

function Header({ loading }) {
	const router = useRouter();
	const { profile } = useSelector((state) => state);
	const { partner } = profile;
	const { id } = partner;
	return (
		<div className={styles.header_container}>
			<div
				role="presentation"
				onClick={() => router.push(`/${id}/rfq-dashboard`)}
				className={styles.back_path_section}
			>
				<IcMArrowBack
					className={styles.back_icon}
					fill="#221F20"
				/>
				<div
					className={styles.heading}
				>
					Back to RFQ Dashboard
				</div>
			</div>

			{
				loading ? (
					<Placeholder
						width="200px"
						height="20px"
						className={styles.text_placeholder}
					/>
				) : (
					<div className={styles.requested_date_section}>
						Requested on : 20 Mar 2023
					</div>
				)
			}

		</div>
	);
}
export default Header;
