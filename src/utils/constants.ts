export const networks = {
  mainnet: {
    id: 1,
    contractAddres: "0x8ecEbc2BF559D96c663E6cCD80e2C78431E0d9E9",
    provider: "",
  },
  bnb: {
    id: 56,
    contract: "0x1ab93AB4AdB4D6a915fccE56770d63AdFB91880f",
    provider: "",
  },
  sonic: {
    id: 146,
    contract: "",
    provider: "",
  },
};

export const testnet = {
  sepolia: {
    id: 11155111,
    contractAddres: "0x8ecEbc2BF559D96c663E6cCD80e2C78431E0d9E9",
    provider: "",
  },
  bnb: {
    id: 204,
    contract: "0x1ab93AB4AdB4D6a915fccE56770d63AdFB91880f",
    provider: "",
  },
  sonic: {
    id: 57054,
    contract: "",
    provider: "",
  },
};

export const minMax = {
        eth: {
            min: '0.1',
            max: '32'
        },
        bnb: {
            min: '1',
            max: '10000',
        },
        s: {
            min: '300',
            max: '500000'
        }

    }
