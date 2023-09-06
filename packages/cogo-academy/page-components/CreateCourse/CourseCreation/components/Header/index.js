import { Breadcrumb } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMArrowBack } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { useSelector } from '@cogoport/store';

import useListPlatformConfigConstants from '../../../../ControlCenter/Approvals/Hooks/useListPlatformConfig';

import styles from './styles.module.css';

const onClickCourse = (push) => {
	push(
		'/learning/course',
		'/learning/course',
	);
};

const onClickCogoAcademy = (push) => {
	push(
		'/learning?activeTab=course_module',
		'/learning?activeTab=course_module',
	);
};

function Header() {
	const { push } = useRouter();
	const profile = useSelector((state) => state.profile || {});

	const { user } = profile || {};
	const { email } = user || {};

	const { data:emailsData } = useListPlatformConfigConstants();
	const { list = [] } = emailsData || {};
	const { platform_config_constant_mappings = [] } = list[GLOBAL_CONSTANTS.zeroth_index] || {};
	const { value = [] } = platform_config_constant_mappings[GLOBAL_CONSTANTS.zeroth_index] || {};

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
						onClick={() => onClickCourse(push)}
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
					onClick={() => onClickCogoAcademy(push)}
				/>

				<div role="presentation" className={styles.title}>Create your Own Course</div>

				{!(value.includes(email)) ? (
					<div className={styles.publish_note}>
						<span style={{ color: '#FF0000', fontWeight: 'bold' }}> Note : </span>
						Once you publish the course, request will be sent to the
						{' '}
						<strong>COGO ACADEMY</strong>
						{' '}
						admin. The course will be published after the approval process is completed.
					</div>
				) : null}
			</div>
		</div>
	);
}

export default Header;
