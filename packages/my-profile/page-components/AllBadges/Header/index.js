import { IcMArrowLeft } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

function Header(props) {
	const router = useRouter();

	const { t } = useTranslation(['profile']);

	const { modalDetail, setModalDetail = () => {}, returnPath } = props;

	return (
		<div className={styles.greeting_container}>
			<div className={styles.main_heading} role="presentation" onClick={() => router.back()}>
				<div className={styles.icon_container}>
					<IcMArrowLeft width={24} height={24} />
				</div>

				<span className={styles.span}>
					{ returnPath === '/my-profile' ? t('profile:my_profile_path') : t('profile:dashboard_path')}
				</span>
			</div>

			{!isEmpty(modalDetail)
					&& (
						<div className={styles.main_heading} role="presentation" onClick={() => setModalDetail('')}>
							<div className={styles.icon_container}>
								<IcMArrowLeft width={24} height={24} />
							</div>

							<span className={styles.span}>{t('profile:all_badges')}</span>
						</div>
					)}
		</div>
	);
}

export default Header;
