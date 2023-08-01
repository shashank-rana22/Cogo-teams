import getCanCancelService from './getCanCancelService';
import getCanEditSupplier from './getCanEditSupplier';
import getEditServiceDetails from './getEditServiceDetails';
import getEnableConsolidation from './getEnableConsolidation';

export const ACTION_BUTTON = {
	supplier_reallocation:
	{
		label              : 'Edit Supplier',
		value              : 'supplier_reallocation',
		visibilityFunction : getCanEditSupplier,
	},
	edit_truck_number:
	{
		label              : 'Edit Truck Number',
		value              : 'edit_truck_number',
		visibilityFunction : getEditServiceDetails,
	},
	edit_eta_etd: {
		label              : 'Edit ETA/ETD',
		value              : 'edit_eta_etd',
		visibilityFunction : getEditServiceDetails,
	},
	edit_driver_details:
	{
		label              : 'Edit Driver Details',
		value              : 'edit_driver_details',
		visibilityFunction : getEditServiceDetails,
	},
	verify_truck: {
		label              : 'Verify Truck',
		value              : 'verify_truck',
		visibilityFunction : getEditServiceDetails,
	},
	verify_driver: {
		label              : 'Verify Driver',
		value              : 'verify_driver',
		visibilityFunction : getEditServiceDetails,
	},
	cancel: {
		label              : 'Cancel',
		value              : 'cancel',
		visibilityFunction : getCanCancelService,
	},
	enable_consolidation: {
		label              : 'Sales Invoice Consolidation',
		value              : 'enable_consolidation',
		visibilityFunction : getEnableConsolidation,
	},
};
