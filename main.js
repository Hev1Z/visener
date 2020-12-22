    var cypher = (function () {
        var cypher = {}, register = function (e) {return e === e.toUpperCase();};
        cypher.language = {
            ru : "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split(""),
            all     : [],
            joinAll : function (){
                cypher.language.all = [];
                for (var i in this) {
                    if (typeof this[i] !== "function" && i !== "all") {
                        cypher.language.all = cypher.language.all.concat (this[i]);
                    }
                }
            }
        }
 
        cypher.vizhener = {
            square : [],
            genSqViz : function (lang) {
                var l = cypher.language[lang];
                for (var i = 0; i < l.length; i++) {
                    this.square[i] = l.slice(i).concat(l.slice(0, i));
                }
            },
            encryption : function (lang, text, key) {
                if (lang === "all") cypher.language.joinAll ();
                else if (!Array.isArray(cypher.language[lang])) return;
                this.genSqViz(lang);
 
                var sText = text;
 
                text = text.toUpperCase();
                key  = key.toUpperCase();
 
                var s = "", l = cypher.language[lang];
                for (var i = 0; i < text.length; i++) {
                    s += this.square[l.indexOf(text[i])][l.indexOf(key[i])];
                }
 
                return s.split ("").map (function (e, i, a) {return register (sText[i]) ? e : e.toLowerCase();}).join("");
            },
            decryption : function (lang, key, cipher) {
                if (lang === "all") cypher.language.joinAll ();
                else if (!Array.isArray(cypher.language[lang])) return;
                this.genSqViz(lang);
 
                var sCipher = cipher;
 
                cipher = cipher.toUpperCase();
                key    = key.toUpperCase();
                var s = "",  l = cypher.language[lang];
                for (var i = 0; i < cipher.length; i++) {
                    var row = l.indexOf(key[i])
                    coll = this.square[row].indexOf(cipher[i]);
                    s += l[coll];
                }
                return s.split ("").map (function (e, i, a) {return register (sCipher[i]) ? e : e.toLowerCase();}).join("");
            },
            outS : function () {
                for (var i = 0; i < this.square.length; i++) {
                    document.write(this.square[i].join ("") + "<br>");
                }
            }
        };
 
        
        
        return cypher;
    } ());

    document.addEventListener("DOMContentLoaded", function(event){
        document.getElementById("encrypt_submit").addEventListener("click", 
        function(e) {
            form= document.getElementById("encrypt")
            text= form.text.value
            key= form.key.value
            console.log(form.result)
            encrypt=cypher.vizhener.encryption("ru", text, key)
            document.getElementById("encrypt_result").innerHTML=encrypt
        }
     );
     document.getElementById("decrypt_submit").addEventListener("click", 
        function(e) {
            form= document.getElementById("decrypt")
            text= form.text.value
            key= form.key.value
            console.log(key.value)
            decrypt=cypher.vizhener.decryption("ru",  key, text)
            document.getElementById("decrypt_result").innerHTML=decrypt
        }
     )
    })



    



    