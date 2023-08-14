export const getCommonMapping = ({
	payrunConfig,
	viewInvoiceConfig,
	listViewConfig,
	payrunCommonConfig,
	viewInvoiceCommonConfig,
	listInoiceCommonConfig,
}) => ({
	false: {
		getConfig : payrunConfig,
		...payrunCommonConfig,
		true      : {
			getConfig: viewInvoiceConfig,
			...viewInvoiceCommonConfig,
		},
	},
	true: {
		getConfig: listViewConfig,
		...listInoiceCommonConfig,
	},
});
