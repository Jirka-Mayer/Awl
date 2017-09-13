Feature hierarchy
=================

Here are listed current or future features, sorted by importance.
Some are said not to be implemented, because of calculator niche
Awl is meant to occupy (I'm not building Wolfram Alpha,
Geogebra or Matlab).


Overview
--------

Awl is case-sensitive.


Value types
-----------


##### Numbers

This means integers `12`, decimals `12.6` and scientific
notation `12.6e-4`.


##### Fractions and roots

These should be handled by the symbolic math engine, not being
represented as a special data type.

> But you can type fractions without whitespace and Awl should
(in the future) print fractional results without
whitespace `4 / 3  -->  4/3`


##### Vectors

No, not gonna do that. It's difficult to
read and tedious to write even in 3 dimensions.

    ((3, -2, 5) cross (3, 8, -4)) dot (0, 1, -7)

Same applies to matricies.


##### Custom functions

Probbably not, because they would only be present in a single
session, and the effort to declare one is so high, I don't
think many people would use it.

> Maybe we could store them in a file and load on startup,
but again - it's too much overhead for the end user - Awl is
not a programming language.


Basic operations
----------------


##### Addition

Must have.


##### Multiplication

Must have.

When writing "n times a variable", you can type just `5x` instead
of the long `5 * x`. Works even with constants `2pi`.

> Not sure how about parentheses and functions. `2(x + 1)` `2sin x`
It would be nice, but I have to check it.


##### Exponentiation

Must have.

There are two symbols for exponentiation, `^` and `**`.

Similarly to multiplication, you can write exponents next to a
variable `x2` meaning `x^2`.


##### Parentheses

So far only these `()` are used. Others may be used in the
future for something else.

If they follow a function immediately, they represent an argument
list and may contain a comma.

    log(2, 3)


Fancier operations
------------------

##### Unary operators

You can type unary sign: `3 - -2` or `+5`.

Factorial is a postfix unary operator `5!`.


##### Functions

Functions can be written using the well known notation:

    sin(x)
    tan(2pi / 3)
    log(2, 10)
    ln(3)

If the function has just a single argument, you can
omit the parentheses.

    sin x
    ln 5


##### Logarithm

Logarithms can have base written in the same way as exponents:

    log2 10


##### Infix functions

There are some special functions that take two arguments and
can be written using the infix notation. For example combinations:

    n choose k

    n C k        # same thing


Variables
---------

You can set value to a variable and then use it later:

    x <- 5
    x = 5   # works because of equations

Or you can save value after you've written an
expression or taken a calcualtion:

    5 + 8
    13 -> x

You can add a value to a variable:

    5 -> x
    8 ->> x

    # x is 13 now

    # also
    x <<- 8


Equations
---------

Awl can also solve very simple equations (linear, quadratic):

    x + 10 = 3x - 2

    # produces this output and stores 6 in the variable "x"
    x = 6