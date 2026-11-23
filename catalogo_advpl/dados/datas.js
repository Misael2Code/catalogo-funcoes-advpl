/**
 * Catalogo de Funcoes ADVPL - Modulo Datas
 * Funcoes essenciais para calculos, conversoes e manipulacao de datas
 */
window.FUNCOES_ADVPL = window.FUNCOES_ADVPL || [];

window.FUNCOES_ADVPL.push(
  {
    nome: "Date",
    categoria: "Datas",
    sintaxe: "Date()",
    retorno: "Data (D)",
    descricaoCurta: "Retorna a data atual do sistema operacional da maquina ou servidor.",
    descricaoDetalhada: "Obtem a data corrente configurada no sistema operacional. No Protheus, e amplamente utilizada para registrar datas de inclusao, emissoes de notas e verificar vigencias. Nota: diferencie de dDataBase, que e a data logica definida pelo usuario no login do Protheus.",
    parametros: [],
    exemplo: `// Exemplo pratico: Comparacao entre data do sistema e data base do Protheus
User Function ExDate()
    Local dHoje     := Date()       // Data real do servidor
    Local dLogica   := dDataBase    // Data do sistema Protheus selecionada no login

    ConOut("Data real do servidor: " + dToC(dHoje))
    ConOut("Data base do Protheus: " + dToC(dLogica))

    If dHoje != dLogica
        ConOut("Atencao: Usuario trabalhando com data retroativa ou futura!")
    EndIf
Return`
  },
  {
    nome: "dToS",
    categoria: "Datas",
    sintaxe: "dToS( <dData> )",
    retorno: "Caractere (String no formato AAAAMMDD)",
    descricaoCurta: "Converte uma variavel do tipo Data em uma string no formato ISO/ANSI AAAAMMDD.",
    descricaoDetalhada: "Converte uma data no formato padrao invertido AAAAMMDD (Date to String). Essencial na construcao de consultas SQL em banco de dados, chaves de indice SIX e buscas via DbSeek para garantir ordenacao cronologica correta.",
    parametros: [
      { nome: "dData", tipo: "Data", descricao: "Data a ser convertida.", opcional: false }
    ],
    exemplo: `// Exemplo pratico: Uso em queries SQL e chave de busca de indices
User Function ExdToS()
    Local dDataRef := Date()
    Local cDataSQL := dToS(dDataRef) // "20261123"
    Local cQuery   := ""

    cQuery := "SELECT E1_NUM, E1_VALOR "
    cQuery += "FROM " + RetSqlName("SE1") + " "
    cQuery += "WHERE E1_VENCREA >= '" + cDataSQL + "' "
    cQuery += "AND D_E_L_E_T_ = ' '"

    ConOut("Data formatada para banco de dados: " + cDataSQL)
    ConOut("Query: " + cQuery)
Return`
  },
  {
    nome: "sToD",
    categoria: "Datas",
    sintaxe: "sToD( <cData> )",
    retorno: "Data (D)",
    descricaoCurta: "Converte uma cadeia de caracteres no formato AAAAMMDD em um valor nativo do tipo Data.",
    descricaoDetalhada: "Inverso de dToS (String to Date). Recebe uma string contendo exatamente 8 digitos no formato de ano, mes e dia (AAAAMMDD) e a transforma em um dado nativo de Data do ADVPL. Muito utilizada na leitura de campos retornados por queries SQL.",
    parametros: [
      { nome: "cData", tipo: "Caractere", descricao: "String com 8 digitos no padrao AAAAMMDD.", opcional: false }
    ],
    exemplo: `// Exemplo pratico: Conversao de campo de data lido de consulta SQL (TOPConnect)
User Function ExsToD()
    Local cDataBanco := "20261225" // Retornado por campo SQL
    Local dDataFim   := sToD(cDataBanco)

    ConOut("Data convertida para visualizacao: " + dToC(dDataFim)) // "25/12/2026"
    ConOut("Dia da semana: " + cValToChar(Dow(dDataFim)))
Return`
  },
  {
    nome: "dToC",
    categoria: "Datas",
    sintaxe: "dToC( <dData> )",
    retorno: "Caractere (String no formato DD/MM/AAAA)",
    descricaoCurta: "Converte uma expressao do tipo Data em uma string formatada de acordo com o idioma ativo.",
    descricaoDetalhada: "Converte a data para exibicao visual em tela ou impressao de relatorios (Date to Character). No padrao brasileiro (SET DATE BRITISH), formata no padrao DD/MM/AAAA.",
    parametros: [
      { nome: "dData", tipo: "Data", descricao: "Variavel do tipo Data a ser formatada.", opcional: false }
    ],
    exemplo: `// Exemplo pratico: Exibicao amigavel de data em mensagens e relatorios
User Function ExdToC()
    Local dVencimento := Date() + 30
    Local cMsg := "O vencimento do titulo sera em: " + dToC(dVencimento)

    ConOut(cMsg)
    MsgInfo(cMsg, "Vencimento")
Return`
  },
  {
    nome: "cToD",
    categoria: "Datas",
    sintaxe: "cToD( <cData> )",
    retorno: "Data (D)",
    descricaoCurta: "Converte uma string contendo data formatada (DD/MM/AAAA) em uma variavel tipo Data.",
    descricaoDetalhada: "Recebe uma string com formatacao de data (ex: '23/11/2026') e a converte para o tipo Data (D) nativo. Se a string contiver uma data invalida (ex: '31/02/2026'), retorna uma data em branco (CTOD('  /  /  ')).",
    parametros: [
      { nome: "cData", tipo: "Caractere", descricao: "String no formato DD/MM/AAAA.", opcional: false }
    ],
    exemplo: `// Exemplo pratico: Conversao de texto digitado em componente TGet
User Function ExcToD()
    Local cInput := "15/08/2026"
    Local dData  := cToD(cInput)

    If !Empty(dData)
        ConOut("Data informada e valida: " + dToC(dData))
    Else
        ConOut("Data informada e invalida!")
    EndIf
Return`
  },
  {
    nome: "Day",
    categoria: "Datas",
    sintaxe: "Day( <dData> )",
    retorno: "Numerico",
    descricaoCurta: "Retorna o dia do mes (1 a 31) a partir de uma variavel do tipo Data.",
    descricaoDetalhada: "Extrai a informacao do dia numerico do mes a partir de uma data fornecida. Se a data estiver vazia, retorna 0.",
    parametros: [
      { nome: "dData", tipo: "Data", descricao: "Data de onde o dia sera extraido.", opcional: false }
    ],
    exemplo: `// Exemplo pratico: Validacao do dia de fechamento de faturamento
User Function ExDay()
    Local dVenda := Date()
    Local nDia   := Day(dVenda)

    ConOut("Dia atual: " + cValToChar(nDia))
    If nDia >= 25
        ConOut("Periodo de fechamento contabil mensal ativo.")
    EndIf
Return`
  },
  {
    nome: "Month",
    categoria: "Datas",
    sintaxe: "Month( <dData> )",
    retorno: "Numerico",
    descricaoCurta: "Retorna o numero do mes (1 a 12) a partir de uma variavel do tipo Data.",
    descricaoDetalhada: "Extrai o numero do mes correspondente a uma expressao do tipo Data. Se a data fornecida for vazia, retorna 0.",
    parametros: [
      { nome: "dData", tipo: "Data", descricao: "Data de onde o mes sera extraido.", opcional: false }
    ],
    exemplo: `// Exemplo pratico: Identificacao de trimestre ou periodo fiscal
User Function ExMonth()
    Local dEmissao := Date()
    Local nMes     := Month(dEmissao)

    ConOut("Mes de emissao: " + cValToChar(nMes))
    If nMes >= 1 .And. nMes <= 3
        ConOut("1o Trimestre Fiscal")
    ElseIf nMes >= 4 .And. nMes <= 6
        ConOut("2o Trimestre Fiscal")
    EndIf
Return`
  },
  {
    nome: "Year",
    categoria: "Datas",
    sintaxe: "Year( <dData> )",
    retorno: "Numerico",
    descricaoCurta: "Retorna o ano com quatro digitos a partir de uma variavel do tipo Data.",
    descricaoDetalhada: "Retorna o ano com 4 digitos da data especificada (ex: 2026). Muito utilizado no preenchimento de campos de exercicio fiscal e geracao de numeracoes anuais de processos.",
    parametros: [
      { nome: "dData", tipo: "Data", descricao: "Data de onde o ano sera extraido.", opcional: false }
    ],
    exemplo: `// Exemplo pratico: Composicao do exercicio contabil
User Function ExYear()
    Local dMovimento := Date()
    Local nAno       := Year(dMovimento)

    ConOut("Exercicio Fiscal Corrente: " + cValToChar(nAno))
Return`
  },
  {
    nome: "MonthSum",
    categoria: "Datas",
    sintaxe: "MonthSum( <dData>, <nMeses> )",
    retorno: "Data (D)",
    descricaoCurta: "Adiciona ou subtrai uma quantidade especifica de meses a uma data.",
    descricaoDetalhada: "Soma ou subtrai (caso nMeses seja negativo) meses a uma data, ajustando automaticamente os dias finais de cada mes (ex: somando 1 mes a 31/01 resultara em 28/02 ou 29/02 em anos bissextos). Essencial para calculo de parcelas e contratos.",
    parametros: [
      { nome: "dData", tipo: "Data", descricao: "Data base inicial.", opcional: false },
      { nome: "nMeses", tipo: "Numerico", descricao: "Quantidade de meses a adicionar (positivo) ou subtrair (negativo).", opcional: false }
    ],
    exemplo: `// Exemplo pratico: Geracao de vencimentos mensais de contrato
User Function ExMonthSum()
    Local dInicio   := cToD("31/01/2026")
    Local dParcela1 := MonthSum(dInicio, 1) // "28/02/2026"
    Local dParcela2 := MonthSum(dInicio, 2) // "31/03/2026"

    ConOut("Vencimento 1: " + dToC(dParcela1))
    ConOut("Vencimento 2: " + dToC(dParcela2))
Return`
  },
  {
    nome: "DaySum",
    categoria: "Datas",
    sintaxe: "DaySum( <dData>, <nDias> )",
    retorno: "Data (D)",
    descricaoCurta: "Adiciona ou subtrai uma quantidade especifica de dias corridos a uma data.",
    descricaoDetalhada: "Soma ou subtrai dias corridos de uma data especifica. Equivale funcionalmente a operacao de adicao direta (dData + nDias), fornecendo uma sintaxe padronizada e legivel para regras de negocios e calculo de prazos de entrega.",
    parametros: [
      { nome: "dData", tipo: "Data", descricao: "Data inicial.", opcional: false },
      { nome: "nDias", tipo: "Numerico", descricao: "Quantidade de dias corridos a somar ou subtrair.", opcional: false }
    ],
    exemplo: `// Exemplo pratico: Calculo de data limite de entrega de pedido
User Function ExDaySum()
    Local dPedido  := Date()
    Local nPrazo   := 15 // Dias corridos
    Local dEntrega := DaySum(dPedido, nPrazo)

    ConOut("Data do Pedido: " + dToC(dPedido))
    ConOut("Previsao de Entrega: " + dToC(dEntrega))
Return`
  }
);
