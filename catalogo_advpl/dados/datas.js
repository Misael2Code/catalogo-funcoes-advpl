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
  },
  {
    nome: "Time",
    categoria: "Datas",
    sintaxe: "Time()",
    retorno: "Caractere (String no formato HH:MM:SS)",
    descricaoCurta: "Retorna a hora atual do sistema no formato padrão HH:MM:SS.",
    descricaoDetalhada: "Obtém a hora corrente do relógio do sistema operacional da máquina/servidor onde o processo está executando. Indispensável para logs, métricas de performance e registro de horários de movimentações.",
    parametros: [],
    exemplo: `// Exemplo prático: Registro de horário de processamento
User Function ExTime()
    Local cHoraAtual := Time()
    ConOut("Início da rotina: " + cHoraAtual) // "09:35:10"
Return`
  },
  {
    nome: "ElapTime",
    categoria: "Datas",
    sintaxe: "ElapTime( <cHoraInicio>, <cHoraFim> )",
    retorno: "Caractere (String no formato HH:MM:SS)",
    descricaoCurta: "Calcula o tempo decorrido entre dois horários no formato HH:MM:SS.",
    descricaoDetalhada: "Calcula o intervalo de tempo entre o horário inicial e o final. Trata automaticamente a virada de meia-noite (24 horas). Muito utilizada para mensurar tempo de processamento de rotinas batch e integrações.",
    parametros: [
      { nome: "cHoraInicio", tipo: "Caractere", descricao: "Horário inicial no formato 'HH:MM:SS'.", opcional: false },
      { nome: "cHoraFim", tipo: "Caractere", descricao: "Horário final no formato 'HH:MM:SS'.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Cálculo do tempo total de execução
User Function ExElapTime()
    Local cInicio  := "14:00:00"
    Local cFim     := "15:42:35"
    Local cDuracao := ElapTime(cInicio, cFim)

    ConOut("Tempo decorrido: " + cDuracao) // "01:42:35"
Return`
  },
  {
    nome: "LastDay",
    categoria: "Datas",
    sintaxe: "LastDay( <dData> )",
    retorno: "Data (D)",
    descricaoCurta: "Retorna a data correspondente ao último dia do mês da data informada.",
    descricaoDetalhada: "Retorna o último dia do mês correspondente à data informada, tratando automaticamente anos bissextos (28 ou 29 dias em fevereiro) e meses de 30 ou 31 dias. Essencial para rotinas fiscais e financeiras de fechamento.",
    parametros: [
      { nome: "dData", tipo: "Data", descricao: "Data base de referência.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Identificação do dia de fechamento do mês
User Function ExLastDay()
    Local dRef       := cToD("10/02/2026")
    Local dUltimoDia := LastDay(dRef)

    ConOut("Último dia de Fevereiro/2026: " + dToC(dUltimoDia)) // "28/02/2026"
Return`
  },
  {
    nome: "DataValida",
    categoria: "Datas",
    sintaxe: "DataValida( <dData>, [<lAvanca>] )",
    retorno: "Data (D)",
    descricaoCurta: "Valida se uma data é dia útil conforme o calendário de feriados do Protheus.",
    descricaoDetalhada: "Verifica se a data informada cai em sábados, domingos ou feriados cadastrados no sistema. Caso não seja dia útil, avança para o próximo dia útil (padrão) ou retrocede para o dia útil anterior se lAvanca for .F.",
    parametros: [
      { nome: "dData", tipo: "Data", descricao: "Data a ser validada contra o calendário de dias úteis.", opcional: false },
      { nome: "lAvanca", tipo: "Lógico", descricao: "Se .T., avança para o próximo dia útil; se .F., retrocede para o dia útil anterior. Padrão: .T.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Ajuste automático de vencimento para dia útil
User Function ExDataValida()
    Local dVenc := cToD("15/11/2026") // Domingo / Feriado Nacional
    Local dUtil := DataValida(dVenc, .T.)

    ConOut("Data original: " + dToC(dVenc))
    ConOut("Data ajustada para dia útil: " + dToC(dUtil))
Return`
  },
  {
    nome: "FirstDay",
    categoria: "Datas",
    sintaxe: "FirstDay( <dData> )",
    retorno: "Data (D)",
    descricaoCurta: "Retorna a data correspondente ao primeiro dia do mês da data informada.",
    descricaoDetalhada: "Inverso conceitual de LastDay(). Retorna sempre o dia 1º do mês e ano da data passada como argumento.",
    parametros: [
      { nome: "dData", tipo: "Data", descricao: "Data de referência.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Obtenção do primeiro dia do mês corrente
User Function ExFirstDay()
    Local dHoje     := Date()
    Local dPrimeiro := FirstDay(dHoje)

    ConOut("Primeiro dia do mês corrente: " + dToC(dPrimeiro))
Return`
  },
  {
    nome: "Dow",
    categoria: "Datas",
    sintaxe: "Dow( <dData> )",
    retorno: "Numérico (1 a 7)",
    descricaoCurta: "Retorna o dia da semana como um valor numérico de 1 (Domingo) a 7 (Sábado).",
    descricaoDetalhada: "Sigla para 'Day of Week'. Retorna: 1 = Domingo, 2 = Segunda, 3 = Terça, 4 = Quarta, 5 = Quinta, 6 = Sexta, 7 = Sábado.",
    parametros: [
      { nome: "dData", tipo: "Data", descricao: "Data a ser inspecionada.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Verificação de final de semana
User Function ExDow()
    Local dData := Date()
    Local nDiaSemana := Dow(dData)

    If nDiaSemana == 1 .Or. nDiaSemana == 7
        ConOut("Data cai em final de semana.")
    Else
        ConOut("Data em dia útil comercial.")
    EndIf
Return`
  },
  {
    nome: "CDoW",
    categoria: "Datas",
    sintaxe: "CDoW( <dData> )",
    retorno: "Caractere (String com o nome do dia da semana)",
    descricaoCurta: "Retorna o nome do dia da semana por extenso conforme o idioma do ambiente.",
    descricaoDetalhada: "Retorna string com o nome por extenso (ex: 'Segunda-feira', 'Domingo', ou 'Monday' em inglês).",
    parametros: [
      { nome: "dData", tipo: "Data", descricao: "Data de referência.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Exibição do dia da semana por extenso
User Function ExCDoW()
    Local dHoje := Date()
    ConOut("Hoje é: " + CDoW(dHoje))
Return`
  },
  {
    nome: "CMonth",
    categoria: "Datas",
    sintaxe: "CMonth( <dData> )",
    retorno: "Caractere (String com o nome do mês)",
    descricaoCurta: "Retorna o nome do mês por extenso correspondente à data informada.",
    descricaoDetalhada: "Retorna string com o nome do mês (ex: 'Janeiro', 'Fevereiro', 'Novembro') de acordo com o idioma configurado.",
    parametros: [
      { nome: "dData", tipo: "Data", descricao: "Data de onde o mês será extraído.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Nome do mês atual por extenso
User Function ExCMonth()
    Local dData := Date()
    ConOut("Mês atual por extenso: " + CMonth(dData))
Return`
  },
  {
    nome: "MonthSub",
    categoria: "Datas",
    sintaxe: "MonthSub( <dData>, <nMeses> )",
    retorno: "Data (D)",
    descricaoCurta: "Subtrai uma quantidade de meses de uma data fornecida, recalculando os dias limites.",
    descricaoDetalhada: "Função inversa de MonthSum(). Subtrai <nMeses> ajustando o último dia caso o mês de destino possua menos dias (ex: subtrair 1 mês de 31/03 resulta em 28/02).",
    parametros: [
      { nome: "dData", tipo: "Data", descricao: "Data inicial.", opcional: false },
      { nome: "nMeses", tipo: "Numérico", descricao: "Quantidade de meses a subtrair.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Subtração de meses para busca de histórico
User Function ExMonthSub()
    Local dHoje      := Date()
    Local dTresMeses := MonthSub(dHoje, 3)

    ConOut("Data de 3 meses atrás: " + dToC(dTresMeses))
Return`
  },
  {
    nome: "DaySub",
    categoria: "Datas",
    sintaxe: "DaySub( <dData>, <nDias> )",
    retorno: "Data (D)",
    descricaoCurta: "Subtrai uma quantidade de dias corridos de uma data informada.",
    descricaoDetalhada: "Subtrai <nDias> corridos da data. Equivale funcionalmente a dData - nDias.",
    parametros: [
      { nome: "dData", tipo: "Data", descricao: "Data de referência.", opcional: false },
      { nome: "nDias", tipo: "Numérico", descricao: "Quantidade de dias corridos a subtrair.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Cálculo de data de tolerância
User Function ExDaySub()
    Local dLimite := DaySub(Date(), 7) // 7 dias atrás
    ConOut("Data limite de tolerância: " + dToC(dLimite))
Return`
  },
  {
    nome: "Seconds",
    categoria: "Datas",
    sintaxe: "Seconds()",
    retorno: "Numérico (Segundos decorridos desde a meia-noite com centésimos)",
    descricaoCurta: "Retorna o número de segundos decorridos desde a meia-noite (00:00:00) com precisão centesimal.",
    descricaoDetalhada: "Função essencial para medição de performance, tempo de processamento de rotinas e benchmarking. Ao calcular a diferença entre Seconds() no fim e no início de uma rotina, obtém-se o tempo exato decorrido em segundos.",
    parametros: [],
    exemplo: `// Exemplo prático: Medição de tempo de execução com Seconds
User Function MedirTempo()
    Local nInicio := Seconds()
    Local nFim    := 0
    Local nTempo  := 0

    // Processamento de carga
    U_CargaDados()

    nFim   := Seconds()
    nTempo := nFim - nInicio

    ConOut("Tempo total de execução: " + cValToChar(nTempo) + " segundos.")
Return`
  },
  {
    nome: "Year2Str",
    categoria: "Datas",
    sintaxe: "Year2Str( <dData> )",
    retorno: "Caractere (String de 2 dígitos com o ano)",
    descricaoCurta: "Retorna os dois últimos dígitos do ano de uma data no formato string.",
    descricaoDetalhada: "Extrai o ano da data informada e converte em uma string com os 2 últimos dígitos (ex: para uma data em 2026, retorna '26'). Muito utilizada na composição de números de série, lotes e códigos anuais.",
    parametros: [
      { nome: "dData", tipo: "Data", descricao: "Data da qual o ano de 2 dígitos será extraído.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Composição de código de lote anual com Year2Str
User Function ExYear2Str()
    Local dEmissao := Date()
    Local cAno2    := Year2Str(dEmissao) // "26" para o ano 2026
    Local cNumLote := "LOT-" + cAno2 + "-001"

    ConOut("Código gerado do lote: " + cNumLote)
Return`
  },
  {
    nome: "Month2Str",
    categoria: "Datas",
    sintaxe: "Month2Str( <dData> )",
    retorno: "Caractere (String de 2 dígitos com o mês)",
    descricaoCurta: "Retorna o mês de uma data em formato string de 2 dígitos (preenchido com zero à esquerda).",
    descricaoDetalhada: "Extrai o mês da data informada e converte em texto de tamanho 2 (ex: '01' para janeiro, '12' para dezembro). Útil para composição de códigos contábeis, competências (MMAAAA) e nomes de arquivos de fechamento.",
    parametros: [
      { nome: "dData", tipo: "Data", descricao: "Data da qual o mês de 2 dígitos será extraído.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Montagem de competência fiscal no formato MMAAAA
User Function ExMonth2Str()
    Local dHoje       := Date()
    Local cMes        := Month2Str(dHoje)
    Local cAno        := StrZero(Year(dHoje), 4)
    Local cCompetencia := cMes + "/" + cAno

    ConOut("Competência atual: " + cCompetencia) // "11/2026"
Return`
  },
  {
    nome: "Day2Str",
    categoria: "Datas",
    sintaxe: "Day2Str( <dData> )",
    retorno: "Caractere (String de 2 dígitos com o dia)",
    descricaoCurta: "Retorna o dia do mês de uma data em formato string de 2 dígitos com zero à esquerda.",
    descricaoDetalhada: "Converte o dia da data informada para string fixa de 2 caracteres (ex: '05' para o dia 5, '28' para o dia 28). Muito utilizada na formatação de datas customizadas e máscaras de exportação bancária.",
    parametros: [
      { nome: "dData", tipo: "Data", descricao: "Data da qual o dia do mês será extraído.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Formatação de arquivo de remessa com Day2Str
User Function ExDay2Str()
    Local dProcesso := Date()
    Local cDia      := Day2Str(dProcesso)
    Local cNomeArq  := "REMESSA_" + cDia + ".TXT"

    ConOut("Arquivo do dia: " + cNomeArq)
Return`
  },
  {
    nome: "Sec2Time",
    categoria: "Datas",
    sintaxe: "Sec2Time( <nSegundos> )",
    retorno: "Caractere (String formatada no padrão 'HH:MM:SS')",
    descricaoCurta: "Converte uma quantidade total de segundos em string formatada de horas, minutos e segundos ('HH:MM:SS').",
    descricaoDetalhada: "Função indispensável para exibição de durações e tempos de processamento no Protheus. Converte um valor numérico em segundos (como o tempo retornado pela medição com Seconds()) para o formato legível 'HH:MM:SS'.",
    parametros: [
      { nome: "nSegundos", tipo: "Numérico", descricao: "Quantidade total de segundos decorridos.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Exibição legível da duração de rotina de fechamento
User Function ExSec2Time()
    Local nInicio  := Seconds()
    Local nDuracao := 0

    // Simula execução de processo
    Sleep(2500) // Aguarda 2.5 segundos

    nDuracao := Seconds() - nInicio
    ConOut("Duração formatada: " + Sec2Time(nDuracao)) // "00:00:02"
Return`
  },
  {
    nome: "Time2Sec",
    categoria: "Datas",
    sintaxe: "Time2Sec( <cHora> )",
    retorno: "Numérico (Total de segundos decorridos no dia)",
    descricaoCurta: "Converte uma string de hora no formato 'HH:MM:SS' no número total de segundos correspondentes.",
    descricaoDetalhada: "Função inversa do Sec2Time. Recebe uma hora em texto (como '02:30:00' ou Time()) e calcula o total acumulado de segundos desde o início do dia, facilitando operações de soma e subtração de intervalos de tempo.",
    parametros: [
      { nome: "cHora", tipo: "Caractere", descricao: "String contendo o horário no padrão 'HH:MM:SS'.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Cálculo da diferença em segundos entre dois horários
User Function ExTime2Sec()
    Local cHoraIni := "08:00:00"
    Local cHoraFim := "10:30:00"
    Local nDiferenca := Time2Sec(cHoraFim) - Time2Sec(cHoraIni)

    ConOut("Segundos decorridos no intervalo: " + cValToChar(nDiferenca)) // 9000 segundos
Return`
  }
);
