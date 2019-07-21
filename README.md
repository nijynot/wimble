# Wimble
> Wallet reinvented for Grin.

Grin does not have addresses built-in which makes transacting more convoluted.
Thus, Wimble takes a new approach by only supporting file- and text (base64) based transactions coupled together with an intuitive interface.

Send- and receive Grin by simply copy-pasting strings through your favourite messaging app.

## Install
1. Go to [releases](https://github.com/nijynot/wimble/releases) and download the application.
1. Start the application.

## Build
You might want to build Wimble from the source yourself.  
Here's a step by step guide on how to do that. Some assumptions are made on basic installations.

```
$ git clone https://github.com/nijynot/wimble.git
$ cd wimble
$ npm install
$ npm run package
```
Then navigate to the `release` folder to find the built apps.

## Side-note
Wimble read and writes to the `.grin` folder, and uses configs that are stored inside the application.  
Wimble ***only*** supports file- and text (base64) based transactions.  
Wimble uses both the `grin` and the `grin-wallet` binaries.  

## License
MIT
