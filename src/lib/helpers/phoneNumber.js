export const getPhoneNumber = (data) => {
    if(data.phoneNumber){
        return `+${data.phoneNumber.countryCode}-${data.phoneNumber.nationalNumber}`;
    } else if (data.countryCode && data.phone) {
        return `+${data.countryCode}-${data.phone}`
    } else if (data.phone) {
        return `${data.phone}`;
    }
    return 'N/A';
}