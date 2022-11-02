var keyEncrypt = document.getElementById("keyEncrypt")
var plainTextEncrypt = document.getElementById("plainTextEncrypt")
var chipperEncrypt = document.getElementById("chipperEncrypt")
var keyDecrypt = document.getElementById("keyDecrypt")
var plainTextDecrypt = document.getElementById("plainTextDecrypt")
var chipperDecrypt = document.getElementById("chipperDecrypt")
var decryptButton = document.getElementById("decryptButton")
var encryptButton = document.getElementById("encryptButton")

// rumus encrypt 
// Ci = ( Pi + Ki ) mod 26
// = (18 + 10) mod 26
// = 28 mod 26
// = 2    
// rumus decript
// Pi = ( Ci – Ki ) + 26
// = ( 2 – 10 ) + 26
// = –8 + 26
// = 18

encryptButton.addEventListener('click',(e)=>{
    e.preventDefault()
    encryptVigenere()
    
})
decryptButton.addEventListener('click',(e)=>{
    e.preventDefault()
    decryptVigenere()
})


function sameLength(text,key){
    let keyNew = ""
    let keyIndex = 0
    for (let i = 0; i < text.length; i++) {
        if(keyIndex > key.length-1 ){
            keyIndex = 0
        }
        keyNew+=key[keyIndex]
        keyIndex++
        
    }
    return keyNew

}
function encryptVigenere(){
    //key harus diulang sesuai dengan isi plaintext mis : plainText = "rizki" , key = "mau" => key ="mauma"
    const newKey = sameLength(plainTextEncrypt.value,keyEncrypt.value)
    //genereate chipper 
    const generate = generateChipper(plainTextEncrypt.value.toUpperCase(),newKey.toUpperCase())
    chipperEncrypt.value = generate
}

function generateChipper(plainTextEncrypt,key){
    const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    let chipper = ""
    for(let i =0;i<plainTextEncrypt.length;i++){
        if(plainTextEncrypt[i] == " "){
            chipper+=" "
        }else{
            const index = (plainTextEncrypt[i].charCodeAt()+key[i].charCodeAt()) % 26
            chipper+=alphabet[index]
        }
    }

    return chipper
}


const decryptVigenere = ()=>{
    const newKey = sameLength(chipperDecrypt.value,keyDecrypt.value)
  
    //genererate result decript
    const generate = generatePlainText(chipperDecrypt.value.toUpperCase(),newKey.toUpperCase())
    plainTextDecrypt.value = generate

}

const generatePlainText = (chipper,key)=>{
    const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    let plainText = ""
    for(let i =0;i < chipper.length;i++){
        if(chipper[i] == " "){
            plainText+=" "
        }else{
            let index = (chipper[i].charCodeAt() - key[i].charCodeAt()) + 26
            index >= 26 ? index = index - alphabet.length :index=index
            plainText+=alphabet[index]
        }
    }
    return plainText
    
}

