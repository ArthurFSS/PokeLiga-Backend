function aplicarRegraNova(dadosFormatadosArray) {

    dadosFormatadosArray.forEach(jogador => {
      jogador.pontuacaoTotal -= jogador.pontuacaoMinima;
    });

    dadosFormatadosArray.sort((a, b) => b.pontuacaoTotal - a.pontuacaoTotal);

    dadosFormatadosArray.forEach((jogador, index) => {
      jogador.posicao = index + 1;
    });
  
    return dadosFormatadosArray;
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