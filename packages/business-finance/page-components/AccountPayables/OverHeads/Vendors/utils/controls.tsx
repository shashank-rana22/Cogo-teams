const Controls = {
    KYC_STATUS: {
        "value": "KYC_STATUS",
        "placeholder": "Select KYC Status",
        "options": [
            {
                label : 'ALL VENDORS',
                value : 'ALL_VENDORS',
            },
            {
                label : 'KYC VERIFIED',
                value : 'KYC_VERIFIED',
            },
            {
                label : 'KYC PENDING',
                value : 'KYC_PENDING',
            },
        ]
    },
    CATEGORY: {
        "value" : 'CATEGORY',
        "placeholder": "Select Category",
        "options": [
            {
                label : 'RENT',
                value : 'RENT',
            },
            {
                label : 'OFFICIAL MAINTENANCE',
                value : 'OFFICIAL_MAINTENANCE',
            },
            {
                label : 'BUSINESS EXPENSE',
                value : 'BUSINESS_EXPENSE',
            },
            {
                label : 'INTERNET/COMMUNICATION',
                value : 'INTERNET_COMMUNICATION',
            },
            {
                label : 'PROFESSIONAL SERVICES',
                value : 'PROFESSIONAL_SERVICES',
            },
            {
                label : 'MISCELLANEOUS',
                value : 'MISCELLANEOUS',
            }
        ]
    }
}

export default Controls;