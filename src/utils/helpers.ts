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

    if(isNaN(minGain)) minGain = 0;
    if(isNaN(maxGain)) maxGain = 0;

    return { minGain, maxGain };
}
