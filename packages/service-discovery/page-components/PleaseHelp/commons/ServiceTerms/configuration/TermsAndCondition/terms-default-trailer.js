/* eslint-disable max-len */
import { getCountrySpecificData } from '@cogoport/globalization/utils/CountrySpecificDetail';

const getTrailerTerms = ({ country_id }) => [
	{
		message: 'Customer has to provide full set of Export licenses',
	},
	{
		message:
				'Documentation processing :- less than 5 containers per shipment, add USD 15 per container if exceed',
	},
	{
		message:
				'Transit and cargo insurance from origin port to destination delivery point will be under supplier or consignee account as per the incoterms',
	},
	{
		message: 'Rates are subject to any other surcharge at both ends',
	},
	{
		message: 'Rates are subject to the specifications mentioned',
	},
	{
		message:
				'Any change(s) in the specifications of the shipment(s) as mentioned aforesaid would be based on mutual written agreement between Cogopport and Customer. For Negotiability and Title of Goods, Carriers responsibility, Compensation and Liability, please refer to the Terms and Conditions mentioned at the back of the related Bill of Lading.',
	},
	{
		message:
				'Cogoport shall have no legal liability whatsoever for non-compliance of this Agreement on account of any Force Majeure event. Force Majeure clause will be applicable in case of events beyond Cogoport control such as but not limited to Acts of God, weather conditions, environmental or dangerous goods incidents, perils of the ocean, public enemies, public authorities acting with actual or apparent authority, application of security regulations imposed by a government or otherwise applicable to the shipment, acts or omissions of customs officials, authority of law, quarantine, riots, strikes, work stoppages or slowdowns, or other labour disputes or disturbances, civil commotions or hazards incident to a state of war, local or national disruptions in ground or ocean transportation networks or mechanical delay of vessel or other equipment failures or due to events beyond Cogoport’s control, disruption or failure of communication and information systems, disruption or failure of utilities, or any circumstances beyond COGOPORT’s control.',
	},
	{
		message:
				'In no event shall COGOPORT freight and other dues on our invoice be withheld due to reasons such as but not limited to any damage to cargo, short shipment, lost shipment, misrouted shipment, or transit delay and the customer has agreed to waive any and all rights, including any statutory or common law rights, to set off the amount of any claim against charges owed to COGOPORT . All such issues maybe amplified via standard claims procedure involving timely notification, joint survey and are subject to carrier rules and regulations and terms and conditions on the related Bill of Lading. The customer shall be responsible to ensure that all requirements regarding proper packing of the shipment/cargo is complied with to ensure safe transportation with ordinary care in handling. A copy of Claims procedure will be provided on request.',
	},
	{
		message:
				'All disputes arising under or relating to this quotation shall be governed by the Laws of India and shall be subject to the jurisdiction of Court within the limits of COGOPORT local office address as set forth above.',
	},
	{
		message: `Attached rates are subject to ${getCountrySpecificData({
			country_id,
			accessorType : 'registration_number',
			accessor     : 'label',
		})} and any other taxes at the origin as per Govt Norms`,
	},
	{
		message:
				"Cargo loading at shipper premises and unloading at consignee premises under customer's scope",
	},
	{
		message:
				'If no regular volume support against the commitment , filling issued would be invalid without special notice.',
	},
	{
		message:
				'Space guarantee in peak season will be based on the performance in slack season.',
	},
	{
		message: 'All the booking needs to be tendered 2 weeks in advance',
	},
	{
		message:
				"The international press releases about the 'spreading of the corona virus' issue makes it abundantly clear that the impact on business activities in China and thus on global supply chains is very serious. The current space restrictions and rate developments make it impossible for COGOPORT to enter into binding rate agreements and logistical commitments for the affected routes, regardless of the type of transport (land, air, sea, train). In this respect the price quotations submitted for affected routes are subject to the reservation that the transport can be carried out without restriction. COGOPORT is neither able to foresee nor influence the unprecedented and unique restrictions in the performance of its transport services. COGOPORT accepts no liability for possible consequences arising in connection with the international freight against the spread of the corona virus with regard to the provision of services owed by COGOPORT. If it should no longer be possible for COGOPORT to execute the contract, or only to do so under modified conditions, COGOPORT expressly reserves the right to make the necessary adjustments or to withdraw from the contract - even partially. Any liability on the part of COGOPORT for direct or indirect losses incurred by the contracting partner in connection with the situation described is excluded. The contractual partner shall indemnify COGOPORT in full and upon first request from COGOPORT  against all costs and damages of any kind (including those resulting from third-party claims) which are incurred by COGOPORT in connection with the effects of combating the spread of the corona virus.",
	},
];

export default getTrailerTerms;
