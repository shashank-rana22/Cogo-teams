const useDefaultValues = (initialValues) => {
	const emptyValues = {
		consigner              : '',
		consignee              : '',
		notify_address         : '',
		goods_delivery_contact : '',
		place_of_acceptance    : '',
		port_of_loading        : '',
		port_of_discharge      : '',
		place_of_delivery      : '',
		vessel_number          : '',
		containers             : [
			{
				container_number    : '',
				marks_and_number    : '',
				package_description : '',
				gross_weight        : '',
				measurement         : '',
			},
		],
		generic_statement              : '',
		freight_amount                 : '',
		freight_payable_at             : '',
		number_of_original_MTDs        : '',
		place_and_date_of_issue        : '',
		other_particulars              : '',
		authorized_signatory_text      : '',
		authorized_signatory_image_url : '',
	};

	const customDefaultValues = {
		...emptyValues,
		...initialValues,
	};

	if (customDefaultValues?.containers?.length > 1) {
		const newContainers = [];
		customDefaultValues?.containers?.forEach((element, i) => {
			if (i > 0) {
				newContainers.push(element);
			}
		});
		customDefaultValues.containers = newContainers;
	} else {
		customDefaultValues.containers = emptyValues.containers;
	}

	return { customDefaultValues };
};
export default useDefaultValues;
