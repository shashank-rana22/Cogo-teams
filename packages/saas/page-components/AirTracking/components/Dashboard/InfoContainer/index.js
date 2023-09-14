/* eslint-disable no-underscore-dangle */
import { Button, cl, Placeholder } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

import useGetNews from '../../../hooks/useGetNews';
import useRedirectFn from '../../../hooks/useRedirectFn';
import getLoadingArr from '../../../utils/getLoadingArr';

import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import formatDate from '@/ui/commons/utils/formatDate';

const LOADING_ARR = getLoadingArr(3);

const EXTRACT_URL_FROM_HTML_STRING = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/;

const URL_INDEX = 2;
const MIN_URL_LENGTH = 3;

const newsClickHandler = ({ content }) => {
	const matches = content.match(EXTRACT_URL_FROM_HTML_STRING);

	if (matches && matches.length >= MIN_URL_LENGTH) {
		const hrefUrl = matches[URL_INDEX];
		window.open(hrefUrl, '_blank');
	}
};

function InfoContainer() {
	const { t } = useTranslation(['common', 'airOceanTracking']);

	const { loading, data = [] } = useGetNews();

	const { redirectToNotifications } = useRedirectFn();

	const newData = loading ? LOADING_ARR : data;

	return (
		<div className={styles.container}>

			<div className={styles.card}>
				<h3 className={styles.title}>{t('airOceanTracking:important_news_text')}</h3>

				{newData.map((news, index) => (
					<div
						key={news?._id || news}
						className={cl`${styles.row}
					${index === (data.length - 1) ? styles.last_row : ''}`}
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
									type="button"
								>
									{t('airOceanTracking:click_here_href_text')}

								</Button>

							</>
						)}
					</div>
				))}
				<Button themeType="linkUi" onClick={redirectToNotifications} type="button">
					{t('airOceanTracking:show_more_button_label')}
				</Button>
			</div>
		</div>
	);
}

export default InfoContainer;
