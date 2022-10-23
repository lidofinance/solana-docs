---
sidebar_position: 3
---

# Error codes

---

All known errors we wrap adding some additional fields to make it easier controlling exceptions.
Additional fields to *`Error`* object:
- *`code: number`* - error code
- *`codeDesc: string`* - additional error code definition

This table lists the error code information returned by the SolidoSDK when it is called.

| Error code | Error definition           | Description                                                                          |
|:-----------|:---------------------------|:-------------------------------------------------------------------------------------|
| 100        | CANNOT_CONFIRM_TRANSACTION | Got error during transaction confirmation                                            |
| 200        | NO_VALIDATORS              | Couldn't fetch validators list                                                       |
| 300        | UNSUPPORTED_CLUSTER        | SolidoSDK doesn't support devnet, specify mainnet-beta or testnet                    |
| 301        | UNSTAKE_UNAVAILABLE        | Unstake is not available right now, for more information [contact](https://t.me/lidofinance) Lido developers |
| 302        | NO_PUBLIC_KEY              | Public key is null in wallet                                                         |
| 303        | NO_ACCOUNT_INFO            | Couldn't fetch account info                                                          |
| 400        | EXCEED_MAX                 | Amount must not exceed MAX(..) in stake/unstake transaction                          |




const readline = require('readline').createInterface(process.stdin, process.stdout);

let n;
let m;
let field = [];
// components[parentId][0] - down left corner
// components[parentId][1] - up right corner
let components = [];
let neighboursArray = [
[-1, -1], [-1, 0], [-1, 1],
[0, -1], [0, 1],
[1, -1], [1, 0], [1, 1],
]

const isOne = (field, i, j) => {
try {
return field[i][j].value === 1;
} catch (e) {
return false;
}
};

const getNeighbours = (field, i, j) =>
neighboursArray.filter((coords) => isOne(field, coords[0] + i, coords[1] + j));

const updateBordersInComponent = (i, j, parentId) => {
// for left down border
if (i > components[parentId][0].i) {
components[parentId][0].i = i;
}
if (j < components[parentId][0].j) {
components[parentId][0].j = j;
}

// for right top border
if (i < components[parentId][1].i) {
components[parentId][1].i = i;
}
if (j > components[parentId][1].j) {
components[parentId][1].j = j;
}
};

const dfs = (field, i, j, parentId) => {
field[i][j].parent = parentId;
components[parentId].push({ i, j });
updateBordersInComponent(i, j, parentId);
getNeighbours(field, i, j).forEach((coords) => {
const elem = field[i + coords[0]][j + coords[1]];
if (elem.parent === -1) {
dfs(field, i + coords[0], j + coords[1], parentId);
}
});
};

const divideIntoAreas = (field) => {
field.forEach((row, i) => {
row.forEach((elem, j) => {
if (elem.parent === -1 && elem.value === 1) {
components.push([]);
const parentId = components.length - 1;
components[parentId].push({ i, j });
components[parentId].push({ i, j });
dfs(field, i, j, parentId);
}
});
});
};

const countGroupEfficiency = (group) => {
const size = (group[0].i - group[1].i + 1) * (group[1].j - group[0].j + 1);
let count = 0;
for (let { i } = group[1]; i <= group[0].i; i++) {
for (let { j } = group[0]; j <= group[1].j; j++) {
if (field[i][j].value === 1) {
count++;
}
}
}

return { size, count };
};

const countMaxArea = (field) => {
divideIntoAreas(field);

if (components.length === 0) {
return 0;
}

const efficiencyList = components
.filter((group) => group.length > 3)
.map((group) => countGroupEfficiency(group))
.reduce((prev, curr) => {
const prevEff = prev.count / prev.size;
const curEff = curr.count / curr.size;
if (curEff > prevEff) {
return curr;
}
if (curEff < prevEff) {
return prev;
}
return prev.count > curr.count ? prev : curr;
}, {size: 0, count: 0});
return efficiencyList.size;
};

readline
.on('line', (line) => {
if (n === undefined) {
[n, m] = line.split(' ').map(Number);
return;
}
const row = line.split(' ').map((elem) => ({ value: +elem, parent: -1 }));

    field.push(row);

    if (field.length === m) {
      const maxArea = countMaxArea(field);
      console.log(maxArea);
      readline.close();
    }
})
.on('close', () => process.exit(0));

