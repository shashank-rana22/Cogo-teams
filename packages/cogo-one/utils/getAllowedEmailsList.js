import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import { collection, query, limit, getDocs } from 'firebase/firestore';

import { FIRESTORE_PATH } from '../configurations/firebase-config';

import getCommonAgentType from './getCommonAgentType';

const FIREBASE_QUERY_LIMIT = 1;

async function getConstantsDoc({ firestore }) {
	const constantCollection = collection(firestore, FIRESTORE_PATH.cogoone_constants);

	const constantsQuery = query(constantCollection, limit(FIREBASE_QUERY_LIMIT));

	const cogoOneConstants = await getDocs(constantsQuery);

	return cogoOneConstants?.docs[GLOBAL_CONSTANTS.zeroth_index];
}

export const cogoportMails = async ({ firestore = {}, viewType = '' }) => {
	const constantsData = await getConstantsDoc({ firestore });

	const { internal_emails = {} } = constantsData?.data() || {};

	const allowedEmails = internal_emails?.[getCommonAgentType({ viewType })] || [];

	return allowedEmails?.filter((itm) => {
		if (typeof itm !== 'object') {
			return false;
		}
		return itm?.value;
	});
};

function getOrgPoc({
	itm = {},
	defaultOptions = {},
}) {
	let options = { ...defaultOptions };

	itm?.organization_pocs?.forEach(
		(poc) => {
			if (poc?.email) {
				options = {
					...options,
					[poc?.email]: {
						id        : poc?.id,
						label     : poc?.name || poc?.email,
						value     : poc?.email,
						user_type : 'pocs',
						data      : [
							...(options?.[poc?.email]?.data || []),
							{
								name                : itm?.name,
								branch              : itm?.branch,
								address             : itm?.address,
								is_sez              : itm?.is_sez,
								pincode             : itm?.pincode,
								verification_status : itm?.verification_status,
								id                  : itm?.id,
							},
						],
					},
				};
			}
		},
	);

	return options;
}

function getAllowedEmailsList({
	orgData = {},
	searchQuery = '',
	activeTab = 'users',
	selectedOptions = [],
	value = [],
	internalEmails = [],
}) {
	const { list: List = [], data: DataList = [] } = orgData || {};

	let options = {};
	let optionsToShow = [];

	const usersList = activeTab?.includes('lead') ? DataList : List;

	if (activeTab !== 'pocs') {
		usersList?.forEach((itm) => {
			if (itm?.email) {
				options = {
					...options,
					[itm?.email]: {
						id        : itm?.id,
						label     : itm?.name || itm?.email,
						value     : itm?.email,
						user_type : 'users',
					},
				};
			}
		});

		optionsToShow = Object.values(options);
	} else {
		usersList?.forEach((itm) => {
			if (!isEmpty(itm?.organization_pocs)) {
				options = getOrgPoc({ itm, defaultOptions: options });
			}
		});

		optionsToShow = Object.values(options)?.filter(
			(itm) => !value.includes(itm.value),
		) || [];
	}

	optionsToShow = [
		...(selectedOptions || []),
		...optionsToShow,
	];

	return [
		...(optionsToShow || []),
		...(activeTab !== 'pocs' ? internalEmails?.filter(
			(itm) => (itm.value.includes(searchQuery) || itm.label.includes(searchQuery)),
		) || [] : []),
	];
}

export default getAllowedEmailsList;
