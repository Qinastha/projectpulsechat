module.exports = {
  preset: "ts-jest",
  moduleNameMapper: {
    "@components/(.*)$": "<rootDir>/src/components/$1",
    "@/(.*)$": "<rootDir>/src/$1",
    "^.+\\.(css|less|scss)$": "babel-jest",
    "^axios$": "<rootDir>/node_modules/axios/dist/node/axios.cjs",
    "^.+\\.(png|jpg|jpeg|gif|svg)$": "jest-transform-stub",
  },

  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  modulePaths: ["<rootDir>"],
  testEnvironment: "jest-environment-jsdom",
};
