import { isEmpty } from '@cogoport/utils';

export const isFilterApplied = (filters) => {
	const {
		Entity = '', Service = '', creationDate = '',
		exclude = [], operationalClosedDate = '', tradeType = '', walletUsed = '',
	} = filters || {};
	return isEmpty(Entity) && isEmpty(Service) && isEmpty(creationDate)
    && isEmpty(exclude) && isEmpty(operationalClosedDate) && isEmpty(tradeType) && isEmpty(walletUsed);
};
