import getAirTerms from './configuration/TermsAndCondition/terms-default-air';
import getAirCustomsTerms from './configuration/TermsAndCondition/terms-default-air-customs';
import getFclTerms from './configuration/TermsAndCondition/terms-default-fcl';
import getFclCustomsTerms from './configuration/TermsAndCondition/terms-default-fcl-customs';
import getFclFreightLocalTerms from './configuration/TermsAndCondition/terms-default-fcl-locals';
import getFtlTerms from './configuration/TermsAndCondition/terms-default-ftl';
import getHaulageTerms from './configuration/TermsAndCondition/terms-default-haulage';
import getLclTerms from './configuration/TermsAndCondition/terms-default-lcl';
import getLclCustomsTerms from './configuration/TermsAndCondition/terms-default-lcl-customs';
import getLtlTerms from './configuration/TermsAndCondition/terms-default-ltl';
import getTrailerTerms from './configuration/TermsAndCondition/terms-default-trailer';

const mapping = {
	fcl_freight       : getFclTerms,
	air_freight       : getAirTerms,
	lcl_freight       : getLclTerms,
	ftl_freight       : getFtlTerms,
	ltl_freight       : getLtlTerms,
	trailer_freight   : getTrailerTerms,
	haulage_freight   : getHaulageTerms,
	fcl_freight_local : getFclFreightLocalTerms,
	fcl_customs       : getFclCustomsTerms,
	lcl_customs       : getLclCustomsTerms,
	air_customs       : getAirCustomsTerms,
};

const getDefaultTncConfig = (mode, country_id) => (mode in mapping ? mapping[mode]({ country_id }) : []);

export default getDefaultTncConfig;
