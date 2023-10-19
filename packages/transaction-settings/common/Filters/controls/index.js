import getAirDomesticFreightcontrols from './Air Domestic/getAirDomesticFreightcontrols';
import getAirDomesticSurchargescontrols from './Air Domestic/getAirDomesticSurchargescontrols';
import getAirDomesticTreminalcontrols from './Air Domestic/getAirDomesticTreminalcontrols ';
import getFclCfscontrols from './FclCfs/getFclCfscontrols';
import getFclCustomscontrols from './FclCustoms/getFclCustomscontrols';
import getFclFreightcontrols from './FclFreight/getFclFreightcontrol';
import getLclCustomscontrols from './LclCustoms/getLclCustomscontrols';
import getLclFreightcontrols from './LclFreight/getLclFreightcontrols';
import getLclFreightlocalcontrols from './LclFreight/getLclFreightlocalcontrols';
import getLclFreightstoragecontrols from './LclFreight/getLclFreightstoragecontrols';
import getLclFreightsurchargescontrols from './LclFreight/getLclFreightsurchargescontrols';

const getFiltercontrols = (activeTab) => {
	const filter_mapping = {
		lcl_freight_rates          : getLclFreightcontrols(),
		lcl_local_charges          : getLclFreightlocalcontrols(),
		lcl_storage_rates          : getLclFreightstoragecontrols(),
		lcl_surcharges             : getLclFreightsurchargescontrols(),
		fcl_customs                : getFclCustomscontrols(),
		lcl_customs                : getLclCustomscontrols(),
		fcl_freight                : getFclFreightcontrols(),
		fcl_cfs                    : getFclCfscontrols(),
		domestic_air_freight_rates : getAirDomesticFreightcontrols(),
		domestic_surcharges        : getAirDomesticSurchargescontrols(),
		domestic_terminal_charges  : getAirDomesticTreminalcontrols(),
	};

	return filter_mapping[activeTab];
};

export default getFiltercontrols;
