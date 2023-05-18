import { Breadcrumb } from '@cogoport/components';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import styles from './styles.module.css';

const onClickBackIcon = (push) => {
	push(
		'/learning/course',
		'/learning/course',
	);
};

const onClickCogoAcademy = (push) => {
	push(
		'/learning',
		'/learning',
	);
};

function Header() {
	const { push } = useRouter();

	return (
		<div className={styles.top_container}>
			<Breadcrumb>
				<Breadcrumb.Item label={(
					<div
						className={styles.link}
						role="presentation"
						onClick={() => onClickCogoAcademy(push)}
					>
						CogoAcademy
					</div>
				)}
				/>

				<Breadcrumb.Item label={(
					<div
						className={styles.link}
						role="presentation"
						onClick={() => onClickBackIcon(push)}
					>
						Course
					</div>
				)}
				/>

				<Breadcrumb.Item label="Course Creation" />
			</Breadcrumb>

			<div className={styles.header}>
				<IcMArrowBack
					className={styles.back_icon}
					width={20}
					height={20}
					onClick={() => onClickBackIcon(push)}
				/>

				<div role="presentation" className={styles.title}>Create your Own Course</div>
			</div>
		</div>
	);
}

export default Header;
