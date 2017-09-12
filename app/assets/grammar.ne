@{%
const tokenPrint = { literal: "print" }
const tokenNumber = { test: x => Number.isInteger(x) }
const tokenEnd = { literal: ";;" }
%}

main -> %tokenPrint %tokenNumber %tokenEnd