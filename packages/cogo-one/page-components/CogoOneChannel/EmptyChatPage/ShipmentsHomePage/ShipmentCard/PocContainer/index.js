import { IcMArrowBack } from '@cogoport/icons-react';
import React from 'react';

import PocUser from './PocUser';
import styles from './styles.module.css';

const POCS = [{}, {}, {}, {}];

function PocContainer({
	setShowPocDetails = () => {},
	showPocDetails = {},
}) {
	console.log('showPocDetails:', showPocDetails);

	return (
		<div className={styles.container}>
			<div
				role="presentation"
				className={styles.header}
				onClick={() => setShowPocDetails({})}
			>
				<IcMArrowBack />
				Back
			</div>

			<div className={styles.title}>
				Initiate Conversation
			</div>

			<div>
				{POCS.map(
					(userDetails) => (
						<PocUser
							userDetails={userDetails}
							key={userDetails?.id}
						/>
					),
				)}

			</div>

		</div>
	);
}

export default PocContainer;
