const convertSeconds = (seconds) => {

    let convertedValue = new Date(seconds * 1000).toISOString();

    if (convertedValue.substr(11, 2) === "00") {
        return convertedValue.substr(14, 5)
    }

    return convertedValue.substr(11, 8)

}

export default convertSeconds;