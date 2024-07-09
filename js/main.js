window.onload = () => {
  let peso = document.querySelector("#weight");
  let altura = document.querySelector("#height");
  const exibirImc = document.querySelector("#imc-result");

  function maskInput(event, mask) {
    const input = event.target;
    const value = input.value.replace(/\D/g, "");
    let maskedValue = "";
    let index = 0;

    for (let i = 0; i < mask.length; i++) {
      if (mask[i] === "0") {
        if (index < value.length) {
          maskedValue += value[index];
          index++;
        } else {
          break;
        }
      } else {
        maskedValue += mask[i];
      }
    }

    input.value = maskedValue;
  }

  altura.addEventListener("input", (event) => {
    maskInput(event, "0.00");
  });

  peso.addEventListener("input", (event) => {
    maskInput(event, "00,0");
  });

  function calculoImc(peso, altura) {
    return peso / (altura * altura);
  }

  document.getElementById("imc-calculate").addEventListener("click", () => {
    let totalImc = calculoImc(parseFloat(peso.value), parseFloat(altura.value));

    exibirImc.innerText = totalImc.toFixed(2);
  });
};
