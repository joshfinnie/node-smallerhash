var crypto = require('crypto');

var string = "This is another test.";

var md5sum = crypto.createHash('md5').update(string).digest('hex');
var sha1sum = crypto.createHash('sha1').update(string).digest('hex');

function getValueOfDigit(digit, alphabet)
{
   var pos = alphabet.indexOf(digit);
   return pos;
}

function convert(src, srcAlphabet, dstAlphabet)
{
   var srcBase = srcAlphabet.length;
   var dstBase = dstAlphabet.length;

   var wet     = src;
   var val     = 0;
   var mlt     = 1;

   while (wet.length > 0)
   {
     var digit  = wet.charAt(wet.length - 1);
     val       += mlt * getValueOfDigit(digit, srcAlphabet);
     wet        = wet.substring(0, wet.length - 1);
     mlt       *= srcBase;
   }

   wet          = val;
   var ret      = "";

   while (wet >= dstBase)
   {
     var digitVal = wet % dstBase;
     var digit    = dstAlphabet.charAt(digitVal);
     ret          = digit + ret;
     wet /= dstBase;
   }

   var digit    = dstAlphabet.charAt(wet);
   ret          = digit + ret;

   return ret;
}

var SRC_ALPHA = "0123456789abcdef";
var DST_ALPHA = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

var shortmd5 = convert(md5sum, SRC_ALPHA, DST_ALPHA);
var shortsha1 = convert(sha1sum, SRC_ALPHA, DST_ALPHA);

console.log(md5sum +
            "\n" +
            shortmd5 +
            "\n" +
            (100 - (shortmd5.length/md5sum.length * 100)) + "% smaller"
            );
console.log(sha1sum +
            "\n" +
            shortsha1 +
            "\n" +
            (100 - (shortsha1.length/sha1sum.length * 100)) + "% smaller"
            );
