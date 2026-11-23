/**
 * Catalogo de Funcoes ADVPL - Modulo Tipos e Validacoes de Sistema
 * Funcoes essenciais para verificacao de tipos, condicionais, metadados de banco e validacoes de dicionario
 */
window.FUNCOES_ADVPL = window.FUNCOES_ADVPL || [];

window.FUNCOES_ADVPL.push(
  {
    nome: "Empty",
    categoria: "Tipos e Validações",
    sintaxe: "Empty( <exp> )",
    retorno: "Lógico (.T. / .F.)",
    descricaoCurta: "Verifica se uma expressão ou variável está vazia de acordo com seu tipo de dado.",
    descricaoDetalhada: "Avalia a expressão informada. Retorna .T. para strings vazias ou contendo apenas espaços, número zero (0), datas vazias (CTOD('  /  /  ')), valores lógicos .F. e arrays vazios ({}).",
    parametros: [
      { nome: "exp", tipo: "Qualquer tipo", descricao: "Expressão ou variável a ser avaliada.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Validação de preenchimento de campos e variáveis
User Function ExEmpty()
    Local cTexto := "   "
    Local nValor := 0
    Local aLista := {}

    ConOut("Texto vazio: " + cValToChar(Empty(cTexto)))  // .T.
    ConOut("Valor zerado: " + cValToChar(Empty(nValor))) // .T.
    ConOut("Array vazio: " + cValToChar(Empty(aLista)))  // .T.

    If Empty(cTexto)
        ConOut("O preenchimento do campo é obrigatório!")
    EndIf
Return`
  },
  {
    nome: "ValType",
    categoria: "Tipos e Validações",
    sintaxe: "ValType( <exp> )",
    retorno: "Caractere (1 caractere com o tipo do dado)",
    descricaoCurta: "Retorna o tipo de dado resultante da avaliação direta de uma expressão ou variável.",
    descricaoDetalhada: "Identifica o tipo de dado em tempo de execução: 'C' (Caractere), 'N' (Numérico), 'D' (Data), 'L' (Lógico), 'A' (Array), 'B' (Bloco de Código), 'O' (Objeto), 'M' (Memo) ou 'U' (Indefinido / NIL).",
    parametros: [
      { nome: "exp", tipo: "Qualquer tipo", descricao: "Expressão ou variável a ser inspecionada.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Tratamento dinâmico de tipo de parâmetro
User Function ExValType()
    Local xValor := 125.50

    If ValType(xValor) == "N"
        ConOut("A variável xValor é do tipo Numérico.")
    ElseIf ValType(xValor) == "C"
        ConOut("A variável xValor é uma String.")
    ElseIf ValType(xValor) == "A"
        ConOut("A variável xValor é um Array.")
    EndIf
Return`
  },
  {
    nome: "Type",
    categoria: "Tipos e Validações",
    sintaxe: "Type( <cExpressao> )",
    retorno: "Caractere (1 caractere com o tipo ou 'U')",
    descricaoCurta: "Avalia uma expressão passada em forma de string e retorna o tipo de dado da variável ou campo.",
    descricaoDetalhada: "Diferente de ValType (que recebe o valor diretamente), Type recebe uma string com o identificador da variável, função ou campo (ex: 'SA1->A1_NOME'). Se o identificador não existir no escopo ou tabela, retorna 'U' (Undefined).",
    parametros: [
      { nome: "cExpressao", tipo: "Caractere", descricao: "Expressão ou nome de variável/campo em formato de texto.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Verificação de existência de campo ou variável pública
User Function ExType()
    // Verifica se o campo existe na tabela antes de acessá-lo
    If Type("SA1->A1_NOME") != "U"
        ConOut("Campo SA1->A1_NOME existe e é do tipo: " + Type("SA1->A1_NOME"))
    Else
        ConOut("Campo SA1->A1_NOME não está acessível no contexto atual.")
    EndIf
Return`
  },
  {
    nome: "If",
    categoria: "Tipos e Validações",
    sintaxe: "If( <lCondicao>, <expVerdadeiro>, <expFalso> )",
    retorno: "Qualquer tipo",
    descricaoCurta: "Função condicional inline que avalia uma condição lógica e retorna um de dois valores possíveis.",
    descricaoDetalhada: "Avalia a condição booleana no primeiro parâmetro. Se for .T., retorna o resultado da segunda expressão; se for .F., retorna o resultado da terceira expressão. Equivale ao operador ternário.",
    parametros: [
      { nome: "lCondicao", tipo: "Lógico", descricao: "Condição lógica a ser avaliada.", opcional: false },
      { nome: "expVerdadeiro", tipo: "Qualquer tipo", descricao: "Valor retornado se a condição for .T.", opcional: false },
      { nome: "expFalso", tipo: "Qualquer tipo", descricao: "Valor retornado se a condição for .F.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Atribuição condicional concisa
User Function ExIf()
    Local lAtivo  := .T.
    Local cStatus := If(lAtivo, "USUARIO ATIVO", "USUARIO BLOQUEADO")
    ConOut("Status do operador: " + cStatus)
Return`
  },
  {
    nome: "IIf",
    categoria: "Tipos e Validações",
    sintaxe: "IIf( <lCondicao>, <expVerdadeiro>, <expFalso> )",
    retorno: "Qualquer tipo",
    descricaoCurta: "Forma alternativa tradicional da função condicional inline (Immediate If).",
    descricaoDetalhada: "Sinônimo exato da função If(). Muito utilizada em fórmulas de dicionário de dados (SX3, SX1), filtros de relatórios e inicializadores de campos no Protheus.",
    parametros: [
      { nome: "lCondicao", tipo: "Lógico", descricao: "Condição lógica avaliada.", opcional: false },
      { nome: "expVerdadeiro", tipo: "Qualquer tipo", descricao: "Valor retornado caso verdadeiro.", opcional: false },
      { nome: "expFalso", tipo: "Qualquer tipo", descricao: "Valor retornado caso falso.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Uso em regras de cálculo e exibição
User Function ExIIf()
    Local nEstoque := 5
    Local cAviso   := IIf(nEstoque > 0, "Estoque Disponível", "PRODUTO ESGOTADO")
    ConOut("Situação do item: " + cAviso)
Return`
  },
  {
    nome: "RetSqlName",
    categoria: "Tipos e Validações",
    sintaxe: "RetSqlName( <cAlias> )",
    retorno: "Caractere (String com o nome físico da tabela no SGBD)",
    descricaoCurta: "Retorna o nome físico real da tabela no banco de dados relacional associado ao alias Protheus.",
    descricaoDetalhada: "Converte o alias do Protheus (ex: 'SA1', 'SB1') no nome físico da tabela no banco de dados, anexando o sufixo da empresa e filial corrente (ex: 'SA1010' ou 'SA1990'). Obrigatória na construção de qualquer consulta SQL.",
    parametros: [
      { nome: "cAlias", tipo: "Caractere", descricao: "Alias da tabela no dicionário SX2 (ex: 'SA1', 'SC5').", opcional: false }
    ],
    exemplo: `// Exemplo prático: Construção de query SQL apontando para a tabela correta
User Function ExRetSqlName()
    Local cTabSA1 := RetSqlName("SA1")
    Local cSQL    := "SELECT A1_COD, A1_NOME FROM " + cTabSA1 + " WHERE D_E_L_E_T_ = ' '"

    ConOut("Tabela física no banco: " + cTabSA1)
    ConOut("Query montada: " + cSQL)
Return`
  },
  {
    nome: "TCSqlExec",
    categoria: "Tipos e Validações",
    sintaxe: "TCSqlExec( <cQuery> )",
    retorno: "Numérico (0 se sucesso ou código de erro negativo do SGBD)",
    descricaoCurta: "Executa uma instrução SQL de manipulação (UPDATE, INSERT, DELETE, DDL) diretamente no banco.",
    descricaoDetalhada: "Envia instruções SQL que não retornam cursores de dados (operações DML/DDL) diretamente para o banco via DBAccess. Retorna número maior ou igual a zero em caso de sucesso; se for negativo, consulte a função TCSqlError().",
    parametros: [
      { nome: "cQuery", tipo: "Caractere", descricao: "Comando SQL a ser executado no SGBD.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Execução de comando UPDATE direto via DBAccess
User Function ExTCSqlExec()
    Local cUpdate := "UPDATE " + RetSqlName("SZ1") + " SET Z1_STATUS = '1' WHERE Z1_STATUS = '0' AND D_E_L_E_T_ = ' '"
    Local nStatus := TCSqlExec(cUpdate)

    If nStatus >= 0
        ConOut("Comando SQL executado com sucesso no SGBD!")
    Else
        ConOut("Erro na execução SQL: " + TCSqlError())
    EndIf
Return`
  },
  {
    nome: "ExistCpo",
    categoria: "Tipos e Validações",
    sintaxe: "ExistCpo( <cAlias>, <cValor>, [<nOrdem>] )",
    retorno: "Lógico (.T. / .F.)",
    descricaoCurta: "Valida a existência de um valor na chave de uma tabela cadastrada no Protheus.",
    descricaoDetalhada: "Função padrão de validação no dicionário de dados (SX3). Pesquisa se <cValor> existe na tabela <cAlias>. Se não existir, dispara a mensagem de help de sistema padrão e retorna .F.",
    parametros: [
      { nome: "cAlias", tipo: "Caractere", descricao: "Alias da tabela pesquisada (ex: 'SA1', 'SB1').", opcional: false },
      { nome: "cValor", tipo: "Caractere", descricao: "Código ou valor a ser validado na tabela.", opcional: false },
      { nome: "nOrdem", tipo: "Numérico", descricao: "Ordem do índice a ser pesquisado (padrão: 1).", opcional: true }
    ],
    exemplo: `// Exemplo prático: Validação de campo de cliente
User Function ExExistCpo()
    Local cCodCliente := "000001"

    If ExistCpo("SA1", cCodCliente, 1)
        ConOut("Cliente validado com sucesso!")
    Else
        ConOut("Cliente inválido ou não cadastrado.")
    EndIf
Return`
  },
  {
    nome: "ExistChav",
    categoria: "Tipos e Validações",
    sintaxe: "ExistChav( <cAlias>, <cChave>, [<nOrdem>], [<cHelp>] )",
    retorno: "Lógico (.T. se NÃO existe duplicidade, .F. se chave já cadastrada)",
    descricaoCurta: "Verifica se uma chave de registro já existe na tabela para evitar duplicidade de cadastros.",
    descricaoDetalhada: "Utilizada nas validações de chave primária no Protheus. Retorna .T. se a chave estiver livre (não existir no banco), permitindo a inclusão; se já existir, dispara mensagem de duplicidade e retorna .F.",
    parametros: [
      { nome: "cAlias", tipo: "Caractere", descricao: "Alias da tabela (ex: 'SB1').", opcional: false },
      { nome: "cChave", tipo: "Caractere", descricao: "Chave completa a ser verificada (incluindo filial se tabela exclusiva).", opcional: false },
      { nome: "nOrdem", tipo: "Numérico", descricao: "Ordem do índice (padrão: 1).", opcional: true },
      { nome: "cHelp", tipo: "Caractere", descricao: "Código do Help a disparar se duplicado.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Validação anti-duplicidade em inclusão de produto
User Function ExExistChav()
    Local cNovoCod := "PROD999"

    If ExistChav("SB1", xFilial("SB1") + cNovoCod, 1)
        ConOut("Código disponível para novo cadastro.")
    Else
        ConOut("Código já em uso! Cadastro rejeitado.")
    EndIf
Return`
  },
  {
    nome: "Help",
    categoria: "Tipos e Validações",
    sintaxe: "Help( [<cRotina>], [<nLinha>], <cHelp>, [<cCampo>], <cMensagem>, <nTipo>, [<nHelp>] )",
    retorno: "NIL",
    descricaoCurta: "Apresenta a janela padrão de Help do Protheus exibindo mensagens de validação e solução para o usuário.",
    descricaoDetalhada: "Abre o diálogo oficial de Help do sistema (com abas de Problema e Solução). Usada em regras de validação de campos (X3_VALID) e rotinas de validação de formulários.",
    parametros: [
      { nome: "cRotina", tipo: "Caractere", descricao: "Nome da rotina chamadora.", opcional: true },
      { nome: "nLinha", tipo: "Numérico", descricao: "Número da linha no código.", opcional: true },
      { nome: "cHelp", tipo: "Caractere", descricao: "Código identificador do Help no dicionário SX1/SX6.", opcional: false },
      { nome: "cCampo", tipo: "Caractere", descricao: "Nome do campo gerador da validação.", opcional: true },
      { nome: "cMensagem", tipo: "Caractere", descricao: "Descrição detalhada do problema ou erro.", opcional: false },
      { nome: "nTipo", tipo: "Numérico", descricao: "Tipo de Help (1: Atenção/Erro de validação).", opcional: false },
      { nome: "nHelp", tipo: "Numérico", descricao: "Código numérico do help.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Disparo de mensagem de Help de validação
User Function ExHelp()
    Local cMsg := "O campo Quantidade deve conter valor superior a zero para este produto."
    Help("", 1, "QTDINVALIDA", , cMsg, 1, 0)
Return`
  },
  {
    nome: "Posicione",
    categoria: "Tipos e Validações",
    sintaxe: "Posicione( <cAlias>, <nOrdem>, <cChave>, <cCampoRetorno> )",
    retorno: "Qualquer tipo (Conteúdo do campo pesquisado)",
    descricaoCurta: "Busca e retorna o conteúdo de um campo em outra tabela com cache e posicionamento automático.",
    descricaoDetalhada: "Uma das funções mais importantes do Protheus. Posiciona a tabela <cAlias> pelo índice <nOrdem> buscando <cChave>. Se encontrar, retorna o conteúdo de <cCampoRetorno>; se não encontrar, retorna o valor padrão vazio correspondente ao tipo do campo. Gerencia cache interno automático de alta velocidade.",
    parametros: [
      { nome: "cAlias", tipo: "Caractere", descricao: "Alias da tabela a pesquisar (ex: 'SA1', 'SB1').", opcional: false },
      { nome: "nOrdem", tipo: "Numérico", descricao: "Ordem do índice a ser pesquisado.", opcional: false },
      { nome: "cChave", tipo: "Caractere", descricao: "Chave de busca montada (incluindo filial se exclusiva).", opcional: false },
      { nome: "cCampoRetorno", tipo: "Caractere", descricao: "Nome do campo cujo conteúdo será retornado (ex: 'A1_NOME').", opcional: false }
    ],
    exemplo: `// Exemplo prático: Obtenção de nome do cliente em 1 linha
User Function ExPosicione()
    Local cFilialSA1 := xFilial("SA1")
    Local cCodCli    := "000001"
    Local cLojaCli   := "01"
    Local cNomeCli   := ""

    cNomeCli := Posicione("SA1", 1, cFilialSA1 + cCodCli + cLojaCli, "A1_NOME")
    ConOut("Nome do Cliente: " + cNomeCli)
Return`
  },
  {
    nome: "SuperGetMV",
    categoria: "Tipos e Validações",
    sintaxe: "SuperGetMV( <cParametro>, [<lHelp>], [<xPadrao>] )",
    retorno: "Qualquer tipo",
    descricaoCurta: "Obtém o conteúdo de um parâmetro do sistema SX6 com cache em memória de alta performance.",
    descricaoDetalhada: "Versão otimizada e recomendada que substitui a tradicional GetMV(). Mantém os parâmetros em cache de memória do processo/thread, evitando leituras repetidas e sobrecarga de banco de dados.",
    parametros: [
      { nome: "cParametro", tipo: "Caractere", descricao: "Nome do parâmetro no SX6 (ex: 'MV_ESTADO').", opcional: false },
      { nome: "lHelp", tipo: "Lógico", descricao: "Dispara Help caso não exista (padrão: .F.).", opcional: true },
      { nome: "xPadrao", tipo: "Qualquer tipo", descricao: "Valor de fallback retornado se o parâmetro não estiver cadastrado.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Leitura rápida de parâmetros com cache
User Function ExSuperGetMV()
    Local cUFPadrao   := SuperGetMV("MV_ESTADO", .F., "SP")
    Local lEnviaEmail := SuperGetMV("MV_ENVMAIL", .F., .F.)

    ConOut("UF Padrão: " + cUFPadrao)
    ConOut("Envia E-mail: " + cValToChar(lEnviaEmail))
Return`
  },
  {
    nome: "GetNewPar",
    categoria: "Tipos e Validações",
    sintaxe: "GetNewPar( <cParametro>, <xPadrao> )",
    retorno: "Qualquer tipo",
    descricaoCurta: "Obtém o valor de um parâmetro do SX6 ou retorna um valor padrão sem gerar erro caso não exista.",
    descricaoDetalhada: "Lê o parâmetro do SX6 de forma tolerante a falhas. Se o parâmetro não existir no dicionário de dados da instalação do cliente, retorna automaticamente <xPadrao> sem disparar help ou interromper a execução.",
    parametros: [
      { nome: "cParametro", tipo: "Caractere", descricao: "Nome do parâmetro no SX6.", opcional: false },
      { nome: "xPadrao", tipo: "Qualquer tipo", descricao: "Valor padrão retornado caso não cadastrado.", opcional: false }
    ],
    exemplo: `// Exemplo prático: Leitura segura de parâmetro customizado
User Function ExGetNewPar()
    Local nLimiteCredito := GetNewPar("MV_X_LIMCR", 10000.00)
    ConOut("Limite configurado: R$ " + cValToChar(nLimiteCredito))
Return`
  },
  {
    nome: "IsBlind",
    categoria: "Tipos e Validações",
    sintaxe: "IsBlind()",
    retorno: "Lógico (.T. / .F.)",
    descricaoCurta: "Indica se a execução atual está rodando em modo não visual / cego (Schedule, Job, Web Service).",
    descricaoDetalhada: "Retorna .T. quando a rotina está em execução em segundo plano sem interface gráfica ativa (SmartClient), como Jobs, Schedules, Threads automáticas e Web Services REST/SOAP. Permite desviar a chamada de mensagens visuais (MsgInfo, Aviso) para logs no ConOut.",
    parametros: [],
    exemplo: `// Exemplo prático: Diferenciação entre execução visual e batch/schedule
User Function ExIsBlind()
    If IsBlind()
        ConOut("[JOB] Processamento finalizado com sucesso via Schedule.")
    Else
        MsgInfo("Processamento finalizado com sucesso!", "Concluído")
    EndIf
Return`
  },
  {
    nome: "GetSX3Cache",
    categoria: "Tipos e Validações",
    sintaxe: "GetSX3Cache( <cCampo>, <cPropriedade> )",
    retorno: "Qualquer tipo",
    descricaoCurta: "Consulta propriedades de metadados de campos do dicionário SX3 através do cache de memória.",
    descricaoDetalhada: "Permite ler atributos de campos do dicionário de dados do Protheus em altíssima velocidade sem abrir o arquivo SX3. Propriedades suportadas: 'X3_TITULO', 'X3_TIPO', 'X3_TAMANHO', 'X3_DECIMAL', 'X3_PICTURE', 'X3_VALID', etc.",
    parametros: [
      { nome: "cCampo", tipo: "Caractere", descricao: "Nome do campo no dicionário (ex: 'A1_NOME').", opcional: false },
      { nome: "cPropriedade", tipo: "Caractere", descricao: "Propriedade SX3 desejada (ex: 'X3_TITULO', 'X3_TIPO').", opcional: false }
    ],
    exemplo: `// Exemplo prático: Consulta rápida de metadados de campos
User Function ExGetSX3Cache()
    Local cTitulo := GetSX3Cache("A1_NOME", "X3_TITULO")
    Local nTam    := GetSX3Cache("A1_NOME", "X3_TAMANHO")
    Local cTipo   := GetSX3Cache("A1_NOME", "X3_TIPO")

    ConOut("Campo: A1_NOME | Título: " + cTitulo + " | Tipo: " + cTipo + " | Tam: " + cValToChar(nTam))
Return`
  },
  {
    nome: "GetAdvFVal",
    categoria: "Tipos e Validações",
    sintaxe: "GetAdvFVal( <cAlias>, <cCampoRetorno>, <cChaveBusca>, [<nOrdem>], [<xPadrao>] )",
    retorno: "Qualquer tipo",
    descricaoCurta: "Busca o valor de um campo de tabela via DBAccess/OpenQuery de alta performance.",
    descricaoDetalhada: "Busca rápida de valor de campo que consulta o cache ou executa uma query direta sem mover o ponteiro da área de trabalho ativa.",
    parametros: [
      { nome: "cAlias", tipo: "Caractere", descricao: "Alias da tabela pesquisada.", opcional: false },
      { nome: "cCampoRetorno", tipo: "Caractere", descricao: "Campo desejado.", opcional: false },
      { nome: "cChaveBusca", tipo: "Caractere", descricao: "Chave de índice pesquisada.", opcional: false },
      { nome: "nOrdem", tipo: "Numérico", descricao: "Ordem de índice (padrão: 1).", opcional: true },
      { nome: "xPadrao", tipo: "Qualquer tipo", descricao: "Valor padrão retornado caso não encontre.", opcional: true }
    ],
    exemplo: `// Exemplo prático: Leitura de valor de campo sem mover a área ativa
User Function ExGetAdvFVal()
    Local cDescProd := GetAdvFVal("SB1", "B1_DESC", xFilial("SB1") + "PROD001", 1, "PRODUTO NÃO ENCONTRADO")
    ConOut("Descrição: " + cDescProd)
Return`
  }
);
