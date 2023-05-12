import { startCase } from '@cogoport/utils';

const convertArrayToOptions = (arr) => arr?.map((i) => ({ label: startCase(i), value: i }));

export default convertArrayToOptions;
