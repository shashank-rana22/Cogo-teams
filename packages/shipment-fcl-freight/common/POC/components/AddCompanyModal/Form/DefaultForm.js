import { SelectController, useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useListOrganizationTradeParties from '../../../../../hooks/useListOrganizationTradeParties';
import getCompanyAddressOptions from '../../../helpers/getCompanyAddressOptions';
import getCompanyNameOptions from '../../../helpers/getCompanyNameOptions';
import getOrgTradePartyFilterType from '../../../helpers/getOrgTradePartyFilterType';

function DefaultForm({ companyType = '', tradePartyType = '' }) {
	const [options, setOptions] = useState({ company_options: [], address_options: [] });

	const { data:{ list = [] } = {}, loading, filters, setFilters } = useListOrganizationTradeParties({
		organization_id : 'e0c1ce39-299a-44c4-b5e8-03c25bde387e',
		defaultFilters  : {
			trade_party_type: getOrgTradePartyFilterType({ companyType, tradePartyType }),
		},
		defaultParams: {
			billing_addresses_data_required : true,
			other_addresses_data_required   : true,
		},
	});
	const { control, watch } = useForm();
	const formValues = watch();

	// useEffect(() => {
	// 	setFilters({
	// 		...filters,

	// 	});
	// }, [companyType, tradePartyType]);

	// useEffect(() => {
	// 	setOptions({
	// 		company_options : getCompanyNameOptions(list),
	// 		address_options : getCompanyAddressOptions(list),
	// 	});
	// }, [companyType, tradePartyType, filters, loading]);

	// useEffect(() => {
	// 	setOptions({
	// 		...options,
	// 		address_options: getCompanyAddressOptions(list),
	// 	});
	// }, [formValues?.trade_party_id]);

	// const company_options = getCompanyNameOptions(list);
	// const address_options = getCompanyAddressOptions(list);

	return (
		<div>
			<form>
				{!loading
					? (
						<>
							<div>
								<label>Select Company</label>
								<SelectController
									name="trade_party_id"
									control={control}
									options={options.company_options}
								/>
							</div>
							{!isEmpty(formValues?.trade_party_id) && (
								<div>
									<label>Select Company</label>
									<SelectController
										name="address"
										control={control}
										options={options.address_options[formValues.trade_party_id]}
									/>
								</div>
							)}
							{!isEmpty(formValues?.address) && (
								<div>
									<div>Pincode</div>
									<div>{formValues.address?.split('::')?.[1]}</div>
								</div>
							)}
						</>

					) : null}
			</form>
		</div>
	);
}

export default DefaultForm;
