/* eslint-disable no-underscore-dangle */
import { Button, cl, Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useTranslation } from 'next-i18next';

import useGetNews from '../../../hooks/useGetNews';
import useRedirectFn from '../../../hooks/useRedirectFn';

import styles from './styles.module.css';

const LOADING_ROWS = 3;

const URL_INDEX = 2;
const MIN_URL_LENGTH = 3;

const newsClickHandler = ({ content = '' }) => {
	const matches = content?.match(GLOBAL_CONSTANTS.regex_patterns.extract_url_from_html_string);

	if (matches && matches.length >= MIN_URL_LENGTH) {
		const hrefUrl = matches[URL_INDEX];
		window.open(hrefUrl, '_blank');
	}
};

function InfoContainer() {
	const { t } = useTranslation(['common', 'airOceanTracking']);

	const { loading = false, data = [] } = useGetNews();

	const { redirectToNotifications = () => {} } = useRedirectFn();

	const newData = loading ? [...Array(LOADING_ROWS).keys()] : data;

	return (
		<div className={styles.container}>

			<div className={styles.card}>
				<h3 className={styles.title}>{t('airOceanTracking:important_news_text')}</h3>

				{newData?.map((news, index) => (
					<div
						key={news?._id || news}
						className={cl`${styles.row}
					${index === (data.length - GLOBAL_CONSTANTS.one) ? styles.last_row : ''}`}
					>
						{loading ? (
							<Placeholder height="25px" margin="0px 0px 5px 0px" />
						) : (
							<>
								<div className={styles.info_container}>
									<p className={styles.text}>
										{news?.title}
									</p>
									<p className={styles.date}>
										{formatDate({
											date       : news?._updated_on,
											dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
											timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
											formatType : 'dateTime',
										})}
									</p>
								</div>

								<Button
									themeType="linkUi"
									onClick={() => newsClickHandler({ content: news?.content })}
								>
									{t('airOceanTracking:click_here_href_text')}

								</Button>

							</>
						)}
					</div>
				))}
				<Button themeType="linkUi" onClick={redirectToNotifications}>
					{t('airOceanTracking:show_more_button_label')}
				</Button>
			</div>
		</div>
	);
}

export default InfoContainer;
