function aplicarRegraNova(dadosFormatadosArray, datasUnicas) {
  // Remover a menor pontuação de cada jogador ou uma falta
  dadosFormatadosArray.forEach(jogador => {
    const pontuacoes = jogador.history.map(registro => registro.pontos);
    const faltas = Array.from(datasUnicas).length - pontuacoes.length;
    const menorPontuacao = Math.min(...pontuacoes, ...Array(faltas).fill(Number.MIN_SAFE_INTEGER));

    jogador.pontuacaoTotal -= menorPontuacao === Number.MIN_SAFE_INTEGER ? 0 : menorPontuacao;
    
    jogador.history.forEach(registro => {
      registro.data = formatarData(registro.data);
    });
  });

  // Ordenar os jogadores pela pontuação total
  dadosFormatadosArray.sort((a, b) => b.pontuacaoTotal - a.pontuacaoTotal);

  // Atribuir a posição de cada jogador
  dadosFormatadosArray.forEach((jogador, index) => {
    jogador.posicao = index + 1;
  });

  return dadosFormatadosArray;
}

function formatarData(data) {
  const dataObj = new Date(data);
  const dia = String(dataObj.getDate()).padStart(2, '0');
  const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
  const ano = dataObj.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

function aplicarRegra(dadosDoBanco) {
  const dadosFormatados = {};
  const datasUnicas = new Set();

  dadosDoBanco.forEach(dado => {
    const { id, nome, data, pontos } = dado;

    datasUnicas.add(formatarData(data));

    if (dadosFormatados[nome]) {
      dadosFormatados[nome].history.push({ data: data, pontos: parseInt(pontos) });
      dadosFormatados[nome].pontuacaoTotal += parseInt(pontos);
    } else {
      dadosFormatados[nome] = {
        posicao: id,
        nome: nome,
        pontuacaoTotal: parseInt(pontos),
        history: [{ data: data, pontos: parseInt(pontos) }]
      };
    }
  });

  const dadosFormatadosArray = Object.values(dadosFormatados);

  return aplicarRegraNova(dadosFormatadosArray, datasUnicas);
}

export default aplicarRegra;
