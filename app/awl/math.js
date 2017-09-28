/*
    Create a new custom math.js instance
    containing only capabilities i actually need
 */

const core = require("mathjs/core")

let instance = core.create({
    /*number: "BigNumber",
    precision: 32*/
})

instance.import([
    
    require("mathjs/lib/type/fraction"),

    require("mathjs/lib/expression"),

    require("mathjs/lib/error"),

    require("mathjs/lib/function/algebra/simplify"),

    ///////////////
    // Functions //
    ///////////////

    require("mathjs/lib/function/arithmetic/add"),
    require("mathjs/lib/function/arithmetic/subtract"),
    require("mathjs/lib/function/arithmetic/multiply"),
    require("mathjs/lib/function/arithmetic/divide"),
    require("mathjs/lib/function/arithmetic/unaryMinus"),
    require("mathjs/lib/function/arithmetic/unaryPlus"),
    require("mathjs/lib/function/arithmetic/pow"),
    require("mathjs/lib/function/arithmetic/nthRoot"),
    require("mathjs/lib/function/arithmetic/sqrt"),
    require("mathjs/lib/function/arithmetic/log"),
    require("mathjs/lib/function/arithmetic/exp"),

    require("mathjs/lib/function/arithmetic/mod"),
    require("mathjs/lib/function/arithmetic/floor"),
    require("mathjs/lib/function/arithmetic/ceil"),
    require("mathjs/lib/function/arithmetic/round"),
    require("mathjs/lib/function/arithmetic/gcd"),

    require("mathjs/lib/function/trigonometry/sin"),
    require("mathjs/lib/function/trigonometry/cos"),
    require("mathjs/lib/function/trigonometry/tan"),
    require("mathjs/lib/function/trigonometry/asin"),
    require("mathjs/lib/function/trigonometry/acos"),
    require("mathjs/lib/function/trigonometry/atan"),
    
    require("mathjs/lib/function/probability/combinations"),
    require("mathjs/lib/function/probability/factorial"),
    require("mathjs/lib/function/probability/random"),
    require("mathjs/lib/function/probability/randomInt"),

    ///////////////
    // Constants //
    ///////////////

    // none, symbol resolving happens in the evaluator
])

// math.js version
instance.version = require("mathjs/lib/version")

module.exports = instance