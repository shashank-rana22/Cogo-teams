// import AwsUplaoder from '@cogo/smart-components/components/AwsUploader';
import { IcMAttach } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function Attachement({ onChange }) {
	return (
		<div className={styles.container}>
			{/* <AwsUplaoder
				showProgress={false}
				onChange={onChange}
				multiple={false}
				uploadType="aws"
				drag
				value={null}
				height={40}
				showUploadIcon={false}
				dragNDropText={(
					<AttachButton>
						<IcMAttach style={{ height: '24px', width: '24px' }} />
						<Text>Attach A File</Text>
					</AttachButton>
				)}
			/> */}
		</div>
	);
}

export default Attachement;
