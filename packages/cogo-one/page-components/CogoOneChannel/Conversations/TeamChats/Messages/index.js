/* eslint-disable custom-eslint/variables-name-check */
/* eslint-disable max-len */
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import React from 'react';

import ReceiveComponent from './ReceiveComponent';
import SentComponent from './SendComponent';
import styles from './styles.module.css';

const DUMMY = [
	{
		conversation_type : 'sent',
		message_type      : 'text',
		created_at        : Date.now(),
		response          : { message: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.' },
	},
	{
		conversation_type : 'received',
		message_type      : 'text',
		name              : 'sandeep Naga',
		created_at        : new Date(),
		response          : { message: 'hello Lachiram' },
	},
	{
		conversation_type : 'received',
		message_type      : 'text',
		name              : 'rahul',
		created_at        : new Date(),
		response          : { message: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.' },
	},
	{
		conversation_type : 'sent',
		message_type      : 'text',
		created_at        : new Date(),
		response          : { message: 'dont take anything serious in our life' },
	},
	{
		conversation_type : 'received',
		message_type      : 'text',
		name              : 'pallav',
		created_at        : new Date(),
		response          : { message: 'Hai guys' },
	},
	{
		conversation_type : 'sent',
		message_type      : 'text',
		created_at        : new Date(),
		response          : { message: 'life is short enjoy fast' },
	},
	{
		conversation_type : 'sent',
		message_type      : 'text',
		created_at        : new Date(),
		response          : { message: 'life is short enjoy fast' },
	},
];

const CONVERSATION_TYPE_MAPPING = {
	sent     : SentComponent,
	received : ReceiveComponent,
};

const loading = false;

function Messages() {
	if (loading) {
		return (
			<div className={styles.flex_div}>
				<Image
					src={GLOBAL_CONSTANTS.image_url.cogo_one_loader}
					type="video/gif"
					alt="loading"
					width={100}
					height={100}
				/>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			{(DUMMY || []).map((eachMessage) => {
				const Component = CONVERSATION_TYPE_MAPPING[eachMessage?.conversation_type];

				return (
					<Component
						key={eachMessage?.created_at}
                         // isSent={eachMessage?.}
						eachMessage={eachMessage}
					/>
				);
			})}
		</div>
	);
}

export default Messages;
