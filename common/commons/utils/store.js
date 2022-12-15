import { createWithStore } from '@cogoport/store';

import { profileStore } from './stores';

export default createWithStore(
	{ profile: profileStore },
	{ storeKey: process.env.NEXT_PUBLIC_STORE_KEY },
);
