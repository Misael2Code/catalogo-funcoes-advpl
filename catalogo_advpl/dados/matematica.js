/**
 * Catalogo de Funcoes ADVPL - Modulo Matematica e Calculos Numericos
 * Funcoes essenciais para arredondamento, truncamento, modulo e calculos numericos
 */
window.FUNCOES_ADVPL = window.FUNCOES_ADVPL || [];

window.FUNCOES_ADVPL.push(
  {
    nome: "Round",
    categoria: "Matemática",
    sintaxe: "Round( <nValor>, <nDecimais> )",
    retorno: "Numérico",
    descricaoCurta: "Arredonda um valor numérico para uma quantidade específica de casas decimais.",
    descricaoDetalhada: "Realiza o arredondamento matemático tradicional (se o próximo dígito for 5 ou superior, arredonda para cima; caso contrário, para baixo). Se <nDecimais> for negativo, arredonda para potências de dez (dezenas, centenas).",
    parametros: [
      { nome: "nValor", tipo: "Numérico", descricao: "Valor numérico a ser arredondado.", opcional: false },
      { nome: "nDecimais", tipo: "Numérico", descricao: "Quantidade de casas decimais desejada.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Arredondamento monetário e de valores decimais
User Function ExRound()
    Local nPreco  := 145.856
    Local nArred1 := Round(nPreco, 2)  // 145.86
    Local nArred2 := Round(1234.56, -1) // 1230.00 (arredonda para dezena)

    ConOut("Preço arredondado: " + cValToChar(nArred1))
Return`
  },
  {
    nome: "NoRound",
    categoria: "Matemática",
    sintaxe: "NoRound( <nValor>, [<nDecimais>] )",
    retorno: "Numérico",
    descricaoCurta: "Trunca um valor numérico na quantidade especificada de casas decimais sem realizar arredondamento.",
    descricaoDetalhada: "Descarta os dígitos excedentes a partir da casa decimal informada sem alterar os dígitos anteriores, diferentemente de Round(). Essencial em cálculos fiscais onde o truncamento é exigido por lei.",
    parametros: [
      { nome: "nValor", tipo: "Numérico", descricao: "Valor a ser truncado.", opcional: false },
      { nome: "nDecimais", tipo: "Numérico", descricao: "Número de casas decimais a manter (padrão: 0).", opcional: true }
    ],
    exemplo: `// Exemplo prático: Truncamento de valor sem arredondar
User Function ExNoRound()
    Local nValor := 125.899
    Local nTrunc := NoRound(nValor, 2) // 125.89 (não arredonda para 125.90)

    ConOut("Valor truncado: " + cValToChar(nTrunc))
Return`
  },
  {
    nome: "Int",
    categoria: "Matemática",
    sintaxe: "Int( <nValor> )",
    retorno: "Numérico",
    descricaoCurta: "Retorna a parte inteira de um número, descartando todas as casas decimais.",
    descricaoDetalhada: "Converte um número com decimais em um inteiro eliminando a parte fracionária (truncamento para zero).",
    parametros: [
      { nome: "nValor", tipo: "Numérico", descricao: "Número cuja parte inteira será extraída.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Extração de horas inteiras
User Function ExInt()
    Local nTotalHoras := 45.75
    Local nHorasInt   := Int(nTotalHoras) // 45

    ConOut("Horas inteiras: " + cValToChar(nHorasInt))
Return`
  },
  {
    nome: "Abs",
    categoria: "Matemática",
    sintaxe: "Abs( <nValor> )",
    retorno: "Numérico",
    descricaoCurta: "Retorna o valor absoluto (módulo) de um número, convertendo valores negativos em positivos.",
    descricaoDetalhada: "Elimina o sinal negativo de um número. Se o valor for positivo ou zero, retorna o próprio valor.",
    parametros: [
      { nome: "nValor", tipo: "Numérico", descricao: "Número a ter seu valor absoluto calculado.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Conversão de saldo devedor em módulo positivo
User Function ExAbs()
    Local nSaldoDevedor := -1540.80
    Local nModulo       := Abs(nSaldoDevedor) // 1540.80

    ConOut("Valor positivo: " + cValToChar(nModulo))
Return`
  },
  {
    nome: "Mod",
    categoria: "Matemática",
    sintaxe: "Mod( <nDividendo>, <nDivisor> )",
    retorno: "Numérico",
    descricaoCurta: "Calcula e retorna o resto da divisão inteira entre dois números (módulo).",
    descricaoDetalhada: "Equivale ao operador matemático de resto de divisão. Muito utilizado em algoritmos de dígito verificador (Módulo 10, Módulo 11) de CPF, CNPJ e boletos bancários.",
    parametros: [
      { nome: "nDividendo", tipo: "Numérico", descricao: "Número a ser dividido.", opcional: false },
      { nome: "nDivisor", tipo: "Numérico", descricao: "Número divisor.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Cálculo de resto de divisão
User Function ExMod()
    Local nResto := Mod(17, 5) // Retorna 2 (17 = 5*3 + 2)

    If Mod(Year(Date()), 4) == 0
        ConOut("Ano potencialmente bissexto.")
    EndIf
Return`
  },
  {
    nome: "Max",
    categoria: "Matemática",
    sintaxe: "Max( <exp1>, <exp2> )",
    retorno: "Mesmo tipo dos parâmetros",
    descricaoCurta: "Compara duas expressões do mesmo tipo (numérico, data ou caractere) e retorna o maior valor.",
    descricaoDetalhada: "Avalia <exp1> e <exp2>. Se forem números, retorna o maior; se forem datas, a mais recente; se strings, a de maior valor alfabético.",
    parametros: [
      { nome: "exp1", tipo: "Numérico / Data / Caractere", descricao: "Primeiro valor a comparar.", opcional: false },
      { nome: "exp2", tipo: "Numérico / Data / Caractere", descricao: "Segundo valor a comparar.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Obtenção do maior valor entre duas variáveis
User Function ExMax()
    Local nVal1  := 150.00
    Local nVal2  := 280.50
    Local nMaior := Max(nVal1, nVal2) // 280.50

    ConOut("Maior valor: " + cValToChar(nMaior))
Return`
  },
  {
    nome: "Min",
    categoria: "Matemática",
    sintaxe: "Min( <exp1>, <exp2> )",
    retorno: "Mesmo tipo dos parâmetros",
    descricaoCurta: "Compara duas expressões do mesmo tipo (numérico, data ou caractere) e retorna o menor valor.",
    descricaoDetalhada: "Avalia <exp1> e <exp2>. Se números, retorna o menor; se datas, a mais antiga; se strings, a de menor ordem lexicográfica.",
    parametros: [
      { nome: "exp1", tipo: "Numérico / Data / Caractere", descricao: "Primeiro valor a comparar.", opcional: false },
      { nome: "exp2", tipo: "Numérico / Data / Caractere", descricao: "Segundo valor a comparar.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Verificação de valor mínimo de pedido
User Function ExMin()
    Local nEstoqueMinimo := 10
    Local nEstoqueAtual  := 4
    Local nMenor         := Min(nEstoqueMinimo, nEstoqueAtual) // 4

    ConOut("Menor quantidade: " + cValToChar(nMenor))
Return`
  },
  {
    nome: "Sqrt",
    categoria: "Matemática",
    sintaxe: "Sqrt( <nValor> )",
    retorno: "Numérico",
    descricaoCurta: "Calcula e retorna a raiz quadrada de um número positivo.",
    descricaoDetalhada: "Retorna a raiz quadrada do número informado. Se o valor for negativo, gera erro de execução matemático.",
    parametros: [
      { nome: "nValor", tipo: "Numérico", descricao: "Número positivo para cálculo da raiz quadrada.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Cálculo de raiz quadrada
User Function ExSqrt()
    Local nArea := 144
    Local nLado := Sqrt(nArea) // 12

    ConOut("Raiz quadrada de 144: " + cValToChar(nLado))
Return`
  }
);
