// Array de abecedario
const letras = "abcdefghijklmnñopqrstuvwxyz0123456789";

// Array de caritas para reemplazar
const caritas = [
    "ʕ•́ᴥ•̀ʔっ", //a
    "(̶◉͛‿◉̶)", //b
    "≧◉ᴥ◉≦", //c
    "(ㆆ_ㆆ)", //d
    "( ˘︹˘ )", //e
    "(ง︡'-'︠)ง", //f
    "(╥︣﹏᷅╥)", //g
    "(>‿◠)", //h
    "(◔‿◔)", //i
    "(＾▿＾)", //j
    "٩(˘◡˘)۶", //k
    "(✿◠‿◠)", //l
    "≧◠‿◠≦", //m
    "(͡• ͜ʖ ͡•)", //n
    "(͡° ͜ʖ ͡°)", //ñ
    "(❛‿❛✿̶̥̥)", //o
    "ᕙ(^▿^)", //p
    "ᕙ(▿´)ᕗ", //q
    " (•◡•)", //r
    "(¬‿¬)", //s
    "(─‿‿─)", //t
    "≧◠‿●‿◠≦", //u
    "≧◠ᴥ◠≦", //v
    "（っ＾▿＾）", //w
    "☜(▿c)", //x
    "(͠≖ ͜ʖ͠≖)", //y
    " つ︣﹏╰）", //z
    "ಥ_ಥ", //0
    "(╥﹏╥)", //1
    "(≖_≖ )", //2
    "(҂◡̀_◡́)ᕤ", //3
    "凸(¬‿¬)凸", //4
    "(◣◢)┌∩┐", //5
    "t(>.<t)", //6
    "(▿´) ", //7
    "┻━┻ ︵ヽ(▭´)ﾉ ┻━┻", //8
    "(ᕗ ಠ︡益︠ಠ︠)ᕗ ┬━━━━┬", //9
    "(⊙.⊙(◉̃_᷅◉)⊙.⊙)", 
];


function encriptar(inputText, shift) {
    let textoCifrado = '';

    if (isNaN(shift)) {
        alert('Por favor, introduce un desplazamiento válido.');
        return;
    }

    for (let i = 0; i < inputText.length; i++) {
        let char = inputText[i];
        let charLower = char.toLowerCase();
        const index = letras.indexOf(charLower);

        if (index !== -1) {
            const newIndex = (index + shift) % letras.length;
            const letraCifrada = letras[newIndex];
            const caritaIndex = letras.indexOf(letraCifrada) % caritas.length;
            textoCifrado += caritas[caritaIndex];
        } else {
            textoCifrado += char;
        }
    }


    return textoCifrado;
}


function desencriptar(inputText, shift) {
    let textoDesencriptado = '';

    if (isNaN(shift)) {
        alert('Por favor, introduce un desplazamiento válido.');
        return;
    }

    let i = 0;
    while (i < inputText.length) {
        let found = false;

        for (let j = 0; j < caritas.length; j++) {
            if (inputText.substring(i, i + caritas[j].length) === caritas[j]) {
                const letraDesencriptada = letras[j];
                const originalIndex = (letras.indexOf(letraDesencriptada) - shift + letras.length) % letras.length;
                textoDesencriptado += letras[originalIndex];
                i += caritas[j].length;
                found = true;
                break;
            }
        }

        if (!found) {
            textoDesencriptado += inputText[i];
            i++;
        }
    }

    return textoDesencriptado;
}



document.getElementById('btnEncriptar').addEventListener('click', () => {
    const inputText = document.getElementById('tex1').value;
    const shift = parseInt(document.getElementById('desplazamiento').value);
    const textoCifrado = encriptar(inputText, shift);
    document.getElementById('textnuevo').value = textoCifrado;
});

document.getElementById('btnDesencriptar').addEventListener('click', () => {
    const inputText = document.getElementById('textnuevo').value;
    const shift = parseInt(document.getElementById('desplazamiento').value);
    const textoDesencriptado = desencriptar(inputText, shift);
    document.getElementById('textnuevo').value = textoDesencriptado;
});

document.getElementById('btnCopiar').addEventListener('click', () => {
    const texto = document.getElementById('textnuevo').value;
    navigator.clipboard.writeText(texto).then(() => {
        alert('Texto copiado al portapapeles.');
    }).catch(err => {
        alert('Error al copiar el texto: ' + err);
    });
});
