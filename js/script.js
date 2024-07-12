window.onload = () => {
  // Variáveis que irei usar durante o projeto
  let altura = document.querySelector("#height");
  let peso = document.querySelector("#weight");
  const exibirImc = document.querySelector("#imc-result");
  let explicarResultado = document.querySelector("#explaining-result");

  // Função para criar uma máscara para os inputs que o programa irá receber (peso e altura)
  function maskInput(event, mask) {
    const input = event.target;
    const value = input.value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    let maskedValue = "";
    let index = 0;

    for (let i = 0; i < mask.length && index < value.length; i++) {
      if (mask[i] === "0") {
        maskedValue += value[index];
        index++;
      } else {
        maskedValue += mask[i];
      }
    }

    input.value = maskedValue;
  }

  // Aplicando a máscara no evento input do peso, para deixar o formato em 00,0 (Ex.: 60,0)
  peso.addEventListener("input", (event) => {
    maskInput(event, "000,0");
  });

  // Aplicando a máscara no evento input da altura, para deixar o formato em 0.00 (Ex.: 1.70)
  altura.addEventListener("input", (event) => {
    maskInput(event, "0.00");
  });

  // Função para executar o cálculo do IMC (peso / (altura * altura))
  function calculoImc(peso, altura) {
    return peso / (altura * altura);
  }

  // Função para exibir uma mensagem com o resultado do IMC
  function exibirResultadoImc(totalImc) {
    // Define o display como block para exibir a mensagem
    explicarResultado.style.display = "block";

    // Usar um switch para definir a mensagem com base no IMC
    switch (true) {
      case totalImc >= 40.0:
        explicarResultado.innerText = "Obesidade Grau 3, procure ajuda médica!";
        explicarResultado.style.color = "#D10D0E";
        break;
      case totalImc >= 35.0 && totalImc <= 39.9:
        explicarResultado.innerText = "Obesidade Grau 2, cuidado redobrado!";
        explicarResultado.style.color = "#F95B02";
        break;
      case totalImc >= 30.0 && totalImc <= 34.9:
        explicarResultado.innerText =
          "Obesidade Grau 1, chegou a hora de cuidar!";
        explicarResultado.style.color = "#F67600";
        break;
      case totalImc >= 25.0 && totalImc < 30.0:
        explicarResultado.innerText = "Sobrepeso, fique atento!";
        explicarResultado.style.color = "#FCA500";
        break;
      case totalImc >= 18.5 && totalImc < 25.0:
        explicarResultado.innerText = "Peso normal, continue assim!";
        explicarResultado.style.color = "#83C635";
        break;
      case totalImc < 18.5:
        explicarResultado.innerText = "Abaixo do peso, procure orientação!";
        explicarResultado.style.color = "#FFF001";
        break;
      default:
        explicarResultado.innerText =
          "IMC inválido, por favor verifique os dados inseridos.";
        break;
    }
  }

  // Evento escutando um click no botão de calcular e executar a função do cálculo do IMC
  document.getElementById("imc-calculate").addEventListener("click", () => {
    let total = calculoImc(parseFloat(peso.value), parseFloat(altura.value));

    exibirImc.innerText = total.toFixed(2);

    exibirResultadoImc(total);
  });

  // Função escutando um click no botão limpar, que limpa todos os dados inseridos pelo usuário e também o resultado
  function limparDados() {
    altura.value = "";
    peso.value = "";
    exibirImc.innerText = "";
    explicarResultado.style.display = "none";
  }

  document.getElementById("imc-clear").addEventListener("click", limparDados);
};
