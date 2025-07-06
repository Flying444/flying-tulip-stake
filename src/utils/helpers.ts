export const calcToUsd = (valueAsset: number, valueUsd: number) => {
    return valueAsset * valueUsd;
}


export const calcProjection = (
    amount: number,
    aprMin: number,
    aprMax: number,
    periodInYears: number = 1
) => {

    const aprMinDecimal = aprMin / 100;
    const aprMaxDecimal = aprMax / 100;

    let minGain = amount * aprMinDecimal * periodInYears;
    let maxGain = amount * aprMaxDecimal * periodInYears;

    if (isNaN(minGain)) minGain = 0;
    if (isNaN(maxGain)) maxGain = 0;

    return { minGain, maxGain };
}

export const foundsAdd = (asset: string): number => {
    switch(asset.toUpperCase()){
        case 'ETH':
            return genRandomNumber(5, 15)
        case 'BNB':
            return genRandomNumber(20, 60)
        default: 
            return genRandomNumber(500, 2000);
    }
}

const genRandomNumber = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const genRandomUser = () => {
    return genRandomNumber(2, 3);
}