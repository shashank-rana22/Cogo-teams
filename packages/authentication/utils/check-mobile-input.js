import { isEmpty } from '@cogoport/utils';

export const checkMobileInput = ({ mobNumberObj = {} }) => (
	!isEmpty(mobNumberObj?.number) && !isEmpty(mobNumberObj?.country_code)
);
