import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';

import styles from './styles.module.css';

function BackButton({ title, toPush }) {
	const { push } = useRouter();
	const onClickHandle = () => {
		push(`/schedules/${toPush}/`);
	};

	return (
		<div
			role="presentation"
			className={styles.container}
			onClick={() => {
				onClickHandle();
			}}
		>
			<div className={styles.arrow}>
				<IcMArrowBack
					fill="#221f20"
					style={{ width: '1.3em', height: '1.3em' }}
				/>
			</div>
			{title}
		</div>
	);
}

export default BackButton;
