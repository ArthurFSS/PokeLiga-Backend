function aplicarRegraNova(dadosFormatadosArray) {

    dadosFormatadosArray.forEach(jogador => {
      jogador.pontuacaoTotal -= jogador.pontuacaoMinima;
      jogador.history.forEach(registro => {
        registro.data = formatarData(registro.data);
      });
    });

    dadosFormatadosArray.sort((a, b) => b.pontuacaoTotal - a.pontuacaoTotal);

    dadosFormatadosArray.forEach((jogador, index) => {
      jogador.posicao = index + 1;
    });
  
    return dadosFormatadosArray;
  }

function formatarData(data) {
    const dataObj = new Date(data);
    const dia = String(dataObj.getDate()).padStart(2, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0'); // Mês é base 0
    const ano = dataObj.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

function aplicarRegra(dadosDoBanco) {
    const dadosFormatados = {};
  
    dadosDoBanco.forEach(dado => {
      const { id, nome, data, pontos } = dado;
  
      if (dadosFormatados[nome]) {
        dadosFormatados[nome].history.push({ data: data, pontos: pontos });
        dadosFormatados[nome].pontuacaoTotal += parseInt(pontos);
        if (parseInt(pontos) < dadosFormatados[nome].pontuacaoMinima) {
          dadosFormatados[nome].pontuacaoMinima = parseInt(pontos);
        }
        if (parseInt(pontos) > dadosFormatados[nome].pontuacaoMaxima) {
          dadosFormatados[nome].pontuacaoMaxima = parseInt(pontos);
          dadosFormatados[nome].posicao = id;
        }
      } else {
        dadosFormatados[nome] = {
          posicao: id,
          nome: nome,
          pontuacaoTotal: parseInt(pontos),
          pontuacaoMinima: parseInt(pontos),
          pontuacaoMaxima: parseInt(pontos),
          history: [{ data: data, pontos: pontos }]
        };
      }
    });

    const dadosFormatadosArray = Object.values(dadosFormatados);

    return aplicarRegraNova(dadosFormatadosArray);
  }
  
  export default aplicarRegra;