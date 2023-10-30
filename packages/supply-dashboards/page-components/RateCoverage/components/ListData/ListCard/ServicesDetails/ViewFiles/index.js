import { IcMAttach } from '@cogoport/icons-react';

import styles from '../styles.module.css';

function ViewFiles({ urlList = [] }) {
	return (
		<div>
			{urlList?.length === 0 ? <>No Data Found</>
				: (
					<>
						{urlList.map((url) => (
							<div className={styles.styled_link} key={url} target="_blank" href={url}>
								<IcMAttach />
								{url.split('/').pop()}
							</div>
						))}
					</>
				)}
		</div>
	);
}

export default ViewFiles;
