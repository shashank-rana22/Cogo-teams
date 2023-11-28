import { Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import styles from '../styles.module.css';

function ViewFiles({ urlList = [] }) {
	return (
		<div>
			{isEmpty(urlList) ? <>No Data Found</>
				: (
					<>
						{
							(urlList || []).map((url) => (
								<div key={url}>
									<Button
										className={styles.url_link}
										themeType="linkUi"
										onClick={() => {
											window.open(url);
										}}
									>
										{decodeURIComponent(url?.split('/')?.pop())}
									</Button>
								</div>
							))
						}
					</>

				)}
		</div>
	);
}

export default ViewFiles;
